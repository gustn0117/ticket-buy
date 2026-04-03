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
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-5 border-b border-zinc-200">
        <div className="flex">
          <button onClick={() => setActiveTab('buy')}
            className={`tab-underline ${activeTab === 'buy' ? 'active' : ''}`}>
            삽니다
          </button>
          <button onClick={() => setActiveTab('sell')}
            className={`tab-underline ${activeTab === 'sell' ? 'active' : ''}`}>
            팝니다
          </button>
        </div>
        <Link href={`/board/write?type=${activeTab}`}
          className="btn-primary">
          <PenSquare size={13} /> 글쓰기
        </Link>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title mb-0">{activeTab === 'buy' ? '구매글' : '판매글'}</h2>
        <span className="text-[11px] text-zinc-400">{posts.length}건</span>
      </div>
      <div className="card overflow-hidden">
        {posts.map((post) => <SellPostItem key={post.id} post={post} />)}
        {posts.length === 0 && <div className="py-16 text-center text-zinc-400 text-[13px]">등록된 글이 없습니다.</div>}
      </div>
    </div>
  );
}
