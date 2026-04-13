'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import PremiumBuyerSection from '@/components/home/PremiumBuyerSection';
import SellPostItem from '@/components/home/SellPostItem';
import AdBanner from '@/components/ads/AdBanner';
// Sidebar removed
import { getPosts, getPremiumBuyers, getNotices } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer, DBNotice } from '@/lib/types';
import { Lightbulb, Megaphone, ShieldCheck, ChevronRight } from 'lucide-react';

const TIPS = [
  { title: '계약서 없이 입금 금지', desc: '모든 거래는 반드시 전자 계약서를 먼저 작성한 뒤 진행하세요. 플랫폼을 벗어난 거래는 보호받을 수 없습니다.' },
  { title: '너무 높은 할인율은 의심', desc: '시세보다 비정상적으로 높은 할인율은 사기의 신호입니다. 정상 시세 범위를 벗어나면 거래를 중단하세요.' },
  { title: '신원 확인은 필수', desc: '거래 전 상대방의 거래 이력과 평점을 확인하세요. 업체 거래 시 사업자등록번호를 반드시 확인하세요.' },
];

type PostWithAuthor = DBPost & { author: DBUser };

const SELL_FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'selling', label: '판매중' },
  { key: 'paid', label: '입금완료' },
  { key: 'done', label: '거래완료' },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [sellFilter, setSellFilter] = useState<string>('all');
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>([]);
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [tipIdx, setTipIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPremiumBuyers().then(setBuyers).catch(() => {});
    getNotices().then((data) => setNotices(data.slice(0, 5))).catch(() => {});
    const timer = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSellFilter('all');
    getPosts(activeTab)
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message || '데이터를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [activeTab]);

  // Filter sell posts by status
  const filteredPosts = activeTab === 'sell' && sellFilter !== 'all'
    ? posts.filter((p) => {
        if (sellFilter === 'selling') return p.is_active;
        if (sellFilter === 'paid') return !p.is_active; // placeholder logic
        if (sellFilter === 'done') return !p.is_active;
        return true;
      })
    : posts;

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <AdBanner slot="hero_banner" className="h-[200px] mb-6" fallback={<HeroBanner />} />
      <AdBanner slot="main_top" className="h-[80px] mb-6" />

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between border-b border-zinc-200 mb-6">
            <div className="flex">
              <button onClick={() => setActiveTab('buy')}
                className={`tab-underline ${activeTab === 'buy' ? 'active' : ''}`}>삽니다</button>
              <button onClick={() => setActiveTab('sell')}
                className={`tab-underline ${activeTab === 'sell' ? 'active' : ''}`}>팝니다</button>
            </div>
            <Link href={`/board/write?type=${activeTab}`} className="btn-primary text-[12px] h-[32px] px-3 rounded">
              <PenSquare size={12} />{activeTab === 'buy' ? '구매' : '판매'}+
            </Link>
          </div>

          {activeTab === 'buy' && <PremiumBuyerSection buyers={buyers} />}

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

          {/* 공지사항 영역 */}
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

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title mb-0">{activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}</h2>
              <div className="flex items-center gap-3">
                {!loading && <span className="text-[12px] text-zinc-400">{filteredPosts.length}건</span>}
                <Link href={`/board?tab=${activeTab}`} className="text-[12px] text-zinc-500 hover:text-zinc-900 transition-colors">전체보기</Link>
              </div>
            </div>

            {/* Sell filter buttons */}
            {activeTab === 'sell' && (
              <div className="flex gap-1.5 mb-3">
                {SELL_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setSellFilter(f.key)}
                    className={`px-3 py-1 text-[11px] rounded-full border transition-colors ${
                      sellFilter === f.key
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <div className="py-16 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
            ) : error ? (
              <div className="py-16 text-center text-red-400 text-[13px]">{error}</div>
            ) : (
              <div className="card overflow-hidden">
                {filteredPosts.slice(0, 10).map((post, idx) => (
                  <SellPostItem key={post.id} post={post} num={idx + 1} showStatus={activeTab === 'sell'} />
                ))}
                {filteredPosts.length === 0 && (
                  <div className="py-16 text-center text-zinc-400 text-[13px]">등록된 글이 없습니다.</div>
                )}
                {filteredPosts.length > 10 && (
                  <Link href={`/board?tab=${activeTab}`} className="block py-3 text-center text-[12px] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-t border-zinc-100 transition-colors">
                    + {filteredPosts.length - 10}건 더보기
                  </Link>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar removed */}
      </div>
    </div>
  );
}
