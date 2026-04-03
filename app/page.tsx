'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import PremiumBuyerCard from '@/components/home/PremiumBuyerCard';
import SellPostItem from '@/components/home/SellPostItem';
import { premiumBuyers, sellPosts, buyPosts } from '@/data/mock';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <HeroBanner />

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
          <span className="text-[12px] text-zinc-400">{(activeTab === 'sell' ? sellPosts : buyPosts).length}건</span>
        </div>
        <div className="card overflow-hidden">
          {(activeTab === 'sell' ? sellPosts : buyPosts).map((post) => (
            <SellPostItem key={post.id} post={post} />
          ))}
          {(activeTab === 'sell' ? sellPosts : buyPosts).length === 0 && (
            <div className="py-16 text-center text-zinc-400 text-[13px]">등록된 글이 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
}
