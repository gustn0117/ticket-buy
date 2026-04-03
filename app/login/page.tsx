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
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="px-3 h-10 bg-gray-900 rounded-md inline-flex items-center justify-center text-white font-black text-[10px] tracking-[0.15em] mb-4">LOGO</div>
          <h1 className="text-xl font-bold text-gray-900">로그인</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex border-b border-gray-200 mb-5">
            <button
              onClick={() => setLoginType('normal')}
              className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${
                loginType === 'normal' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
              }`}
            >
              일반 회원
            </button>
            <button
              onClick={() => setLoginType('business')}
              className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${
                loginType === 'business' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
              }`}
            >
              업체 로그인
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {loginType === 'business' ? '사업자번호 또는 이메일' : '이메일'}
              </label>
              <input
                type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={loginType === 'business' ? '사업자번호 또는 이메일' : '이메일을 입력하세요'}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">비밀번호</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>

            <button type="submit" className="w-full h-10 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              로그인
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
            <Link href="/register" className="hover:text-gray-700 transition-colors">회원가입</Link>
            <button className="hover:text-gray-700 transition-colors">비밀번호 찾기</button>
          </div>

          {loginType === 'business' && (
            <div className="mt-5 p-3 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600">
              업체 로그인은 승인된 사업자만 이용 가능합니다.
              <Link href="/register-business" className="block mt-1 font-medium text-gray-900 underline underline-offset-2">업체 제휴 문의하기</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
