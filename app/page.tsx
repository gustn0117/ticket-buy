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
    <div className="max-w-[1280px] mx-auto px-4 py-4 md:py-6">
      <HeroBanner />

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        <button
          onClick={() => setActiveTab('buy')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'buy'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-200'
          }`}
        >
          삽니다
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'sell'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-200'
          }`}
        >
          팝니다
        </button>
      </div>

      {/* Premium Buyers Section */}
      {activeTab === 'buy' && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-bold text-base text-gray-900">프리미엄 구매 업체</h2>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">AD</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {premiumBuyers.map((buyer) => (
              <PremiumBuyerCard key={buyer.id} {...buyer} />
            ))}
          </div>
        </div>
      )}

      {/* Post List */}
      <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-sm text-gray-900">
            {activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}
          </h3>
          <Link
            href={`/board/write?type=${activeTab}`}
            className="flex items-center gap-1.5 bg-primary text-white text-xs px-3.5 py-1.5 rounded-full hover:bg-primary-dark transition-colors font-medium"
          >
            <PenSquare size={12} />
            글쓰기
          </Link>
        </div>

        <div>
          {(activeTab === 'sell' ? sellPosts : buyPosts).map((post) => (
            <SellPostItem key={post.id} post={post} />
          ))}
          {(activeTab === 'sell' ? sellPosts : buyPosts).length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm">
              등록된 글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
