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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-gray-200/50 z-50 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split('?')[0];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-xl transition-all ${
                isActive ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-emerald-50' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.7} />
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
        <Link
          href={isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center justify-center gap-1 w-16 py-1 rounded-xl transition-all ${
            pathname === '/login' || pathname?.startsWith('/dashboard') ? 'text-emerald-600' : 'text-gray-400'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${pathname === '/login' || pathname?.startsWith('/dashboard') ? 'bg-emerald-50' : ''}`}>
            <User size={20} strokeWidth={pathname === '/login' || pathname?.startsWith('/dashboard') ? 2.3 : 1.7} />
          </div>
          <span className="text-[10px] font-semibold">{isLoggedIn ? '내정보' : '로그인'}</span>
        </Link>
      </div>
    </nav>
  );
}
