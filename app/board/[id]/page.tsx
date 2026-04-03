'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Clock } from 'lucide-react';
import { sellPosts, buyPosts } from '@/data/mock';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = [...sellPosts, ...buyPosts].find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="max-w-[740px] mx-auto px-5 py-20 text-center">
        <p className="text-zinc-400 text-[13px] mb-4">게시글을 찾을 수 없습니다.</p>
        <Link href="/board" className="text-[13px] text-zinc-900 underline">목록으로</Link>
      </div>
    );
  }

  const isSell = sellPosts.some(p => p.id === post.id);

  return (
    <div className="max-w-[740px] mx-auto px-5 py-6">
      <Link href="/board" className="inline-flex items-center gap-1 text-[13px] text-zinc-400 hover:text-zinc-700 mb-5 transition-colors">
        <ArrowLeft size={15} /> 목록
      </Link>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-zinc-100">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge ${isSell ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-500'}`}>
              {isSell ? '팝니다' : '삽니다'}
            </span>
            <span className="badge bg-zinc-100 text-zinc-500">{post.categoryName}</span>
            {post.isNew && <span className="badge bg-zinc-900 text-white">N</span>}
          </div>
          <h1 className="text-[15px] font-semibold mb-3">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400">
            <span className="text-zinc-600 font-medium">{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{post.createdAt}</span>
            <span className="flex items-center gap-1"><Eye size={12} />조회 {post.views}</span>
          </div>
        </div>

        <div className="px-5 py-3 flex gap-2 border-b border-zinc-100">
          {post.tags.map((tag) => (
            <span key={tag} className="badge bg-zinc-100 text-zinc-500">{tag}</span>
          ))}
        </div>

        <div className="p-5">
          <p className="text-[13px] text-zinc-500 mb-5">
            {'delivery' in post && post.delivery ? post.delivery : '판매일로부터 7일 이내 발송'}
          </p>

          <div className="bg-zinc-50 rounded-lg p-5 mb-5">
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-[11px] text-zinc-400">상품권 종류</span>
                <p className="font-medium mt-0.5">{post.categoryName}</p>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">액면가</span>
                <p className="font-medium mt-0.5">{post.faceValue.toLocaleString()}원</p>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">할인율</span>
                <p className="font-semibold mt-0.5 text-red-500">{post.discount}%</p>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">판매가</span>
                <p className="font-semibold text-lg mt-0.5">{post.price.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          <Link href="/chat/1" className="btn-primary w-full h-10">
            {isSell ? '구매하기' : '판매하기'}
          </Link>
        </div>
      </div>
    </div>
  );
}
