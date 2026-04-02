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
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="이메일을 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인 *</label>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="010-0000-0000"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
            <p className="text-xs text-gray-400 mt-1">숫자만 입력 · 하이픈 자동</p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                className="rounded"
                required
              />
              <span>[필수] 이용약관에 동의합니다</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.agreePrivacy}
                onChange={(e) => handleChange('agreePrivacy', e.target.checked)}
                className="rounded"
                required
              />
              <span>[필수] 개인정보처리방침에 동의합니다</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors mt-4"
          >
            가입하기
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          이미 계정이 있으신가요? <Link href="/login" className="text-primary font-medium">로그인</Link>
        </p>
      </div>
    </div>
  );
}
