'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, Tag, HelpCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50">
      <div className="flex justify-around items-center h-[52px]">
        <Link href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/' ? 'text-accent font-semibold' : 'text-gray-400'}`}>
          <Home size={18} strokeWidth={pathname === '/' ? 2 : 1.5} />
          홈
        </Link>
        <Link href="/category/area"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname?.startsWith('/category/area') ? 'text-accent font-semibold' : 'text-gray-400'}`}>
          <MapPin size={18} strokeWidth={pathname?.startsWith('/category/area') ? 2 : 1.5} />
          지역별
        </Link>
        <Link href="/category/product"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname?.startsWith('/category/product') ? 'text-accent font-semibold' : 'text-gray-400'}`}>
          <Tag size={18} strokeWidth={pathname?.startsWith('/category/product') ? 2 : 1.5} />
          상품별
        </Link>
        <Link href="/community"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/community' ? 'text-accent font-semibold' : 'text-gray-400'}`}>
          <HelpCircle size={18} strokeWidth={pathname === '/community' ? 2 : 1.5} />
          커뮤니티
        </Link>
        <Link href={isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/login' || pathname?.startsWith('/dashboard') ? 'text-accent font-semibold' : 'text-gray-400'}`}>
          <User size={18} strokeWidth={pathname === '/login' || pathname?.startsWith('/dashboard') ? 2 : 1.5} />
          {isLoggedIn ? '내정보' : '로그인'}
        </Link>
      </div>
    </nav>
  );
}
