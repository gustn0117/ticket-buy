'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageSquare, MessageCircle, ShieldCheck, Trash2 } from 'lucide-react';

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
    bid: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          bid_price: form.bid ? Number(form.bid.replace(/[^0-9]/g, '')) : null,
          content: form.content,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '댓글 등록 실패');
      setForm((p) => ({ ...p, bid: '', content: '' }));
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
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-[13px] font-bold text-gray-800 truncate">{c.author_name}</span>
                    {c.bid_price && (
                      <span className="text-[11px] font-bold text-accent bg-accent-bg px-1.5 py-0.5 rounded">
                        매입가 {c.bid_price.toLocaleString()}원
                      </span>
                    )}
                  </div>
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

      {/* 댓글 작성 폼 — 게시글 작성자 본인이 아닐 때만 */}
      {!isAuthor && (
        <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-4 space-y-2.5">
          <p className="text-[12px] text-gray-600 mb-1">
            <span className="font-bold text-gray-800">매입 제안 댓글</span>을 남기면 판매자가 직접 연락드립니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="업체명 또는 이름 *"
              maxLength={50}
              required
              className="input h-9 text-[12.5px]"
            />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="연락처 * (010-0000-0000)"
              maxLength={20}
              required
              className="input h-9 text-[12.5px]"
            />
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={form.bid}
            onChange={(e) => setForm((p) => ({ ...p, bid: e.target.value.replace(/[^0-9]/g, '') }))}
            placeholder="제안 매입가 (원, 선택)"
            maxLength={10}
            className="input h-9 text-[12.5px]"
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            placeholder="조건·발송 방식 등 메시지를 남겨주세요. *"
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
              {submitting ? '등록 중...' : '매입 제안 댓글 등록'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
