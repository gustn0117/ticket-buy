'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'normal' | 'business'>('normal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'business') {
      login({ id: 'biz1', name: '홍길동', type: 'business', businessName: '티켓마스터' });
    } else {
      login({ id: 'user1', name: email || '테스트유저', type: 'normal' });
    }
    router.push('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            T
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">티켓바이 로그인</h1>
          <p className="text-sm text-gray-500 mt-1">안전한 상품권 거래 플랫폼</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/[0.04] p-7">
          {/* Login Type Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginType('normal')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                loginType === 'normal' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              일반 회원
            </button>
            <button
              onClick={() => setLoginType('business')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                loginType === 'business' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              업체 로그인
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {loginType === 'business' ? '사업자번호 또는 이메일' : '이메일'}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={loginType === 'business' ? '사업자번호 또는 이메일' : '이메일을 입력하세요'}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-sm"
            >
              로그인
            </button>
          </form>

          <div className="flex items-center justify-between mt-5 text-sm text-gray-400">
            <Link href="/register" className="hover:text-emerald-600 transition-colors">회원가입</Link>
            <button className="hover:text-emerald-600 transition-colors">비밀번호 찾기</button>
          </div>

          {loginType === 'business' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-600 border border-blue-100">
              업체 로그인은 승인된 사업자만 이용 가능합니다.
              <Link href="/register-business" className="block mt-1 font-semibold underline underline-offset-2">업체 제휴 문의하기</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
