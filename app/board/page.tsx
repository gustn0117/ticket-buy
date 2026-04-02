'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PenSquare, Settings } from 'lucide-react';
import CategoryBar from '@/components/home/CategoryBar';
import SellPostItem from '@/components/home/SellPostItem';
import { sellPosts, buyPosts } from '@/data/mock';

export default function BoardPage() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = activeTab === 'sell' ? sellPosts : buyPosts;
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      <CategoryBar onSelect={setSelectedCategory} />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3.5 text-center font-medium text-sm transition-colors ${
              activeTab === 'buy' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
            }`}
          >
            삽니다
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3.5 text-center font-medium text-sm transition-colors ${
              activeTab === 'sell' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
            }`}
          >
            팝니다
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-bold text-sm">
            {activeTab === 'buy' ? '구매글' : '판매글'} ({filteredPosts.length})
          </h3>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Settings size={16} />
            </button>
            <Link
              href={`/board/write?type=${activeTab}`}
              className="flex items-center gap-1 bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-primary-dark"
            >
              <PenSquare size={12} />
              글쓰기
            </Link>
          </div>
        </div>

        {/* Posts */}
        <div>
          {filteredPosts.map((post) => (
            <SellPostItem key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm">
              등록된 글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
