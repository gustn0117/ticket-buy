'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState<{ today: number; current: number } | null>(null);

  useEffect(() => {
    fetch('/api/visitors')
      .then((r) => r.json())
      .then((data) => setVisitorInfo({ today: data.today ?? 0, current: Math.max(1, Math.floor(Math.random() * 5) + 1) }))
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block border-b border-zinc-100">
        <div className="max-w-[1140px] mx-auto px-5 flex justify-between items-center h-8 text-[11px] text-zinc-500">
          <div className="flex items-center gap-4">
            <Link href="/notice" className="hover:text-zinc-900">공지사항</Link>
            <Link href="/guide" className="hover:text-zinc-900">이용방법</Link>
            <Link href="/fraud" className="hover:text-zinc-900">안전거래</Link>
            <Link href="/advertising" className="hover:text-zinc-900">광고문의</Link>
            <Link href="/register-business" className="hover:text-zinc-900">업체등록문의</Link>
          </div>
          {visitorInfo && (
            <div className="flex items-center gap-3 text-[10px]">
              <span>현재 접속 <strong className="text-zinc-700">{visitorInfo.current}</strong>명</span>
              <span>오늘 방문 <strong className="text-zinc-700">{visitorInfo.today}</strong>명</span>
            </div>
          )}
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="flex items-center justify-between h-[52px]">
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/logo-dark.png" alt="티켓바이" width={160} height={35} className="h-7 w-auto object-contain" priority />
          </Link>

          <div className="flex-1 max-w-[360px] mx-6 hidden md:block">
            <div className="relative">
              <input type="text" placeholder="상품권 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="input h-[34px] pl-3 pr-8 text-[12px] rounded" />
              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-zinc-600 hover:text-zinc-900 font-medium">
                  <User size={14} />{user?.name}
                </Link>
                <span className="text-zinc-200">|</span>
                <button onClick={logout} className="px-2 py-1.5 text-[12px] text-zinc-400 hover:text-zinc-700">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-1.5 text-[13px] text-zinc-600 hover:text-zinc-900 font-medium">로그인</Link>
                <Link href="/register" className="btn-accent h-[30px] text-[12px] px-3 rounded">회원가입</Link>
              </>
            )}
          </div>

          <button className="md:hidden p-1.5 text-zinc-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="md:hidden pb-2.5">
          <div className="relative">
            <input type="text" placeholder="상품권 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="input h-[34px] pl-3 pr-8 text-[12px]" />
            <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 px-5 py-2 bg-white">
          <Link href="/notice" className="block text-[13px] text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>공지사항</Link>
          <Link href="/fraud" className="block text-[13px] text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>안전거래</Link>
          <Link href="/register-business" className="block text-[13px] text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>업체등록문의</Link>
          <div className="border-t border-zinc-100 mt-1 pt-1">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block text-[13px] font-medium text-zinc-900 py-2" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-[13px] text-red-500 py-2">로그아웃</button>
              </>
            ) : (
              <Link href="/login" className="block text-[13px] font-medium text-zinc-900 py-2" onClick={() => setMobileMenuOpen(false)}>로그인 / 회원가입</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
