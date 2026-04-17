'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, ChevronRight, Pin, MessageCircle, Eye, ChevronLeft } from 'lucide-react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import type { DBCommunityPost, CommunityCategory } from '@/lib/types';

const CATEGORY_META: Record<CommunityCategory, { label: string; desc: string }> = {
  news: { label: '업계뉴스', desc: '상품권 시장의 최신 소식과 동향을 공유합니다.' },
  tip: { label: '거래TIP', desc: '안전하고 똑똑한 상품권 거래 노하우를 나눕니다.' },
  qna: { label: '질문과답변', desc: '궁금한 점을 묻고 답해보세요.' },
};

function CommunityContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCat = (searchParams.get('cat') as CommunityCategory) || 'news';
  const [activeCat, setActiveCat] = useState<CommunityCategory>(initialCat);
  const [posts, setPosts] = useState<DBCommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupRequired, setSetupRequired] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const cat = (searchParams.get('cat') as CommunityCategory) || 'news';
    setActiveCat(cat);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setSetupRequired(false);
    fetch(`/api/community/posts?category=${activeCat}&limit=200`)
      .then(async r => {
        const data = await r.json();
        if (data.setup_required) {
          setSetupRequired(true);
          setPosts([]);
        } else {
          setPosts(data.posts || []);
        }
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [activeCat]);

  const changeCategory = (cat: CommunityCategory) => {
    router.push(`/community?cat=${cat}`);
  };

  const pinned = posts.filter(p => p.is_pinned);
  const regular = posts.filter(p => !p.is_pinned);
  const totalPages = Math.max(1, Math.ceil(regular.length / pageSize));
  const pageItems = regular.slice((page - 1) * pageSize, page * pageSize);

  const meta = CATEGORY_META[activeCat];

  return (
    <div className="container-main py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">커뮤니티</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; 커뮤니티 &gt; {meta.label}
        </div>
      </div>

      <div className="flex gap-4">
        <LeftSidebar />

        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="bg-white border border-gray-200 mb-4">
            <div className="flex border-b border-gray-200">
              {(Object.keys(CATEGORY_META) as CommunityCategory[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => changeCategory(cat)}
                  className={`flex-1 py-3 text-center text-[13px] transition-colors ${
                    activeCat === cat
                      ? 'font-bold text-accent border-b-2 border-accent bg-accent/5'
                      : 'text-gray-500 hover:text-accent'
                  }`}
                >
                  {CATEGORY_META[cat].label}
                </button>
              ))}
            </div>
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-[12px] text-gray-600">{meta.desc}</p>
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200">
              <div className="text-[12px] text-gray-500">
                총 <span className="text-accent font-bold">{posts.length}</span>건
              </div>
              <Link
                href={`/community/write?cat=${activeCat}`}
                className="btn-accent h-8 px-3 text-[12px]"
              >
                <Plus size={12} /> 글쓰기
              </Link>
            </div>

            {/* List */}
            {loading ? (
              <div className="py-20 text-center text-gray-400 text-[13px]">불러오는 중...</div>
            ) : setupRequired ? (
              <div className="py-12 px-6">
                <div className="max-w-[500px] mx-auto bg-amber-50 border border-amber-200 p-5 text-center">
                  <p className="text-[13px] font-bold text-amber-800 mb-2">커뮤니티 테이블 초기 설정이 필요합니다</p>
                  <p className="text-[12px] text-amber-700 mb-3">
                    Supabase SQL Editor에서 아래 파일을 실행하면 커뮤니티 기능이 활성화됩니다.
                  </p>
                  <code className="inline-block bg-white border border-amber-200 px-3 py-1 text-[11px] text-amber-900 font-mono">
                    /supabase/migrations/20260418_community.sql
                  </code>
                  <p className="text-[11px] text-amber-600 mt-3">
                    (community_posts, community_comments 테이블과 조회수 RPC를 생성합니다.)
                  </p>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[13px] text-gray-500 mb-2">아직 등록된 게시글이 없습니다.</p>
                <Link href={`/community/write?cat=${activeCat}`} className="text-[12px] text-accent font-bold hover:underline">
                  첫 글 작성하기 →
                </Link>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="hidden md:grid md:grid-cols-[60px_1fr_100px_60px_80px_100px] gap-0 px-4 py-2 text-[11px] text-gray-500 bg-gray-50 border-b border-gray-100">
                  <span>번호</span>
                  <span>제목</span>
                  <span>작성자</span>
                  <span className="text-center">조회</span>
                  <span className="text-center">댓글</span>
                  <span className="text-right">날짜</span>
                </div>

                {/* Pinned */}
                {pinned.map((p) => (
                  <Link
                    key={p.id}
                    href={`/community/${p.id}`}
                    className="block md:grid md:grid-cols-[60px_1fr_100px_60px_80px_100px] gap-0 px-4 py-2.5 border-b border-gray-100 hover:bg-accent/5 bg-accent/[0.03] transition-colors text-[12px]"
                  >
                    <span className="hidden md:flex items-center justify-start">
                      <Pin size={11} className="text-accent" />
                    </span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <span className="md:hidden text-accent"><Pin size={10} /></span>
                      {p.title}
                      {p.comment_count && p.comment_count > 0 ? <span className="text-accent font-normal">[{p.comment_count}]</span> : null}
                    </span>
                    <span className="hidden md:block text-gray-500 truncate">{p.author_name || '운영팀'}</span>
                    <span className="hidden md:flex items-center justify-center gap-0.5 text-gray-400"><Eye size={10} />{p.views}</span>
                    <span className="hidden md:flex items-center justify-center gap-0.5 text-gray-400"><MessageCircle size={10} />{p.comment_count || 0}</span>
                    <span className="hidden md:block text-right text-gray-400 text-[11px]">{formatDate(p.created_at)}</span>
                  </Link>
                ))}

                {/* Regular */}
                {pageItems.map((p, idx) => (
                  <Link
                    key={p.id}
                    href={`/community/${p.id}`}
                    className="block md:grid md:grid-cols-[60px_1fr_100px_60px_80px_100px] gap-0 px-4 py-2.5 border-b border-gray-100 hover:bg-gray-50 transition-colors text-[12px]"
                  >
                    <span className="hidden md:block text-gray-400">{regular.length - ((page - 1) * pageSize + idx)}</span>
                    <span className="text-gray-700 flex items-center gap-1 truncate">
                      {p.title}
                      {p.comment_count && p.comment_count > 0 ? <span className="text-accent">[{p.comment_count}]</span> : null}
                      {isNew(p.created_at) && <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>}
                    </span>
                    <span className="hidden md:block text-gray-500 truncate">{p.author_name || '익명'}</span>
                    <span className="hidden md:flex items-center justify-center gap-0.5 text-gray-400"><Eye size={10} />{p.views}</span>
                    <span className="hidden md:flex items-center justify-center gap-0.5 text-gray-400"><MessageCircle size={10} />{p.comment_count || 0}</span>
                    <span className="hidden md:block text-right text-gray-400 text-[11px]">{formatDate(p.created_at)}</span>
                  </Link>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 px-4 py-4 border-t border-gray-100">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-accent hover:text-accent disabled:opacity-30"
                    >
                      <ChevronLeft size={12} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-7 h-7 text-[12px] border ${
                          p === page ? 'border-accent bg-accent text-white font-bold' : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-accent hover:text-accent disabled:opacity-30"
                    >
                      <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = Date.now();
  const diff = now - d.getTime();
  if (diff < 86400000) {
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function isNew(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < 3 * 86400000;
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="container-main py-10 text-center text-gray-400 text-[13px]">불러오는 중...</div>}>
      <CommunityContent />
    </Suspense>
  );
}
