'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
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
        body: JSON.stringify({ email, password, loginType: 'business' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || '로그인에 실패했습니다.');
        setSubmitting(false);
        return;
      }
      login(data.user);
      router.push('/dashboard');
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
          <Image src="/logo.png" alt="티켓바이" width={140} height={40} className="h-10 w-auto object-contain mx-auto mb-3" priority />
          <h1 className="text-[15px] font-semibold text-zinc-900">업체 로그인</h1>
          <p className="text-[11px] text-zinc-500 mt-1">매입 업체 전용 로그인입니다.</p>
        </div>

        <div className="card p-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">사업자번호 또는 이메일</label>
              <input
                type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="사업자번호 또는 이메일"
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

            {error && <p className="text-[12px] text-red-500">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full h-10">
              {submitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 text-[11px] text-zinc-400">
            <Link href="/register-business" className="hover:text-zinc-700 transition-colors">업체 등록 신청</Link>
            <button className="hover:text-zinc-700 transition-colors">비밀번호 찾기</button>
          </div>

          <div className="mt-5 card bg-zinc-50 p-3 text-[12px] text-zinc-600">
            <p className="font-medium text-zinc-800 mb-1">매입 업체만 가입하실 수 있습니다.</p>
            <p className="text-[11px] text-zinc-500">일반 소비자는 가입 없이도 모든 업체 정보와 게시글을 확인하실 수 있습니다.</p>
            <Link href="/register-business" className="block mt-2 font-medium text-zinc-900 underline underline-offset-2">업체 등록 신청하기 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
