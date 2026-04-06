'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import PremiumBuyerCard from '@/components/home/PremiumBuyerCard';
import SellPostItem from '@/components/home/SellPostItem';
import { premiumBuyers } from '@/data/mock';
import AdBanner from '@/components/ads/AdBanner';
import { getPosts } from '@/lib/api';
import type { DBPost, DBUser } from '@/lib/types';

type PostWithAuthor = DBPost & { author: DBUser };

export default function Home() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPosts(activeTab)
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message || '데이터를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <AdBanner slot="hero_banner" className="h-[200px] mb-6" fallback={<HeroBanner />} />
      <AdBanner slot="main_top" className="h-[80px] mb-6" />

      <div className="flex items-center justify-between border-b border-zinc-200 mb-6">
        <div className="flex">
          <button onClick={() => setActiveTab('buy')}
            className={`tab-underline ${activeTab === 'buy' ? 'active' : ''}`}>삽니다</button>
          <button onClick={() => setActiveTab('sell')}
            className={`tab-underline ${activeTab === 'sell' ? 'active' : ''}`}>팝니다</button>
        </div>
        <Link href={`/board/write?type=${activeTab}`} className="btn-primary text-[12px] h-[32px] px-3 rounded">
          <PenSquare size={12} />글쓰기
        </Link>
      </div>

      {activeTab === 'buy' && (
        <section className="mb-8 animate-fade-in">
          <div className="flex items-baseline gap-2 mb-3">
            <h2 className="section-title mb-0">프리미엄 구매 업체</h2>
            <span className="badge bg-zinc-100 text-zinc-400">AD</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {premiumBuyers.map((buyer) => (
              <PremiumBuyerCard key={buyer.id} {...buyer} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title mb-0">{activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}</h2>
          <div className="flex items-center gap-3">
            {!loading && <span className="text-[12px] text-zinc-400">{posts.length}건</span>}
            <Link href={`/board?tab=${activeTab}`} className="text-[12px] text-zinc-500 hover:text-zinc-900 transition-colors">전체보기</Link>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
        ) : error ? (
          <div className="py-16 text-center text-red-400 text-[13px]">{error}</div>
        ) : (
          <div className="card overflow-hidden">
            {posts.slice(0, 10).map((post) => (
              <SellPostItem key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
              <div className="py-16 text-center text-zinc-400 text-[13px]">등록된 글이 없습니다.</div>
            )}
            {posts.length > 10 && (
              <Link href={`/board?tab=${activeTab}`} className="block py-3 text-center text-[12px] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-t border-zinc-100 transition-colors">
                + {posts.length - 10}건 더보기
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
