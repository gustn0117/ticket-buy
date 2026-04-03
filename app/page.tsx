'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PenSquare, TrendingUp } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import PremiumBuyerCard from '@/components/home/PremiumBuyerCard';
import SellPostItem from '@/components/home/SellPostItem';
import { premiumBuyers, sellPosts, buyPosts } from '@/data/mock';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5 md:py-8">
      <HeroBanner />

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'buy'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            삽니다
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'sell'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            팝니다
          </button>
        </div>
        <Link
          href={`/board/write?type=${activeTab}`}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-black/8 hover:shadow-black/12 font-semibold"
        >
          <PenSquare size={14} />
          글쓰기
        </Link>
      </div>

      {/* Premium Buyers Section */}
      {activeTab === 'buy' && (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={14} className="text-gray-900" />
            </div>
            <h2 className="font-bold text-[15px] text-gray-900">프리미엄 구매 업체</h2>
            <span className="text-[10px] text-gray-900 bg-gray-50 px-2 py-0.5 rounded-full font-semibold">AD</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumBuyers.map((buyer) => (
              <PremiumBuyerCard key={buyer.id} {...buyer} />
            ))}
          </div>
        </div>
      )}

      {/* Post List */}
      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm shadow-gray-900/[0.03]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <h3 className="font-bold text-sm text-gray-900">
            {activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}
          </h3>
          <span className="text-xs text-gray-400">
            {(activeTab === 'sell' ? sellPosts : buyPosts).length}건
          </span>
        </div>

        <div>
          {(activeTab === 'sell' ? sellPosts : buyPosts).map((post) => (
            <SellPostItem key={post.id} post={post} />
          ))}
          {(activeTab === 'sell' ? sellPosts : buyPosts).length === 0 && (
            <div className="py-20 text-center text-gray-400 text-sm">
              등록된 글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
