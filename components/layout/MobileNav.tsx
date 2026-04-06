'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Tag, MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat-widget'));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 z-50">
      <div className="flex justify-around items-center h-[52px]">
        <Link href="/board?tab=buy"
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/board' ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <ShoppingCart size={18} strokeWidth={pathname === '/board' ? 2 : 1.5} />
          삽니다
        </Link>
        <Link href="/board?tab=sell"
          className="flex flex-col items-center gap-0.5 text-[10px] text-zinc-400">
          <Tag size={18} strokeWidth={1.5} />
          팝니다
        </Link>
        <button onClick={openChat}
          className="flex flex-col items-center gap-0.5 text-[10px] text-zinc-400">
          <MessageCircle size={18} strokeWidth={1.5} />
          채팅
        </button>
        <Link href={isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${pathname === '/login' || pathname?.startsWith('/dashboard') ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
          <User size={18} strokeWidth={pathname === '/login' || pathname?.startsWith('/dashboard') ? 2 : 1.5} />
          {isLoggedIn ? '내정보' : '로그인'}
        </Link>
      </div>
    </nav>
  );
}
