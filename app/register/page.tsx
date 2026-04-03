'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const handleChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!');
    router.push('/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="px-4 h-14 bg-gray-900 rounded-2xl inline-flex items-center justify-center text-white font-black text-sm tracking-widest mx-auto mb-4 shadow-lg shadow-black/10">
            LOGO
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">회원가입</h1>
          <p className="text-sm text-gray-500 mt-1">안전한 상품권 거래 플랫폼</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/[0.04] p-7 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">이름 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호 *</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호 확인 *</label>
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5">숫자만 입력 · 하이픈 자동</p>
            </div>

            {/* Agreements */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
              <label className="flex items-center gap-3 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className="w-4.5 h-4.5 rounded-md border-gray-300 text-gray-800 focus:ring-emerald-500/30"
                  required
                />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">[필수] 이용약관에 동의합니다</span>
              </label>
              <label className="flex items-center gap-3 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.agreePrivacy}
                  onChange={(e) => handleChange('agreePrivacy', e.target.checked)}
                  className="w-4.5 h-4.5 rounded-md border-gray-300 text-gray-800 focus:ring-emerald-500/30"
                  required
                />
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">[필수] 개인정보처리방침에 동의합니다</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gray-900 text-white rounded-xl font-semibold  transition-all shadow-lg shadow-black/10 hover:shadow-black/15 text-sm mt-2"
            >
              가입하기
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            이미 계정이 있으신가요? <Link href="/login" className="text-gray-900 font-semibold hover:text-gray-900 transition-colors">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
