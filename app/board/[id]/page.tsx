'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, Clock, Pencil, Trash2, ShieldCheck, Tag, ShoppingCart } from 'lucide-react';
import { getPost, deletePost, createChat } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import type { DBPost, DBUser } from '@/lib/types';
import { getCategoryName } from '@/data/mock';
import { BrandLogo } from '@/components/BrandLogo';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

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
    if (post && !post.author_id) {
      const pwd = prompt('삭제하려면 작성 시 설정한 비밀번호를 입력하세요.');
      if (!pwd) return;
      if (pwd !== post.guest_password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    } else if (!confirm('정말 삭제하시겠습니까?')) return;

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

  const handleContact = async (tradeType: 'direct' | 'escrow' = 'direct') => {
    if (!post) return;
    if (!post.author_id) {
      if (post.guest_phone) {
        if (confirm(`판매자 연락처: ${post.guest_phone}\n\n전화를 거시겠습니까?`)) {
          window.location.href = `tel:${post.guest_phone}`;
        }
      } else {
        alert('판매자가 연락처를 등록하지 않았습니다. 직접 연락할 수 없습니다.');
      }
      return;
    }
    if (!isLoggedIn || !user) {
      router.push('/login');
      return;
    }
    try {
      const isSell = post.type === 'sell';
      const chat = await createChat({
        post_id: post.id,
        buyer_id: isSell ? user.id : post.author_id,
        seller_id: isSell ? post.author_id : user.id,
        trade_type: tradeType,
      });
      window.dispatchEvent(new CustomEvent('open-chat-widget', { detail: { chatId: chat.id } }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '채팅 생성에 실패했습니다.';
      alert(message);
    }
  };

  if (loading) {
    return <div className="container-main py-20 text-center text-gray-400 text-[13px]">불러오는 중...</div>;
  }

  if (error || !post) {
    return (
      <div className="container-main py-20 text-center">
        <p className="text-gray-500 text-[13px] mb-4">{error || '게시글을 찾을 수 없습니다.'}</p>
        <Link href="/board" className="text-[12px] text-accent font-bold hover:underline">← 목록으로</Link>
      </div>
    );
  }

  const isSell = post.type === 'sell';
  const isGuestPost = !post.author_id;
  const isAuthor = (isLoggedIn && user?.id === post.author_id) || isGuestPost;
  const authorName = post.author?.name || post.guest_name || '알 수 없음';
  const backTab = isSell ? 'sell' : 'buy';
  const headerLabel = isSell ? '상품권 팝니다' : '상품권 삽니다';
  const HeaderIcon = isSell ? Tag : ShoppingCart;

  return (
    <div className="container-main py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">{headerLabel}</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; <Link href={`/board?tab=${backTab}`}>{headerLabel}</Link> &gt; 상세
        </div>
      </div>

      <div className="flex gap-4">
        <LeftSidebar />

        <div className="flex-1 min-w-0">
          <article className="bg-white border border-gray-200 mb-4">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <Link href={`/board?tab=${backTab}`} className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-accent">
                <ArrowLeft size={12} /> 목록
              </Link>
              <span className="flex items-center gap-1.5 text-[12px] text-accent font-bold">
                <HeaderIcon size={12} /> {headerLabel}
              </span>
              {isAuthor ? (
                <div className="flex items-center gap-2">
                  <Link href={`/board/write?edit=${post.id}`} className="text-[11px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                    <Pencil size={11} /> 수정
                  </Link>
                  <button onClick={handleDelete} disabled={deleting} className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-600">
                    <Trash2 size={11} /> {deleting ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              ) : <span />}
            </div>

            {/* Title block */}
            <div className="px-5 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <BrandLogo name={getCategoryName(post.category)} size="sm" />
                {(Date.now() - new Date(post.created_at).getTime() < 3 * 86400000) && (
                  <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-sm">NEW</span>
                )}
                {post.tags?.map(t => (
                  <span key={t} className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                    {t.startsWith('#') ? t : `#${t}`}
                  </span>
                ))}
              </div>
              <h2 className="text-[18px] font-bold text-gray-800 mb-2">{post.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                <span className="text-gray-700 font-medium">
                  {authorName}
                  {isGuestPost && <span className="ml-1 text-gray-400 font-normal text-[10px]">개인판매자</span>}
                </span>
                <span className="flex items-center gap-1"><Clock size={11} />{new Date(post.created_at).toLocaleString('ko-KR')}</span>
                <span className="flex items-center gap-1"><Eye size={11} />조회 {post.views}</span>
              </div>
            </div>

            {/* Info grid */}
            <div className="px-5 py-5 border-b border-gray-100">
              <div className="bg-gray-50 border border-gray-100 p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">상품권 종류</p>
                    <p className="font-bold text-gray-800">{getCategoryName(post.category)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">액면가</p>
                    <p className="font-bold text-gray-800">{post.face_value.toLocaleString()}원</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">할인율</p>
                    <p className="font-bold text-accent">{post.discount}%</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">{isSell ? '판매가' : '희망가'}</p>
                    <p className="font-bold text-[16px] text-gray-900">{post.price.toLocaleString()}원</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-5 py-5 border-b border-gray-100">
              {post.description && (
                <div className="mb-4">
                  <p className="text-[11px] text-gray-400 mb-2">상세 설명</p>
                  <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">{post.description}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
                <div>
                  <p className="text-[11px] text-gray-400 mb-1">발송 방법</p>
                  <p className="font-medium text-gray-700">{post.delivery_method || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-1">발송 안내</p>
                  <p className="font-medium text-gray-700">{post.delivery || '판매일로부터 7일 이내 발송'}</p>
                </div>
                {post.region && (
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1">지역</p>
                    <p className="font-medium text-gray-700">{post.region}</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            {!isAuthor && (
              <div className="px-5 py-5 bg-gray-50 space-y-2">
                <button onClick={() => handleContact('direct')} className="btn-accent w-full h-11 text-[13px]">
                  {isSell ? '구매 문의하기' : '판매 문의하기'} (직접거래)
                </button>
                <button onClick={() => handleContact('escrow')} className="btn-secondary w-full h-11 text-[13px]">
                  <ShieldCheck size={14} /> 중개거래로 안전하게
                </button>
                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  중개거래 시 티켓바이가 계약서 작성 및 금전/상품권 전달을 중개합니다.
                </p>
              </div>
            )}

            {/* Bottom nav */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
              <Link href={`/board?tab=${backTab}`} className="btn-secondary h-8 px-3 text-[12px]">
                <ArrowLeft size={12} /> 목록
              </Link>
              <Link href={`/board/write?type=${backTab}`} className="btn-accent h-8 px-3 text-[12px]">
                새 글 작성
              </Link>
            </div>
          </article>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
