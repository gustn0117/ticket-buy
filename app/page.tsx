'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenSquare, Lightbulb, Megaphone, ShieldCheck, ChevronRight } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import PremiumBuyerSection from '@/components/home/PremiumBuyerSection';
import MainAdsSection from '@/components/home/MainAdsSection';
import LineAdsSection from '@/components/home/LineAdsSection';
import SellPostItem from '@/components/home/SellPostItem';
import AdBanner from '@/components/ads/AdBanner';
import { getPosts, getPremiumBuyers, getNotices } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer, DBNotice } from '@/lib/types';

type PostWithAuthor = DBPost & { author: DBUser };

const TIPS = [
  { title: '계약서 없이 입금 금지', desc: '모든 거래는 반드시 전자 계약서를 먼저 작성한 뒤 진행하세요. 플랫폼을 벗어난 거래는 보호받을 수 없습니다.' },
  { title: '너무 높은 할인율은 의심', desc: '시세보다 비정상적으로 높은 할인율은 사기의 신호입니다. 정상 시세 범위를 벗어나면 거래를 중단하세요.' },
  { title: '신원 확인은 필수', desc: '거래 전 상대방의 거래 이력과 평점을 확인하세요. 업체 거래 시 사업자등록번호를 반드시 확인하세요.' },
];

export default function Home() {
  const [sellPosts, setSellPosts] = useState<PostWithAuthor[]>([]);
  const [buyPosts, setBuyPosts] = useState<PostWithAuthor[]>([]);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>([]);
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [tipIdx, setTipIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getPosts('sell'),
      getPosts('buy'),
      getPremiumBuyers(),
      getNotices(),
    ]).then(([s, b, pb, n]) => {
      if (s.status === 'fulfilled') setSellPosts(s.value);
      if (b.status === 'fulfilled') setBuyPosts(b.value);
      if (pb.status === 'fulfilled') setBuyers(pb.value);
      if (n.status === 'fulfilled') setNotices(n.value.slice(0, 5));
    }).finally(() => setLoading(false));

    const timer = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <AdBanner slot="hero_banner" className="h-[200px] mb-6" fallback={<HeroBanner />} />

      {/* 1. 메인 광고 (2열, 새로고침 시 랜덤 순서) */}
      <MainAdsSection />

      {/* 2. 프리미엄 업체 (1개씩 옆으로 넘김) */}
      <PremiumBuyerSection buyers={buyers} />

      {/* TIP 배너 */}
      <div className="card overflow-hidden mb-6 flex items-stretch">
        <div className="shrink-0 flex items-center justify-center w-[90px]" style={{ background: 'linear-gradient(135deg, #F04E51 0%, #F26A4B 100%)' }}>
          <div className="text-center">
            <Lightbulb size={18} className="text-white mx-auto mb-0.5" />
            <p className="text-white text-[10px] font-bold tracking-wider">TIP</p>
          </div>
        </div>
        <div className="flex-1 p-4 min-w-0">
          <p className="text-[13px] font-semibold text-zinc-900 mb-0.5">{TIPS[tipIdx].title}</p>
          <p className="text-[12px] text-zinc-500 leading-relaxed">{TIPS[tipIdx].desc}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              {TIPS.map((_, i) => (
                <button key={i} onClick={() => setTipIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === tipIdx ? 'bg-zinc-900 w-4' : 'bg-zinc-300'}`} />
              ))}
            </div>
            <Link href="/guide" className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-0.5">
              이용방법 더보기 <ChevronRight size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* 공지사항 */}
      {notices.length > 0 && (
        <div className="card overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-2">
              <Megaphone size={13} className="text-zinc-500" />
              <span className="text-[12px] font-semibold">공지사항</span>
            </div>
            <Link href="/notice" className="text-[11px] text-zinc-500 hover:text-zinc-900 flex items-center gap-0.5">
              더보기 <ChevronRight size={11} />
            </Link>
          </div>
          <div>
            {notices.map((n) => (
              <Link key={n.id} href="/notice"
                className="flex items-center justify-between px-4 py-2 hover:bg-zinc-50 border-b border-zinc-100 last:border-b-0 transition-colors">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {n.is_pinned && <ShieldCheck size={11} className="text-red-500 shrink-0" />}
                  <span className="text-[12px] text-zinc-700 truncate">{n.title}</span>
                </div>
                <span className="text-[10px] text-zinc-400 shrink-0 ml-3">
                  {new Date(n.created_at).toLocaleDateString('ko-KR')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. 줄 광고 (매입업체 구매글) */}
      <LineAdsSection posts={buyPosts} />

      {/* 4. 판매글 (개인 판매) */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title mb-0">상품권 팝니다</h2>
          <div className="flex items-center gap-3">
            {!loading && <span className="text-[12px] text-zinc-400">{sellPosts.length}건</span>}
            <Link href="/board?tab=sell" className="text-[12px] text-zinc-500 hover:text-zinc-900 flex items-center gap-0.5">
              전체보기 <ChevronRight size={11} />
            </Link>
            <Link href="/board/write?type=sell" className="btn-primary text-[12px] h-[30px] px-3 rounded">
              <PenSquare size={12} />판매글 작성
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
        ) : (
          <div className="card overflow-hidden">
            {sellPosts.slice(0, 10).map((post, idx) => (
              <SellPostItem key={post.id} post={post} num={idx + 1} showStatus />
            ))}
            {sellPosts.length === 0 && (
              <div className="py-16 text-center text-zinc-400 text-[13px]">등록된 판매글이 없습니다.</div>
            )}
            {sellPosts.length > 10 && (
              <Link href="/board?tab=sell" className="block py-3 text-center text-[12px] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-t border-zinc-100 transition-colors">
                + {sellPosts.length - 10}건 더보기
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
