'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, HelpCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 z-50">
      <div className="flex justify-around items-center h-[52px]">
        <Link href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/' ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <Home size={18} strokeWidth={pathname === '/' ? 2 : 1.5} />
          홈
        </Link>
        <Link href="/board?tab=sell"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname?.startsWith('/board') ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <Tag size={18} strokeWidth={pathname?.startsWith('/board') ? 2 : 1.5} />
          상품권 팝니다
        </Link>
        <Link href="/guide"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/guide' ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <HelpCircle size={18} strokeWidth={pathname === '/guide' ? 2 : 1.5} />
          이용안내
        </Link>
        <Link href={isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/login' || pathname?.startsWith('/dashboard') ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <User size={18} strokeWidth={pathname === '/login' || pathname?.startsWith('/dashboard') ? 2 : 1.5} />
          {isLoggedIn ? '내정보' : '업체 로그인'}
        </Link>
      </div>
    </nav>
  );
}
