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
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-5 border-b border-gray-200">
        <div className="flex">
          <button onClick={() => setActiveTab('buy')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'buy' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
            삽니다
          </button>
          <button onClick={() => setActiveTab('sell')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'sell' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
            팝니다
          </button>
        </div>
        <Link href={`/board/write?type=${activeTab}`}
          className="flex items-center gap-1.5 bg-gray-900 text-white text-xs px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
          <PenSquare size={13} /> 글쓰기
        </Link>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">{activeTab === 'buy' ? '구매글' : '판매글'}</h2>
        <span className="text-xs text-gray-400">{posts.length}건</span>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {posts.map((post) => <SellPostItem key={post.id} post={post} />)}
        {posts.length === 0 && <div className="py-16 text-center text-gray-400 text-sm">등록된 글이 없습니다.</div>}
      </div>
    </div>
  );
}
