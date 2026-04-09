'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'normal' | 'business'>('normal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, loginType }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || '로그인에 실패했습니다.');
        setSubmitting(false);
        return;
      }
      login(data.user);
      router.push('/');
    } catch {
      setError('로그인에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-6">
          <div className="px-3 h-10 bg-zinc-900 rounded-md inline-flex items-center justify-center text-white font-black text-[10px] tracking-[0.15em] mb-3">LOGO</div>
          <h1 className="text-[15px] font-semibold text-zinc-900">로그인</h1>
        </div>

        <div className="card p-5">
          <div className="flex border-b border-zinc-200 mb-5">
            <button
              onClick={() => { setLoginType('normal'); setError(null); }}
              className={`tab-underline flex-1 ${loginType === 'normal' ? 'active' : ''}`}
            >
              일반 회원
            </button>
            <button
              onClick={() => { setLoginType('business'); setError(null); }}
              className={`tab-underline flex-1 ${loginType === 'business' ? 'active' : ''}`}
            >
              업체 로그인
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">
                {loginType === 'business' ? '사업자번호 또는 이메일' : '이메일'}
              </label>
              <input
                type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={loginType === 'business' ? '사업자번호 또는 이메일' : '이메일을 입력하세요'}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">비밀번호</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="input"
              />
            </div>

            {error && (
              <p className="text-[12px] text-red-500">{error}</p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full h-10">
              {submitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 text-[11px] text-zinc-400">
            <Link href="/register" className="hover:text-zinc-700 transition-colors">회원가입</Link>
            <button className="hover:text-zinc-700 transition-colors">비밀번호 찾기</button>
          </div>

          {loginType === 'business' && (
            <div className="mt-5 card bg-zinc-50 p-3 text-[12px] text-zinc-600">
              업체 로그인은 승인된 사업자만 이용 가능합니다.
              <Link href="/register-business" className="block mt-1 font-medium text-zinc-900 underline underline-offset-2">업체 제휴 문의하기</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
