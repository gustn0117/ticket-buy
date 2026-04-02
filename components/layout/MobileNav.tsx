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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split('?')[0];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 text-xs ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <Link
          href={isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center gap-0.5 text-xs ${
            pathname === '/login' || pathname === '/dashboard' ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <User size={20} />
          <span>{isLoggedIn ? '내정보' : '로그인'}</span>
        </Link>
      </div>
    </nav>
  );
}
