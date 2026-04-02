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
      <div className="max-w-[960px] mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        <Link href="/board" className="text-primary mt-4 inline-block">목록으로</Link>
      </div>
    );
  }

  const isSell = sellPosts.some(p => p.id === post.id);

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      <Link href="/board" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-4">
        <ArrowLeft size={16} /> 목록으로
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded ${isSell ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
              {isSell ? '팝니다' : '삽니다'}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{post.categoryName}</span>
            {post.isNew && <span className="text-[10px] bg-red-500 text-white px-1 rounded">N</span>}
          </div>
          <h1 className="text-xl font-bold mb-3">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{post.author}</span>
            <span className="flex items-center gap-1"><Clock size={14} />{post.createdAt}</span>
            <span className="flex items-center gap-1"><Eye size={14} />조회 {post.views}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="px-6 py-3 flex gap-2 border-b border-gray-100">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            {'delivery' in post && post.delivery ? post.delivery : '판매일로부터 7일 이내 발송'}
          </p>

          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">상품권 종류</span>
                <p className="font-medium mt-1">{post.categoryName}</p>
              </div>
              <div>
                <span className="text-gray-500">액면가</span>
                <p className="font-medium mt-1">{post.faceValue.toLocaleString()}원</p>
              </div>
              <div>
                <span className="text-gray-500">할인율</span>
                <p className="font-medium mt-1 text-red-500">{post.discount}%</p>
              </div>
              <div>
                <span className="text-gray-500">판매가</span>
                <p className="font-bold text-lg mt-1">{post.price.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex gap-3">
            <Link
              href={`/chat/1`}
              className="flex-1 bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              {isSell ? '구매하기' : '판매하기'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
