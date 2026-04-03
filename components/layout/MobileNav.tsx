'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Tag, MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/board?tab=buy', label: '삽니다', icon: ShoppingCart },
  { href: '/board?tab=sell', label: '팝니다', icon: Tag },
  { href: '/chat', label: '채팅', icon: MessageCircle },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 z-50">
      <div className="flex justify-around items-center h-[52px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split('?')[0];
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${isActive ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              {item.label}
            </Link>
          );
        })}
        <Link href={isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/login' || pathname?.startsWith('/dashboard') ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <User size={18} strokeWidth={pathname === '/login' || pathname?.startsWith('/dashboard') ? 2 : 1.5} />
          {isLoggedIn ? '내정보' : '로그인'}
        </Link>
      </div>
    </nav>
  );
}
