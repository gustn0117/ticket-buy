'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/data/mock';
import { createPost, getPost, updatePost } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { formatNumber, parseNumber } from '@/lib/format';

export default function WritePostPage() {
  return (
    <Suspense fallback={<div className="max-w-[640px] mx-auto px-5 py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>}>
      <WritePostContent />
    </Suspense>
  );
}

function WritePostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn } = useAuth();

  const editId = searchParams.get('edit');
  const postType = (searchParams.get('type') as 'sell' | 'buy') || 'sell';
  const isEdit = !!editId;

  const [form, setForm] = useState({
    type: postType,
    category: '',
    categoryName: '',
    title: '',
    faceValue: '',
    price: '',
    delivery: '7일 이내 발송',
    deliveryMethod: 'mobile',
    description: '',
    region: '',
    guestName: '',
    guestPassword: '',
    guestPhone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(isEdit);
  const [editAuth, setEditAuth] = useState({ verified: false, password: '' });
  const [editPost, setEditPost] = useState<{ guest_password?: string | null; author_id?: string | null } | null>(null);

  useEffect(() => {
    if (editId) {
      setLoadingEdit(true);
      getPost(editId)
        .then((post) => {
          setEditPost({ guest_password: post.guest_password, author_id: post.author_id });
          setForm((prev) => ({
            ...prev,
            type: post.type,
            category: post.category,
            categoryName: '',
            title: post.title,
            faceValue: String(post.face_value),
            price: String(post.price),
            delivery: post.delivery || '7일 이내 발송',
            deliveryMethod: post.delivery_method || 'mobile',
            description: '',
            region: '',
            guestName: post.guest_name || '',
            guestPhone: post.guest_phone || '',
          }));

          // 회원 글이면 로그인 필요
          if (post.author_id && post.author_id !== user?.id) {
            alert('본인 글만 수정할 수 있습니다.');
            router.push(`/board/${editId}`);
            return;
          }
          if (post.author_id && post.author_id === user?.id) {
            setEditAuth({ verified: true, password: '' });
          }
        })
        .catch(() => {
          alert('게시글을 불러오지 못했습니다.');
          router.push('/board');
        })
        .finally(() => setLoadingEdit(false));
    }
  }, [editId, router, user?.id]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'category') {
        const cat = categories.find(c => c.id === value);
        next.categoryName = cat ? cat.name : '';
      }
      return next;
    });
  };

  const faceValue = Number(form.faceValue) || 0;
  const price = Number(form.price) || 0;
  const discount = faceValue > 0 ? Math.round((1 - price / faceValue) * 100) : 0;

  const verifyEditPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPost?.guest_password === editAuth.password) {
      setEditAuth({ ...editAuth, verified: true });
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비회원 판매글 필수 검증 (로그인 안된 경우)
    if (!isLoggedIn && !isEdit) {
      if (!form.guestName.trim()) return alert('이름을 입력하세요.');
      if (!form.guestPassword.trim() || form.guestPassword.length < 4) return alert('비밀번호는 4자 이상 입력하세요.');
    }

    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        type: form.type as 'sell' | 'buy',
        title: form.title,
        category: form.category,
        face_value: faceValue,
        price,
        delivery_method: form.deliveryMethod,
        delivery: form.delivery,
        tags: [form.delivery, form.region ? `#${form.region}` : '', form.deliveryMethod === 'mobile' ? '#모바일' : form.deliveryMethod === 'parcel' ? '#택배' : '#직접만남'].filter(Boolean),
      };

      if (isLoggedIn && user) {
        payload.author_id = user.id;
      } else {
        payload.author_id = null;
        if (!isEdit) {
          payload.guest_name = form.guestName;
          payload.guest_password = form.guestPassword;
          payload.guest_phone = form.guestPhone || null;
        }
      }

      if (isEdit && editId) {
        await updatePost(editId, payload);
        router.push(`/board/${editId}`);
      } else {
        const created = await createPost(payload);
        router.push(`/board/${created.id}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '등록에 실패했습니다.';
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEdit) {
    return <div className="max-w-[640px] mx-auto px-5 py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>;
  }

  // 비회원 글 수정 시 비밀번호 인증 화면
  if (isEdit && editPost && !editPost.author_id && !editAuth.verified) {
    return (
      <div className="max-w-[400px] mx-auto px-5 py-10">
        <Link href={`/board/${editId}`} className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-900 mb-5 transition-colors font-medium">
          <ArrowLeft size={16} /> 돌아가기
        </Link>
        <div className="card p-5">
          <div className="text-center mb-5">
            <Lock size={24} className="mx-auto text-zinc-400 mb-2" />
            <h1 className="text-[15px] font-semibold">비밀번호 확인</h1>
            <p className="text-[12px] text-zinc-500 mt-1">글 작성 시 설정한 비밀번호를 입력하세요.</p>
          </div>
          <form onSubmit={verifyEditPassword} className="space-y-3">
            <input type="password" value={editAuth.password} onChange={(e) => setEditAuth({ ...editAuth, password: e.target.value })}
              placeholder="비밀번호" className="input" autoFocus />
            <button type="submit" className="btn-primary w-full h-10">확인</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[640px] mx-auto px-5 py-6 animate-fade-in">
      <Link href="/board" className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-900 mb-5 transition-colors font-medium">
        <ArrowLeft size={16} /> 목록으로
      </Link>

      <div className="card p-5">
        <h1 className="section-title mb-5">{isEdit ? '글 수정' : '글쓰기'}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post type */}
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">글 유형 *</label>
            <div className="flex gap-2">
              {[{ value: 'sell', label: '팝니다' }, { value: 'buy', label: '삽니다' }].map(opt => (
                <label key={opt.value} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium rounded-md cursor-pointer transition-colors ${
                  form.type === opt.value ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}>
                  <input type="radio" name="postType" value={opt.value} checked={form.type === opt.value}
                    onChange={(e) => handleChange('type', e.target.value)} className="sr-only" />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">상품권 종류 *</label>
            <select value={form.category} onChange={(e) => handleChange('category', e.target.value)} className="input" required>
              <option value="">선택하세요</option>
              {categories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">제목 *</label>
            <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)}
              placeholder="예: 신세계 10만원권 판매" className="input" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">개당 상품권 금액 (원) *</label>
              <input type="text" inputMode="numeric" value={formatNumber(form.faceValue)}
                onChange={(e) => handleChange('faceValue', parseNumber(e.target.value))} placeholder="100,000" className="input" required />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">개당 구매금액 (원) *</label>
              <input type="text" inputMode="numeric" value={formatNumber(form.price)}
                onChange={(e) => handleChange('price', parseNumber(e.target.value))} placeholder="70,000" className="input" required />
            </div>
          </div>

          {faceValue > 0 && price > 0 && (
            <div className="bg-zinc-50 rounded-md px-4 py-3 text-[13px] border border-zinc-200">
              할인율: <span className="text-zinc-900 font-semibold">{discount}%</span>
            </div>
          )}

          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">발송 예정</label>
            <select value={form.delivery} onChange={(e) => handleChange('delivery', e.target.value)} className="input">
              <option value="즉시발송">즉시발송</option>
              <option value="3일 이내 발송">3일 이내 발송</option>
              <option value="5일 이내 발송">5일 이내 발송</option>
              <option value="7일 이내 발송">7일 이내 발송</option>
              <option value="14일 이내 발송">14일 이내 발송</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">배송 방법</label>
            <div className="flex gap-2">
              {[{ value: 'mobile', label: '모바일' }, { value: 'parcel', label: '택배' }, { value: 'direct', label: '직접만남' }].map(opt => (
                <label key={opt.value} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium rounded-md cursor-pointer transition-colors ${
                  form.deliveryMethod === opt.value ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}>
                  <input type="radio" name="deliveryMethod" value={opt.value} checked={form.deliveryMethod === opt.value}
                    onChange={(e) => handleChange('deliveryMethod', e.target.value)} className="sr-only" />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">지역</label>
            <input type="text" value={form.region} onChange={(e) => handleChange('region', e.target.value)}
              placeholder="예: 서울, 전국" className="input" />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">상세 설명</label>
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)}
              placeholder="추가 설명을 입력하세요" rows={4} className="input h-auto py-3 resize-none" />
          </div>

          {/* 비회원 정보 (로그인 안된 경우 + 신규 작성 시만) */}
          {!isLoggedIn && !isEdit && (
            <div className="card bg-zinc-50 border-zinc-200 p-4">
              <p className="text-[12px] font-semibold text-zinc-700 mb-2">비회원 작성 정보</p>
              <p className="text-[11px] text-zinc-500 mb-3">글 수정·삭제 시 아래 정보가 필요합니다. 회원가입 없이 작성할 수 있습니다.</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">이름/닉네임 *</label>
                  <input type="text" value={form.guestName}
                    onChange={(e) => handleChange('guestName', e.target.value)}
                    placeholder="게시글에 표시됩니다" className="input" required />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">연락처</label>
                  <input type="text" value={form.guestPhone}
                    onChange={(e) => handleChange('guestPhone', e.target.value)}
                    placeholder="010-0000-0000 (선택)" className="input" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">비밀번호 * (4자 이상)</label>
                  <input type="password" value={form.guestPassword}
                    onChange={(e) => handleChange('guestPassword', e.target.value)}
                    placeholder="글 수정·삭제 시 필요합니다" className="input" minLength={4} required />
                </div>
              </div>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full h-10">
            {submitting ? '처리 중...' : isEdit ? '수정하기' : '등록하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
