'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageSquare, MessageCircle, ShieldCheck, Trash2, X } from 'lucide-react';

interface PostComment {
  id: string;
  post_id: string;
  author_id: string | null;
  author_name: string;
  author_phone: string;
  bid_price: number | null;
  content: string;
  created_at: string;
}

interface Props {
  postId: string;
  /** 게시글 작성자(판매자) 본인인지 여부 — 본인이면 댓글 작성 폼 숨김 */
  isAuthor: boolean;
  /** 로그인한 사용자(있으면 author_id로 연결) */
  currentUser?: { id: string; name: string; phone?: string | null } | null;
}

const stripPhone = (p: string) => p.replace(/[^0-9+]/g, '');
const SMS_BODY = '티켓바이 보고 연락드립니다.';

export default function BuyOfferComments({ postId, isAuthor, currentUser }: Props) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popupComment, setPopupComment] = useState<PostComment | null>(null);

  useEffect(() => {
    if (currentUser) {
      setForm((p) => ({
        ...p,
        name: p.name || currentUser.name || '',
        phone: p.phone || currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/comments?post_id=${postId}`);
      const data = await res.json();
      if (res.ok) setComments(data.comments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.phone.trim() || !form.content.trim()) {
      setError('업체명/이름·연락처·내용은 필수입니다.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/posts/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          author_id: currentUser?.id || null,
          author_name: form.name,
          author_phone: form.phone,
          bid_price: null,
          content: form.content,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '댓글 등록 실패');
      setForm((p) => ({ ...p, content: '' }));
      fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/posts/comments?id=${commentId}`, { method: 'DELETE' });
      if (res.ok) fetchComments();
    } catch {
      // ignore
    }
  };

  return (
    <div className="px-5 py-5 border-t border-gray-100 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-bold text-gray-800 flex items-center gap-1.5">
          <MessageCircle size={14} className="text-accent" />
          매입 문의 댓글
          <span className="text-[12px] text-gray-400 font-normal">{comments.length}건</span>
        </h3>
        <span className="text-[11px] text-gray-400 flex items-center gap-1">
          <ShieldCheck size={10} /> 매입업체가 직접 연락처를 남깁니다
        </span>
      </div>

      {/* 댓글 목록 */}
      {loading ? (
        <p className="py-6 text-center text-[12px] text-gray-400">불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className="py-8 text-center text-[12px] text-gray-400 bg-gray-50 border border-dashed border-gray-200">
          아직 매입 문의 댓글이 없습니다. 첫 매입 제안을 남겨보세요.
        </p>
      ) : (
        <ul className="space-y-2 mb-4">
          {comments.map((c) => {
            const phoneDigits = stripPhone(c.author_phone);
            return (
              <li key={c.id} className="bg-gray-50 border border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <button
                    type="button"
                    onClick={() => setPopupComment(c)}
                    className="text-[13px] font-bold text-gray-800 truncate hover:text-accent hover:underline text-left"
                    title="업체 정보 보기"
                  >
                    {c.author_name}
                  </button>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] text-gray-400 tabular-nums">
                      {new Date(c.created_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isAuthor && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="삭제"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[12.5px] text-gray-700 leading-relaxed whitespace-pre-wrap mb-2">{c.content}</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${phoneDigits}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11.5px] font-bold text-accent bg-white border border-accent rounded hover:bg-accent-bg transition-colors whitespace-nowrap"
                  >
                    <Phone size={11} /> <span className="tabular-nums">{c.author_phone}</span>
                  </a>
                  <a
                    href={`sms:${phoneDigits}?&body=${encodeURIComponent(SMS_BODY)}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11.5px] font-bold text-gray-700 bg-white border border-gray-300 rounded hover:border-gray-400 transition-colors whitespace-nowrap"
                  >
                    <MessageSquare size={11} /> 문자
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* 댓글 작성 폼 — 게시글 작성자 본인이 아닐 때만. 로그인된 업체만 작성 가능 */}
      {!isAuthor && (
        currentUser ? (
          <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-4 space-y-2.5">
            {/* 로그인된 업체 정보 자동 표시 (읽기 전용) */}
            <div className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-200">
              <span className="text-[11px] text-gray-400 shrink-0">댓글 작성자</span>
              <span className="text-[13px] font-bold text-gray-900 truncate">{form.name || currentUser.name}</span>
              {form.phone && (
                <span className="text-[12px] text-gray-500 tabular-nums whitespace-nowrap ml-auto">{form.phone}</span>
              )}
            </div>
            <textarea
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              placeholder="모든 메신저 아이디(카카오톡, 텔레그램, 라인 등) 기재 금지입니다. *"
              rows={3}
              maxLength={1000}
              required
              className="input text-[12.5px]"
              style={{ height: 'auto', minHeight: '70px', padding: '8px 12px' }}
            />
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 text-[11px] text-red-600">{error}</div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="btn-accent h-9 px-5 text-[12.5px] disabled:opacity-60"
              >
                {submitting ? '등록 중...' : '댓글 등록'}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 border border-gray-200 p-5 text-center">
            <p className="text-[12.5px] text-gray-600 mb-2">
              매입 댓글은 <span className="font-bold text-gray-800">업체 가입·승인을 받은 회원</span>만 작성할 수 있습니다.
            </p>
            <a href="/login" className="btn-accent inline-flex h-9 px-5 text-[12.5px]">
              업체 로그인
            </a>
          </div>
        )
      )}

      {/* 댓글 작성자(업체) 정보 팝업 — 페이지 이동 없이 모달로 표시 */}
      {popupComment && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setPopupComment(null)}
        >
          <div
            className="bg-white border border-gray-200 shadow-2xl w-full max-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <span className="text-[13px] font-bold text-gray-800">업체 정보</span>
              <button
                type="button"
                onClick={() => setPopupComment(null)}
                aria-label="닫기"
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-5 py-5 space-y-3">
              <div>
                <p className="text-[10px] text-gray-400 mb-1">업체명</p>
                <p className="text-[15px] font-bold text-gray-900">{popupComment.author_name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1">연락처</p>
                <p className="text-[14px] font-bold text-gray-900 tabular-nums whitespace-nowrap">
                  {popupComment.author_phone}
                </p>
              </div>
              {popupComment.content && (
                <div>
                  <p className="text-[10px] text-gray-400 mb-1">메시지</p>
                  <p className="text-[12.5px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {popupComment.content}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${stripPhone(popupComment.author_phone)}`}
                  className="btn-accent w-full h-10 text-[13px] inline-flex items-center justify-center gap-1.5"
                >
                  <Phone size={13} /> 통화하기
                </a>
                <a
                  href={`sms:${stripPhone(popupComment.author_phone)}?&body=${encodeURIComponent(SMS_BODY)}`}
                  className="btn-secondary w-full h-10 text-[13px] inline-flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={13} /> 문자하기
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
