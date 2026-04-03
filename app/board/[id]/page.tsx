'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, Clock, Pencil, Trash2 } from 'lucide-react';
import { getPost, deletePost, createChat } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import type { DBPost, DBUser } from '@/lib/types';

type PostWithAuthor = DBPost & { author: DBUser };

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [post, setPost] = useState<PostWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getPost(id)
      .then((data) => setPost(data))
      .catch((err) => setError(err.message || '게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setDeleting(true);
    try {
      await deletePost(id);
      router.push('/board');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '삭제에 실패했습니다.';
      alert(message);
      setDeleting(false);
    }
  };

  const handleContact = async () => {
    if (!isLoggedIn || !user) {
      router.push('/login');
      return;
    }
    if (!post) return;
    try {
      const isSell = post.type === 'sell';
      const chat = await createChat({
        post_id: post.id,
        buyer_id: isSell ? user.id : post.author_id,
        seller_id: isSell ? post.author_id : user.id,
      });
      router.push(`/chat/${chat.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '채팅 생성에 실패했습니다.';
      alert(message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[740px] mx-auto px-5 py-20 text-center">
        <p className="text-zinc-400 text-[13px]">불러오는 중...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-[740px] mx-auto px-5 py-20 text-center">
        <p className="text-zinc-400 text-[13px] mb-4">{error || '게시글을 찾을 수 없습니다.'}</p>
        <Link href="/board" className="text-[13px] text-zinc-900 underline">목록으로</Link>
      </div>
    );
  }

  const isSell = post.type === 'sell';
  const isAuthor = isLoggedIn && user?.id === post.author_id;

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
            <span className="badge bg-zinc-100 text-zinc-500">{post.category_name}</span>
            {post.is_new && <span className="badge bg-zinc-900 text-white">N</span>}
          </div>
          <h1 className="text-[15px] font-semibold mb-3">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-400">
            <span className="text-zinc-600 font-medium">{post.author?.name ?? '알 수 없음'}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
            <span className="flex items-center gap-1"><Eye size={12} />조회 {post.views}</span>
          </div>
        </div>

        <div className="px-5 py-3 flex gap-2 border-b border-zinc-100">
          {post.tags?.map((tag) => (
            <span key={tag} className="badge bg-zinc-100 text-zinc-500">{tag}</span>
          ))}
        </div>

        <div className="p-5">
          <p className="text-[13px] text-zinc-500 mb-5">
            {post.delivery ? post.delivery : '판매일로부터 7일 이내 발송'}
          </p>

          <div className="bg-zinc-50 rounded-lg p-5 mb-5">
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-[11px] text-zinc-400">상품권 종류</span>
                <p className="font-medium mt-0.5">{post.category_name}</p>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">액면가</span>
                <p className="font-medium mt-0.5">{post.face_value.toLocaleString()}원</p>
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

          {isAuthor ? (
            <div className="flex gap-3">
              <Link href={`/board/write?edit=${post.id}`} className="btn-secondary flex-1 h-10 flex items-center justify-center gap-1">
                <Pencil size={14} /> 수정
              </Link>
              <button onClick={handleDelete} disabled={deleting} className="btn-secondary flex-1 h-10 flex items-center justify-center gap-1 text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 size={14} /> {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          ) : (
            <button onClick={handleContact} className="btn-primary w-full h-10">
              {isSell ? '구매하기' : '판매하기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
