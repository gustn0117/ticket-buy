'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setSubmitting(true);
    try {
      await createUser({
        email: form.email,
        name: form.name,
        phone: form.phone || null,
        type: 'normal',
        password_hash: form.password,
      });
      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-6">
      <div className="w-full max-w-[640px]">
        <div className="text-center mb-6">
          <div className="px-3 h-10 bg-zinc-900 rounded-md inline-flex items-center justify-center text-white font-black text-[10px] tracking-[0.15em] mb-3">LOGO</div>
          <h1 className="text-[15px] font-semibold text-zinc-900">회원가입</h1>
          <p className="text-[12px] text-zinc-500 mt-1">안전한 상품권 거래 플랫폼</p>
        </div>

        <div className="card p-5 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">이름 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">이메일 *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="이메일을 입력하세요"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">비밀번호 *</label>
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

            {error && (
              <p className="text-[12px] text-red-500">{error}</p>
            )}

            {/* Agreements */}
            <div className="card p-4 space-y-3">
              <label className="flex items-center gap-3 text-[13px] cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-800"
                  required
                />
                <span className="text-zinc-600 group-hover:text-zinc-900 transition-colors">[필수] 이용약관에 동의합니다</span>
              </label>
              <label className="flex items-center gap-3 text-[13px] cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreePrivacy}
                  onChange={(e) => handleChange('agreePrivacy', e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-800"
                  required
                />
                <span className="text-zinc-600 group-hover:text-zinc-900 transition-colors">[필수] 개인정보처리방침에 동의합니다</span>
              </label>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full h-10">
              {submitting ? '가입 처리 중...' : '가입하기'}
            </button>
          </form>

          <p className="text-center text-[12px] text-zinc-400 mt-5">
            이미 계정이 있으신가요? <Link href="/login" className="text-zinc-900 font-medium hover:text-zinc-700 transition-colors">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
