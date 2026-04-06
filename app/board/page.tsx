'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PenSquare } from 'lucide-react';
import SellPostItem from '@/components/home/SellPostItem';
import PremiumBuyerCard from '@/components/home/PremiumBuyerCard';
import { premiumBuyers } from '@/data/mock';
import { getPosts } from '@/lib/api';
import type { DBPost, DBUser } from '@/lib/types';
import AdBanner from '@/components/ads/AdBanner';

type PostWithAuthor = DBPost & { author: DBUser };

function BoardContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'buy' | 'sell') || 'buy';
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>(initialTab);
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
      <AdBanner slot="board_top" className="h-20 mb-5" />

      <div className="flex items-center justify-between mb-5 border-b border-zinc-200">
        <div className="flex">
          <button onClick={() => setActiveTab('buy')}
            className={`tab-underline ${activeTab === 'buy' ? 'active' : ''}`}>삽니다</button>
          <button onClick={() => setActiveTab('sell')}
            className={`tab-underline ${activeTab === 'sell' ? 'active' : ''}`}>팝니다</button>
        </div>
        <Link href={`/board/write?type=${activeTab}`} className="btn-primary">
          <PenSquare size={13} /> 글쓰기
        </Link>
      </div>

      {/* 프리미엄 구매 업체 (삽니다 탭에서만) */}
      {activeTab === 'buy' && premiumBuyers.length > 0 && (
        <section className="mb-6">
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

      {/* 일반 글 목록 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title mb-0">{activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}</h2>
          {!loading && <span className="text-[11px] text-zinc-400">{posts.length}건</span>}
        </div>

        {loading ? (
          <div className="py-16 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
        ) : error ? (
          <div className="py-16 text-center text-red-400 text-[13px]">{error}</div>
        ) : (
          <div className="card overflow-hidden">
            {posts.map((post) => <SellPostItem key={post.id} post={post} />)}
            {posts.length === 0 && <div className="py-16 text-center text-zinc-400 text-[13px]">등록된 글이 없습니다.</div>}
          </div>
        )}
      </section>
    </div>
  );
}

export default function BoardPage() {
  return (
    <Suspense fallback={<div className="max-w-[1140px] mx-auto px-5 py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>}>
      <BoardContent />
    </Suspense>
  );
}
