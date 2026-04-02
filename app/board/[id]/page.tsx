'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Clock, Tag } from 'lucide-react';
import { sellPosts, buyPosts } from '@/data/mock';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = [...sellPosts, ...buyPosts].find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="max-w-[960px] mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 mb-4">게시글을 찾을 수 없습니다.</p>
        <Link href="/board" className="text-emerald-600 font-medium hover:underline">목록으로</Link>
      </div>
    );
  }

  const isSell = sellPosts.some(p => p.id === post.id);

  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-6">
      <Link href="/board" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-5 transition-colors">
        <ArrowLeft size={16} /> 목록으로
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${isSell ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {isSell ? '팝니다' : '삽니다'}
            </span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg font-medium">{post.categoryName}</span>
            {post.isNew && <span className="text-[9px] bg-emerald-500 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">N</span>}
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="font-medium text-gray-600">{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{post.createdAt}</span>
            <span className="flex items-center gap-1"><Eye size={13} />조회 {post.views}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="px-6 md:px-8 py-3 flex gap-2 border-b border-gray-100">
          {post.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg">
              <Tag size={10} />{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <p className="text-sm text-gray-500 mb-5">
            {'delivery' in post && post.delivery ? post.delivery : '판매일로부터 7일 이내 발송'}
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <span className="text-gray-400 text-xs">상품권 종류</span>
                <p className="font-semibold mt-1 text-gray-800">{post.categoryName}</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">액면가</span>
                <p className="font-semibold mt-1 text-gray-800">{post.faceValue.toLocaleString()}원</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">할인율</span>
                <p className="font-bold mt-1 text-emerald-600 text-lg">{post.discount}%</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs">판매가</span>
                <p className="font-extrabold text-xl mt-1 text-gray-900">{post.price.toLocaleString()}<span className="text-sm font-medium text-gray-500">원</span></p>
              </div>
            </div>
          </div>

          <Link
            href="/chat/1"
            className="block w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-sm"
          >
            {isSell ? '구매하기' : '판매하기'}
          </Link>
        </div>
      </div>
    </div>
  );
}
