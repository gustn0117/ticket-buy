'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, PenSquare } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import { TRUST_LINKS } from '@/lib/trustLinks';
import MainCompaniesSection from '@/components/home/MainCompaniesSection';
import BuyerFinder from '@/components/home/BuyerFinder';
import RealtimeSellPosts from '@/components/home/RealtimeSellPosts';
import SellPostItem from '@/components/home/SellPostItem';
import AdBanner from '@/components/ads/AdBanner';
import PremiumBannerSlider from '@/components/home/PremiumBannerSlider';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { getPosts, getPremiumBuyers } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer } from '@/lib/types';
import { getCache, setCache } from '@/lib/cache';

type PostWithAuthor = DBPost & { author: DBUser };

export default function Home() {
  // 캐시가 있으면 즉시 초기화 (첫 렌더부터 데이터 표시)
  const [sellPosts, setSellPosts] = useState<PostWithAuthor[]>(() => getCache<PostWithAuthor[]>('home_sell') ?? []);
  const [buyPosts, setBuyPosts] = useState<PostWithAuthor[]>(() => getCache<PostWithAuthor[]>('home_buy') ?? []);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>(() => getCache<DBPremiumBuyer[]>('home_buyers') ?? []);
  const [loading, setLoading] = useState(() => !getCache('home_sell'));

  // 새로고침마다 100% 랜덤 노출 (PDF: '모든 광고에서 업체 위치 랜덤')
  const shuffledBuyPosts = useMemo(() => {
    const a = [...buyPosts];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [buyPosts]);

  useEffect(() => {
    Promise.allSettled([
      getPosts('sell', { limit: 30 }),
      getPosts('buy', { limit: 30 }),
      getPremiumBuyers(),
    ]).then(([s, b, pb]) => {
      if (s.status === 'fulfilled') { setSellPosts(s.value); setCache('home_sell', s.value, 60000); }
      if (b.status === 'fulfilled') { setBuyPosts(b.value); setCache('home_buy', b.value, 60000); }
      if (pb.status === 'fulfilled') { setBuyers(pb.value); setCache('home_buyers', pb.value, 120000); }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <HeroBanner />

      <div className="container-main py-6">
        <div className="flex gap-4">
          {/* 좌측 사이드바 (프리미엄 업체 + 회원가입 + 최근 본 업체) */}
          <LeftSidebar />

          <div className="flex-1 min-w-0">
            {/* AD: 메인 히어로 배너 (1140 x 200) */}
            <AdBanner slot="hero_banner" className="mb-5" />

            {/* 메인 등록업체 (가장 위) */}
            <MainCompaniesSection buyers={buyers} loading={loading} />

        {/* 프리미엄 배너광고 슬라이더 — 메인 등록업체 아래 (옆으로 넘기기, 2줄씩) */}
        <PremiumBannerSlider buyers={buyers} />

        {/* 지역별 / 상품별 업체찾기 (좌·우 탭) — PC */}
        <div className="hidden md:block">
          <BuyerFinder />
        </div>

        {/* AD: 메인 상단 — 수정된 BuyerFinder 밑 일반 배너 1개 (1140 x 90) */}
        <AdBanner slot="main_top" className="mb-5" />

        {/* AD: 메인 중간 (1140 x 90) */}
        <AdBanner slot="main_middle" className="mb-5" />

        {/* 3. 상품권 삽니다 (줄광고) */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart size={15} className="text-accent" />
              상품권 삽니다
              {!loading && <span className="text-[12px] text-gray-400 font-normal">{buyPosts.length}건</span>}
            </h2>
            <div className="flex items-center gap-2">
              <Link href="/board?tab=buy" className="text-[12px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                전체보기 <ChevronRight size={11} />
              </Link>
              <Link href="/board/write?type=buy" className="btn-primary h-8 px-3 text-[12px]">
                <PenSquare size={12} /> 구매글 작성
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-400 text-[13px]">불러오는 중...</div>
          ) : buyPosts.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 py-10 text-center">
              <p className="text-[13px] text-gray-500 mb-2">아직 등록된 구매글이 없습니다.</p>
              <Link href="/board/write?type=buy" className="text-[12px] text-accent font-bold hover:underline">
                첫 구매글 작성하기 →
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 overflow-hidden">
              {shuffledBuyPosts.slice(0, 10).map((post, idx) => (
                <SellPostItem key={post.id} post={post} num={idx + 1} />
              ))}
              {buyPosts.length > 10 && (
                <Link href="/board?tab=buy" className="block py-3 text-center text-[12px] text-gray-500 hover:text-accent hover:bg-gray-50 border-t border-gray-100 transition-colors">
                  + {buyPosts.length - 10}건 더보기
                </Link>
              )}
            </div>
          )}
        </section>

            {/* 4. 실시간 판매문의 (맨 밑) */}
            <RealtimeSellPosts posts={sellPosts} loading={loading} />

            {/* 모바일 전용: 실시간 판매문의 아래에 지역/상품으로 업체찾기 */}
            <div className="block md:hidden mt-5">
              <BuyerFinder />
            </div>
          </div>

          {/* 우측 사이드바 (스폰서링크 + 광고 슬롯) */}
          <RightSidebar />
        </div>

        {/* 모바일 전용: 신뢰기관 바로가기 — 페이지 제일 하단 */}
        <div className="block md:hidden mt-6 border-t border-gray-200 pt-5">
          <p className="text-[11px] font-bold text-gray-500 mb-2 px-1">신뢰기관 바로가기</p>
          <div className="grid grid-cols-3 gap-2">
            {TRUST_LINKS.map(({ label, desc, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 px-2 py-2.5 border border-gray-200 bg-white hover:border-accent transition-colors text-center"
              >
                <Icon size={14} className="text-accent" />
                <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">{label}</span>
                <span className="text-[9.5px] text-gray-500 leading-tight whitespace-nowrap">{desc}</span>
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2 px-1">
            <ExternalLink size={9} className="inline -mt-0.5 mr-0.5" />
            새 탭에서 외부 사이트로 연결됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
