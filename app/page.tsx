'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, PenSquare } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryBar from '@/components/home/CategoryBar';
import PremiumBuyerCard from '@/components/home/PremiumBuyerCard';
import SellPostItem from '@/components/home/SellPostItem';
import Sidebar from '@/components/home/Sidebar';
import { premiumBuyers, sellPosts, buyPosts } from '@/data/mock';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSellPosts = selectedCategory === 'all'
    ? sellPosts
    : sellPosts.filter(p => p.category === selectedCategory);

  const filteredBuyPosts = selectedCategory === 'all'
    ? buyPosts
    : buyPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-4 md:py-6">
      <HeroBanner />
      <CategoryBar onSelect={setSelectedCategory} />

      <div className="flex gap-6">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="bg-white rounded-t-lg border border-gray-200 overflow-hidden">
            <div className="flex">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-3.5 text-center font-medium text-sm transition-colors ${
                  activeTab === 'buy'
                    ? 'text-primary border-b-2 border-primary bg-white'
                    : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                삽니다
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-3.5 text-center font-medium text-sm transition-colors ${
                  activeTab === 'sell'
                    ? 'text-primary border-b-2 border-primary bg-white'
                    : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                팝니다
              </button>
            </div>
          </div>

          {/* Premium Buyers Section */}
          {activeTab === 'buy' && (
            <div className="bg-white border-x border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="font-bold text-base">프리미엄 구매 업체</h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">광고</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {premiumBuyers.map((buyer) => (
                  <PremiumBuyerCard key={buyer.id} {...buyer} />
                ))}
              </div>
            </div>
          )}

          {/* Post List */}
          <div className="bg-white border border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-sm">
                {activeTab === 'buy' ? '일반 구매글' : '일반 판매글'}
              </h3>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings size={16} />
                </button>
                <Link
                  href={`/board/write?type=${activeTab}`}
                  className="flex items-center gap-1 bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-primary-dark transition-colors"
                >
                  <PenSquare size={12} />
                  {activeTab === 'buy' ? '구매' : '판매'}
                </Link>
              </div>
            </div>

            <div>
              {(activeTab === 'sell' ? filteredSellPosts : filteredBuyPosts).map((post) => (
                <SellPostItem key={post.id} post={post} />
              ))}
              {(activeTab === 'sell' ? filteredSellPosts : filteredBuyPosts).length === 0 && (
                <div className="py-12 text-center text-gray-400 text-sm">
                  등록된 글이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop only */}
        <div className="hidden lg:block w-[300px] shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
