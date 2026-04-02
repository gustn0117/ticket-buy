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
      login({
        id: 'biz1',
        name: '홍길동',
        type: 'business',
        businessName: '티켓마스터',
      });
    } else {
      login({
        id: 'user1',
        name: email || '테스트유저',
        type: 'normal',
      });
    }
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
            T
          </div>
          <h1 className="text-2xl font-bold">티켓바이 로그인</h1>
        </div>

        {/* Login Type Tabs */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-6">
          <button
            onClick={() => setLoginType('normal')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              loginType === 'normal' ? 'bg-primary text-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            일반 회원
          </button>
          <button
            onClick={() => setLoginType('business')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              loginType === 'business' ? 'bg-primary text-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            업체 로그인
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {loginType === 'business' ? '사업자번호 또는 이메일' : '이메일'}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={loginType === 'business' ? '사업자번호 또는 이메일을 입력하세요' : '이메일을 입력하세요'}
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            로그인
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <Link href="/register" className="hover:text-primary">회원가입</Link>
          <button className="hover:text-primary">비밀번호 찾기</button>
        </div>

        {loginType === 'business' && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            업체 로그인은 승인된 사업자만 이용 가능합니다.
            <Link href="/register-business" className="block mt-1 font-medium underline">업체 제휴 문의하기</Link>
          </div>
        )}
      </div>
    </div>
  );
}
