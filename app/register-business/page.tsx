'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RegisterBusinessPage() {
  const [form, setForm] = useState({
    businessName: '',
    businessNumber: '',
    representative: '',
    phone: '',
    messenger: '',
    messengerId: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.passwordConfirm) { setError('비밀번호가 일치하지 않습니다.'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.businessName,
          email: `${form.businessNumber.replace(/-/g, '')}@biz.ticketbuy`,
          password: form.password,
          phone: form.phone || null,
          type: 'business',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '신청에 실패했습니다.');
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '신청에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-[16px] font-semibold mb-2">제휴 신청 완료</h2>
          <p className="text-[13px] text-zinc-500 mb-4">승인 후 사업자번호로 로그인할 수 있습니다.</p>
          <a href="/login" className="btn-primary inline-flex h-9 px-5 text-[12px]">로그인 페이지</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-6">
      <div className="w-full max-w-[640px]">
        <div className="text-center mb-6">
          <Image src="/logo-dark.png" alt="티켓바이" width={140} height={40} className="h-10 w-auto object-contain mx-auto mb-3" priority />
          <h1 className="text-[15px] font-semibold text-zinc-900">매입 업체 제휴 문의</h1>
          <p className="text-[12px] text-zinc-500 mt-1">상품권 매입 업체 등록 신청</p>
        </div>

        <div className="card p-5 animate-fade-in">
          {/* Info Box */}
          <div className="card bg-blue-50 border-blue-100 p-4 text-[13px] text-zinc-900 mb-5 leading-relaxed">
            <p className="font-semibold text-blue-700 mb-1">안내</p>
            <p>상품권 <strong>매입(삽니다)</strong> 업체로 등록하시려면 아래 정보와 <strong>업체 로그인에 사용할 비밀번호</strong>를 입력해 주세요. 승인 시 이 비밀번호로 바로 로그인할 수 있습니다.</p>
            <p className="mt-2 font-medium">담당 연락용 <strong>메신저 종류·아이디</strong>는 필수입니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">사업체명 *</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                placeholder="사업체명을 입력하세요"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">사업자 등록번호 *</label>
              <input
                type="text"
                value={form.businessNumber}
                onChange={(e) => handleChange('businessNumber', e.target.value)}
                placeholder="000-00-00000"
                className="input"
                required
              />
              <p className="text-[11px] text-zinc-400 mt-1">숫자만 입력 · 10자리 (하이픈 자동)</p>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">대표자명 *</label>
              <input
                type="text"
                value={form.representative}
                onChange={(e) => handleChange('representative', e.target.value)}
                placeholder="대표자 이름을 입력하세요"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">연락처 *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                className="input"
                required
              />
              <p className="text-[11px] text-zinc-400 mt-1">숫자만 입력 · 하이픈 자동</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-zinc-600 mb-1">메신저 종류 *</label>
                <select
                  value={form.messenger}
                  onChange={(e) => handleChange('messenger', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="kakaotalk">카카오톡</option>
                  <option value="line">라인 (LINE)</option>
                  <option value="telegram">텔레그램</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-zinc-600 mb-1">메신저 아이디 *</label>
                <input
                  type="text"
                  value={form.messengerId}
                  onChange={(e) => handleChange('messengerId', e.target.value)}
                  placeholder="메신저 아이디"
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">로그인 비밀번호 *</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">비밀번호 확인 *</label>
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="input"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full h-10">
              제휴 신청하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
