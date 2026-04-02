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
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block tracking-tight">티켓바이</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:bg-white text-sm transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <Link href="/notice" className="hover:text-gray-900 transition-colors">광고문의</Link>
            <Link href="/register-business" className="hover:text-gray-900 transition-colors">업체등록</Link>
            <Link href="/notice" className="hover:text-gray-900 transition-colors">공지사항</Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-2">
                <Link href="/dashboard" className="flex items-center gap-1.5 text-primary font-medium hover:text-primary-dark transition-colors">
                  <User size={15} />
                  {user?.businessName || user?.name}
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-danger text-xs transition-colors">로그아웃</button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 ml-2 px-4 py-1.5 bg-primary text-white text-sm rounded-full hover:bg-primary-dark transition-colors font-medium"
              >
                로그인
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          <Link href="/notice" className="block text-sm text-gray-600 py-2.5 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>광고문의</Link>
          <Link href="/register-business" className="block text-sm text-gray-600 py-2.5 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>업체등록</Link>
          <Link href="/notice" className="block text-sm text-gray-600 py-2.5 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>공지사항</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block text-sm text-primary font-medium py-2.5" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-danger">로그아웃</button>
            </>
          ) : (
            <Link href="/login" className="block text-sm text-primary font-medium py-2.5" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
          )}
        </div>
      )}
    </header>
  );
}
