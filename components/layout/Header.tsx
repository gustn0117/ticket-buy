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
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">티켓바이</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="통합 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
            <Link href="/notice" className="hover:text-primary">광고문의</Link>
            <span className="text-gray-300">|</span>
            <Link href="/register-business" className="hover:text-primary">업체등록문의</Link>
            <span className="text-gray-300">|</span>
            <Link href="/notice" className="hover:text-primary">공지사항</Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-4">
                <Link href="/dashboard" className="flex items-center gap-1 text-primary font-medium">
                  <User size={16} />
                  {user?.businessName || user?.name}
                </Link>
                <button onClick={logout} className="text-gray-500 hover:text-danger text-xs">로그아웃</button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 ml-4 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                <User size={16} />
                로그인
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="통합 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <Link href="/notice" className="block text-sm text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>광고문의</Link>
          <Link href="/register-business" className="block text-sm text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>업체등록문의</Link>
          <Link href="/notice" className="block text-sm text-gray-600 py-2" onClick={() => setMobileMenuOpen(false)}>공지사항</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block text-sm text-primary font-medium py-2" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-danger">로그아웃</button>
            </>
          ) : (
            <Link href="/login" className="block text-sm text-primary font-medium py-2" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
          )}
        </div>
      )}
    </header>
  );
}
