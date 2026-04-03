'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-gray-100 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-end gap-5 h-9 text-xs text-gray-500">
          <Link href="/notice" className="hover:text-gray-900 transition-colors">공지사항</Link>
          <Link href="/fraud" className="hover:text-gray-900 transition-colors">안전거래 가이드</Link>
          <Link href="/register-business" className="hover:text-gray-900 transition-colors">업체등록문의</Link>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="px-3 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white font-black text-[10px] tracking-[0.15em]">LOGO</div>
            <span className="text-base font-bold text-gray-900 tracking-tight hidden sm:block">티켓바이</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="상품권 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-4 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                <Search size={15} />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  <User size={15} />
                  {user?.businessName || user?.name}
                </Link>
                <button onClick={logout} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-1.5 text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">로그인</Link>
                <Link href="/register" className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors">회원가입</Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input type="text" placeholder="상품권 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-4 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none" />
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-6 py-3 bg-white space-y-1">
          <Link href="/notice" className="block text-sm text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>공지사항</Link>
          <Link href="/fraud" className="block text-sm text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>안전거래 가이드</Link>
          <Link href="/register-business" className="block text-sm text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>업체등록문의</Link>
          <div className="border-t border-gray-100 mt-2 pt-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block text-sm font-medium text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-red-500 py-2">로그아웃</button>
              </>
            ) : (
              <Link href="/login" className="block text-sm font-medium text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>로그인 / 회원가입</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
