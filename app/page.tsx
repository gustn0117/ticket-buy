'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import PremiumBuyerSection from '@/components/home/PremiumBuyerSection';
import SellPostItem from '@/components/home/SellPostItem';
import AdBanner from '@/components/ads/AdBanner';
// Sidebar removed
import { getPosts, getPremiumBuyers } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer } from '@/lib/types';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPremiumBuyers().then(setBuyers).catch(() => {});
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
