'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Search, User, Menu, X, Phone, Clock, ChevronDown, Eye, ShieldAlert, Megaphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState<{ today: number; current: number; total: number } | null>(null);

  useEffect(() => {
    fetch('/api/visitors')
      .then((r) => r.json())
      .then((data) => setVisitorInfo({
        today: data.today ?? 0,
        current: Math.max(1, Math.floor(Math.random() * 30) + 5),
        total: data.total ?? 40571676
      }))
      .catch(() => setVisitorInfo({ today: 473, current: 12, total: 40571676 }));
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top utility bar - Desktop only */}
      <div className="hidden md:block border-b border-gray-200 bg-white">
        <div className="container-main flex justify-between items-center h-8">
          <div className="text-[11px] text-gray-500">
            티켓바이 - 상품권 매입/매도 중개 플랫폼
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-500">
            <Link href="/guide" className="hover:text-gray-900">이용안내</Link>
            <span className="text-gray-300">|</span>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hover:text-gray-900">{user?.name}</Link>
                <span className="text-gray-300">|</span>
                <button onClick={logout} className="hover:text-gray-900">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/register-business" className="hover:text-gray-900">회원가입</Link>
                <span className="text-gray-300">|</span>
                <Link href="/login" className="hover:text-gray-900">업체 로그인</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-main">
          <div className="flex items-center justify-between h-[70px] md:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/logo-dark.png" alt="티켓바이" width={180} height={40} className="h-8 md:h-10 w-auto object-contain" priority />
            </Link>

            {/* Search bars - Desktop */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-[500px] mx-6">
              <div className="relative flex-1">
                <input type="text" placeholder="통합검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[38px] pl-3 pr-9 border border-gray-300 text-[13px] focus:border-accent focus:outline-none" />
                <button className="absolute right-0 top-0 h-full w-[38px] flex items-center justify-center bg-accent text-white hover:opacity-90 transition-colors">
                  <Search size={16} />
                </button>
              </div>
              <div className="relative w-[180px]">
                <select className="w-full h-[38px] pl-3 pr-8 border border-gray-300 text-[13px] text-gray-500 focus:border-accent focus:outline-none appearance-none bg-white">
                  <option>업체명 검색</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Icon nav - Desktop */}
            <div className="hidden md:flex items-center gap-5">
              <Link href="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                <User size={22} strokeWidth={1.5} />
                <span className="text-[10px]">업체로그인</span>
              </Link>
              <Link href="/register-business" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                <Megaphone size={22} strokeWidth={1.5} />
                <span className="text-[10px]">광고문의</span>
              </Link>
              <Link href="/board" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                <Clock size={22} strokeWidth={1.5} />
                <span className="text-[10px]">최근 본 업체</span>
              </Link>
              <Link href="/fraud" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                <ShieldAlert size={22} strokeWidth={1.5} />
                <span className="text-[10px]">주의사항</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-1.5 text-gray-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <input type="text" placeholder="상품권 업체 검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[38px] pl-3 pr-10 border border-gray-300 text-[13px] focus:border-accent focus:outline-none" />
              <button className="absolute right-0 top-0 h-full w-[38px] flex items-center justify-center bg-accent text-white">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="hidden md:block bg-white border-b border-gray-300">
        <div className="container-main">
          <div className="flex items-center justify-between">
            {/* Primary nav */}
            <div className="flex items-center">
              <Link href="/category/area" className="flex items-center gap-1 px-4 py-3 text-[13px] font-bold text-gray-800 hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent">
                지역별 업체찾기 <span className="text-[10px] text-white bg-accent px-1 rounded-sm">N</span>
              </Link>
              <Link href="/category/product" className="flex items-center gap-1 px-4 py-3 text-[13px] font-bold text-gray-800 hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent">
                상품별 업체찾기 <span className="text-[10px] text-white bg-accent px-1 rounded-sm">N</span>
              </Link>
              <Link href="/board" className="flex items-center gap-1 px-4 py-3 text-[13px] font-bold text-gray-800 hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent">
                오늘의 추천업체 <span className="text-[10px] text-white bg-accent px-1 rounded-sm">N</span>
              </Link>
              <Link href="/board?tab=buy" className="flex items-center gap-1 px-4 py-3 text-[13px] font-bold text-gray-800 hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent">
                맞춤검색 <span className="text-[10px] text-white bg-green-600 px-1 rounded-sm">N</span>
              </Link>
            </div>
            {/* Secondary nav */}
            <div className="flex items-center gap-1">
              <Link href="/fraud" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                <Search size={12} /> 사기번호검색
              </Link>
              <Link href="/board" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                <ShieldAlert size={12} /> 정식업체조회
              </Link>
              <Link href="/community" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                커뮤니티
              </Link>
              <Link href="/guide" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                이용안내
              </Link>
              <Link href="/faq" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                고객센터
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-2">
            <Link href="/category/area" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              지역별 업체찾기
            </Link>
            <Link href="/category/product" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              상품별 업체찾기
            </Link>
            <Link href="/board" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              오늘의 추천업체
            </Link>
            <Link href="/community" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              커뮤니티
            </Link>
            <Link href="/guide" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              이용안내
            </Link>
            <Link href="/faq" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              고객센터
            </Link>
            <Link href="/fraud" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              사기번호검색
            </Link>
            <div className="border-t border-gray-200 mt-1 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="block py-2.5 text-[13px] font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-[13px] text-red-500 py-2.5">로그아웃</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2.5 text-[13px] text-gray-700" onClick={() => setMobileMenuOpen(false)}>업체 로그인</Link>
                  <Link href="/register-business" className="block py-2.5 text-[13px] font-bold text-accent" onClick={() => setMobileMenuOpen(false)}>업체 회원가입</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
