'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { CommunityCategory } from '@/lib/types';

const CATEGORY_LABEL: Record<CommunityCategory, string> = {
  news: '업계뉴스',
  tip: '거래TIP',
  qna: '질문과답변',
};

function WriteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const initialCat = (searchParams.get('cat') as CommunityCategory) || 'qna';

  const [category, setCategory] = useState<CommunityCategory>(initialCat);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) setAuthorName(user.name);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!authorName.trim()) {
      setError('작성자 이름을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          title: title.trim(),
          content: content.trim() || null,
          author_id: user?.id || null,
          author_name: authorName.trim(),
          is_pinned: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '등록에 실패했습니다.');
      router.push(`/community/${data.post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-main py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">커뮤니티 글쓰기</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; <Link href="/community">커뮤니티</Link> &gt; 글쓰기
        </div>
      </div>

      <div className="max-w-[900px] mx-auto">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
            <Link href={`/community?cat=${category}`} className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-accent">
              <ArrowLeft size={12} /> 목록
            </Link>
            <h2 className="text-[14px] font-bold">새 글 작성</h2>
            <span />
          </div>

          <div className="p-5 space-y-4">
            {/* 카테고리 */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">카테고리 *</label>
              <div className="flex gap-1">
                {(Object.keys(CATEGORY_LABEL) as CommunityCategory[]).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 text-[12px] border transition-colors ${
                      category === c ? 'border-accent bg-accent text-white font-bold' : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
                    }`}
                  >
                    {CATEGORY_LABEL[c]}
                  </button>
                ))}
              </div>
            </div>

            {/* 작성자 */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">작성자 *</label>
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder="닉네임 또는 이름"
                maxLength={30}
                className="w-full h-10 px-3 border border-gray-300 text-[13px] focus:border-accent focus:outline-none"
              />
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">제목 *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력하세요 (최대 200자)"
                maxLength={200}
                className="w-full h-10 px-3 border border-gray-300 text-[13px] focus:border-accent focus:outline-none"
              />
              <p className="text-[11px] text-gray-400 mt-1 text-right">{title.length}/200</p>
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">내용</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="내용을 입력하세요..."
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 text-[13px] focus:border-accent focus:outline-none resize-y"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-[12px] text-red-600">{error}</div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Link
                href={`/community?cat=${category}`}
                className="btn-secondary h-10 px-4 text-[12px]"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="btn-accent h-10 px-6 text-[12px] disabled:opacity-60"
              >
                {submitting ? '등록 중...' : '등록하기'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={<div className="container-main py-10 text-center text-gray-400 text-[13px]">불러오는 중...</div>}>
      <WriteContent />
    </Suspense>
  );
}
