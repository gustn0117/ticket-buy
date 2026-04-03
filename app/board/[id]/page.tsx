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
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <p className="text-gray-400 mb-4">게시글을 찾을 수 없습니다.</p>
        <Link href="/board" className="text-sm text-gray-900 underline">목록으로</Link>
      </div>
    );
  }

  const isSell = sellPosts.some(p => p.id === post.id);

  return (
    <div className="max-w-[800px] mx-auto px-6 py-6">
      <Link href="/board" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 mb-5 transition-colors">
        <ArrowLeft size={15} /> 목록
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${isSell ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
              {isSell ? '팝니다' : '삽니다'}
            </span>
            <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{post.categoryName}</span>
            {post.isNew && <span className="text-[10px] bg-gray-900 text-white px-1.5 py-px rounded font-medium">N</span>}
          </div>
          <h1 className="text-lg font-bold mb-3">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="text-gray-600 font-medium">{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{post.createdAt}</span>
            <span className="flex items-center gap-1"><Eye size={12} />조회 {post.views}</span>
          </div>
        </div>

        <div className="px-6 py-3 flex gap-2 border-b border-gray-100">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] bg-gray-50 text-gray-500 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 mb-5">
            {'delivery' in post && post.delivery ? post.delivery : '판매일로부터 7일 이내 발송'}
          </p>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-400">상품권 종류</span>
                <p className="font-medium mt-0.5">{post.categoryName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">액면가</span>
                <p className="font-medium mt-0.5">{post.faceValue.toLocaleString()}원</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">할인율</span>
                <p className="font-bold mt-0.5 text-red-500">{post.discount}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">판매가</span>
                <p className="font-bold text-lg mt-0.5">{post.price.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          <Link href="/chat/1" className="block w-full text-center bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
            {isSell ? '구매하기' : '판매하기'}
          </Link>
        </div>
      </div>
    </div>
  );
}
