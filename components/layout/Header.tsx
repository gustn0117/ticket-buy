'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, User, Menu, X, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow">
              T
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold tracking-tight text-gray-900">티켓바이</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="상품권 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white text-sm transition-all"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/fraud" className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
              <Shield size={14} />
              안전거래
            </Link>
            <Link href="/notice" className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">공지</Link>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            {isLoggedIn ? (
              <div className="flex items-center gap-2 ml-1">
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 font-medium text-sm rounded-lg hover:bg-emerald-100 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center">
                    <User size={13} className="text-emerald-700" />
                  </div>
                  {user?.businessName || user?.name}
                </Link>
                <button onClick={logout} className="px-2 py-2 text-gray-400 hover:text-red-500 text-xs transition-colors">로그아웃</button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-1 px-5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 font-medium"
              >
                로그인
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="상품권 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2 animate-fade-in">
          <Link href="/fraud" className="flex items-center gap-2 text-sm text-gray-600 py-3 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
            <Shield size={16} /> 안전거래 가이드
          </Link>
          <Link href="/notice" className="block text-sm text-gray-600 py-3 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>공지사항</Link>
          <Link href="/register-business" className="block text-sm text-gray-600 py-3 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>업체등록문의</Link>
          <div className="border-t border-gray-100 mt-1 pt-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block text-sm text-primary font-medium py-3" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-red-500 py-3">로그아웃</button>
              </>
            ) : (
              <Link href="/login" className="block text-sm text-primary font-medium py-3" onClick={() => setMobileMenuOpen(false)}>로그인 / 회원가입</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
