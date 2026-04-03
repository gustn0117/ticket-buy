'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import SellPostItem from '@/components/home/SellPostItem';
import { sellPosts, buyPosts } from '@/data/mock';

export default function BoardPage() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const posts = activeTab === 'sell' ? sellPosts : buyPosts;

  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'buy' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            삽니다
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'sell' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            팝니다
          </button>
        </div>
        <Link
          href={`/board/write?type=${activeTab}`}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-black/8 font-semibold"
        >
          <PenSquare size={14} />
          글쓰기
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <h3 className="font-bold text-sm text-gray-900">
            {activeTab === 'buy' ? '구매글' : '판매글'}
          </h3>
          <span className="text-xs text-gray-400">{posts.length}건</span>
        </div>

        <div>
          {posts.map((post) => (
            <SellPostItem key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="py-20 text-center text-gray-400 text-sm">
              등록된 글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
