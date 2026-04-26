'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, PenSquare, ShoppingCart, Megaphone, Lightbulb, ShieldCheck, ChevronLeft } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import SellPostItem from '@/components/home/SellPostItem';
import MainCompaniesSection from '@/components/home/MainCompaniesSection';
import BuyerFinder from '@/components/home/BuyerFinder';
import RealtimeSellPosts from '@/components/home/RealtimeSellPosts';
import { getPosts, getPremiumBuyers, getNotices } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer, DBNotice } from '@/lib/types';
import { getCache, setCache } from '@/lib/cache';

type PostWithAuthor = DBPost & { author: DBUser };

const TIPS = [
  { title: '업체 전화번호로 직접 확인', desc: '거래 전 반드시 업체 전화/문자로 조건과 신원을 확인하세요.' },
  { title: '너무 높은 할인율은 의심', desc: '시세보다 비정상적으로 높은 할인율은 사기 신호일 수 있어요.' },
  { title: '사업자 등록번호 조회', desc: '국세청 홈택스에서 정상 사업자인지 꼭 확인하세요.' },
];

export default function Home() {
  // 캐시가 있으면 즉시 초기화 (첫 렌더부터 데이터 표시)
  const [sellPosts, setSellPosts] = useState<PostWithAuthor[]>(() => getCache<PostWithAuthor[]>('home_sell') ?? []);
  const [buyPosts, setBuyPosts] = useState<PostWithAuthor[]>(() => getCache<PostWithAuthor[]>('home_buy') ?? []);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>(() => getCache<DBPremiumBuyer[]>('home_buyers') ?? []);
  const [notices, setNotices] = useState<DBNotice[]>(() => getCache<DBNotice[]>('home_notices') ?? []);
  const [loading, setLoading] = useState(() => {
    // 캐시가 없을 때만 로딩 상태
    return !getCache('home_sell');
  });
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    // 백그라운드에서 최신 데이터 가져오기 (캐시가 있어도 SWR 패턴)
    Promise.allSettled([
      getPosts('sell', { limit: 30 }),
      getPosts('buy', { limit: 30 }),
      getPremiumBuyers(),
      getNotices(),
    ]).then(([s, b, pb, n]) => {
      if (s.status === 'fulfilled') { setSellPosts(s.value); setCache('home_sell', s.value, 60000); }
      if (b.status === 'fulfilled') { setBuyPosts(b.value); setCache('home_buy', b.value, 60000); }
      if (pb.status === 'fulfilled') { setBuyers(pb.value); setCache('home_buyers', pb.value, 120000); }
      if (n.status === 'fulfilled') { const slim = n.value.slice(0, 5); setNotices(slim); setCache('home_notices', slim, 120000); }
    }).finally(() => setLoading(false));

    const timer = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <HeroBanner />

      <div className="container-main py-6">
        <div className="flex gap-4">
          <LeftSidebar />

          <div className="flex-1 min-w-0">
            {/* 지역으로 / 상품으로 업체찾기 (CTA 자리 대체) */}
            <BuyerFinder />

            {/* 메인 등록업체 */}
            <MainCompaniesSection buyers={buyers} loading={loading} />

            {/* 실시간 판매문의 (매입업체 옆) */}
            <RealtimeSellPosts posts={sellPosts} loading={loading} />

            {/* 공지 + TIP (좌우 2열, 확대) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* 공지사항 */}
              <div className="bg-white border border-gray-200 flex flex-col">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Megaphone size={16} className="text-accent" />
                    <span className="text-[15px] font-bold text-gray-800">공지사항</span>
                  </div>
                  <Link href="/notice" className="text-[12px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                    더보기 <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="flex-1">
                  {notices.length === 0 ? (
                    <p className="py-10 text-center text-[13px] text-gray-400">등록된 공지가 없습니다.</p>
                  ) : notices.slice(0, 6).map(n => (
                    <Link key={n.id} href="/notice" className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {n.is_pinned && <ShieldCheck size={13} className="text-accent shrink-0" />}
                        <span className="text-[13px] text-gray-700 truncate">{n.title}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 shrink-0 ml-3 tabular-nums">
                        {new Date(n.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* TIP */}
              <div className="bg-white border border-gray-200 flex items-stretch overflow-hidden">
                <div
                  className="shrink-0 flex flex-col items-center justify-center w-[130px] text-white px-3"
                  style={{ background: 'linear-gradient(135deg, #E63946 0%, #F26A4B 100%)' }}
                >
                  <Lightbulb size={28} className="mb-1.5" />
                  <p className="text-[13px] font-bold tracking-widest">SAFE TIP</p>
                  <p className="text-[11px] opacity-75 mt-1 tabular-nums">
                    {String(tipIdx + 1).padStart(2, '0')} / {String(TIPS.length).padStart(2, '0')}
                  </p>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
                    <span className="text-[15px] font-bold text-gray-800">안전거래 TIP</span>
                    <Link
                      href="/guide"
                      className="text-[12px] text-gray-500 hover:text-accent flex items-center gap-0.5"
                    >
                      이용방법 <ChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col justify-center px-5 py-5">
                    <p className="text-[16px] font-bold text-gray-900 mb-2">{TIPS[tipIdx].title}</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-3">{TIPS[tipIdx].desc}</p>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      {TIPS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setTipIdx(i)}
                          aria-label={`TIP ${i + 1}`}
                          className={`h-2 rounded-full transition-all ${i === tipIdx ? 'bg-accent w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => setTipIdx((i) => (i - 1 + TIPS.length) % TIPS.length)}
                        aria-label="이전 TIP"
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-gray-50 rounded"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setTipIdx((i) => (i + 1) % TIPS.length)}
                        aria-label="다음 TIP"
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-gray-50 rounded"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 상품권 삽니다 (최신 구매글, 줄광고 형태로 유지) */}
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
                  {buyPosts.slice(0, 10).map((post, idx) => (
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

          </div>

          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
