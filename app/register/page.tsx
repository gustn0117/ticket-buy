'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/register-business');
  }, [router]);

  return (
    <div className="max-w-[640px] mx-auto px-5 py-20 text-center text-zinc-400 text-[13px]">
      업체 회원가입 페이지로 이동 중...
    </div>
  );
}
