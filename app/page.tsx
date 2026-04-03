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
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <HeroBanner />

      {/* Tab + Action */}
      <div className="flex items-center justify-between mb-5 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'buy' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            삽니다
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sell' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            팝니다
          </button>
        </div>
        <Link
          href={`/board/write?type=${activeTab}`}
          className="flex items-center gap-1.5 bg-gray-900 text-white text-xs px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          <PenSquare size={13} />
          글쓰기
        </Link>
      </div>

      {/* Premium Buyers */}
      {activeTab === 'buy' && (
        <section className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-gray-900">프리미엄 구매 업체</h2>
            <span className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">AD</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {premiumBuyers.map((buyer) => (
              <PremiumBuyerCard key={buyer.id} {...buyer} />
            ))}
          </div>
        </section>
      )}

      {/* Post List */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">
            {activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}
          </h2>
          <span className="text-xs text-gray-400">{(activeTab === 'sell' ? sellPosts : buyPosts).length}건</span>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          {(activeTab === 'sell' ? sellPosts : buyPosts).map((post) => (
            <SellPostItem key={post.id} post={post} />
          ))}
          {(activeTab === 'sell' ? sellPosts : buyPosts).length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm">등록된 글이 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
}
