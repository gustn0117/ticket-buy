'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, User, Menu, X, Clock, Eye, ShieldAlert, Megaphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MegaMenuBar, { type MegaMenuColumn } from './MegaMenuBar';

const HOT_BADGE = <span className="text-[10px] text-white bg-accent px-1 rounded-sm">HOT</span>;
const NEW_BADGE = <span className="text-[10px] text-white bg-green-600 px-1 rounded-sm">N</span>;

const NAV_COLUMNS: MegaMenuColumn[] = [
  {
    title: '상품권 팝니다',
    href: '/board?tab=sell',
    badge: HOT_BADGE,
    items: [
      { label: '판매글 작성', href: '/board/write?type=sell', highlight: true },
      { label: '전체 판매글', href: '/board?tab=sell' },
      { label: '실시간 판매문의', href: '/board?tab=sell' },
    ],
  },
  {
    title: '상품권 삽니다',
    href: '/board?tab=buy',
    badge: HOT_BADGE,
    items: [
      { label: '구매글 작성', href: '/board/write?type=buy', highlight: true },
      { label: '전체 구매글', href: '/board?tab=buy' },
    ],
  },
  {
    title: '지역별 업체찾기',
    href: '/category/area',
    items: [
      { label: '서울', href: '/category/area?region=서울' },
      { label: '경기', href: '/category/area?region=경기' },
      { label: '인천', href: '/category/area?region=인천' },
      { label: '부산', href: '/category/area?region=부산' },
      { label: '대구', href: '/category/area?region=대구' },
      { label: '더보기 +', href: '/category/area', highlight: true },
    ],
  },
  {
    title: '상품별 업체찾기',
    href: '/category/product',
    items: [
      { label: '신세계', href: '/category/product?type=신세계' },
      { label: '롯데', href: '/category/product?type=롯데' },
      { label: '문화상품권', href: '/category/product?type=문화상품권' },
      { label: '컬쳐랜드', href: '/category/product?type=컬쳐랜드' },
      { label: '스타벅스', href: '/category/product?type=스타벅스' },
      { label: '더보기 +', href: '/category/product', highlight: true },
    ],
  },
  {
    title: '매입업체',
    href: '/recommended',
    badge: NEW_BADGE,
    items: [
      { label: '추천 매입업체', href: '/recommended' },
      { label: '맞춤 검색', href: '/custom-search' },
      { label: '광고문의', href: '/advertising' },
    ],
  },
  {
    title: '커뮤니티',
    href: '/community',
    items: [
      { label: '업계뉴스', href: '/community?cat=news' },
      { label: '거래TIP (안전거래)', href: '/community?cat=tip' },
      { label: '질문과 답변', href: '/community?cat=qna' },
      { label: '통합검색', href: '/search' },
    ],
  },
  {
    title: '고객센터',
    href: '/faq',
    items: [
      { label: '공지사항', href: '/notice' },
      { label: '1:1 문의', href: '/contact', highlight: true },
      { label: '자주묻는질문', href: '/faq' },
      { label: '이용안내', href: '/guide' },
      { label: '사기방지 가이드', href: '/fraud' },
    ],
  },
];

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setMobileMenuOpen(false);
  };

  const handleBuyerSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}&tab=buyer`);
  };
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
                <Link href="/register" className="hover:text-gray-900">회원가입</Link>
                <span className="text-gray-300">|</span>
                <Link href="/login" className="hover:text-gray-900">로그인</Link>
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
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 flex-1 max-w-[500px] mx-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="통합검색 (상품권, 업체, 커뮤니티)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  maxLength={80}
                  className="w-full h-[38px] pl-3 pr-10 border border-gray-300 text-[13px] focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full w-[38px] flex items-center justify-center bg-accent text-white hover:opacity-90 transition-colors"
                  aria-label="검색"
                >
                  <Search size={16} />
                </button>
              </div>
              <button
                type="button"
                onClick={handleBuyerSearchSubmit}
                disabled={!searchQuery.trim()}
                className="h-[38px] px-3 border border-gray-300 text-[12px] text-gray-600 hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                업체명 검색
              </button>
            </form>

            {/* Icon nav - Desktop */}
            <div className="hidden md:flex items-center gap-5">
              {isLoggedIn ? (
                <button onClick={logout} className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-[10px]">로그아웃</span>
                </button>
              ) : (
                <Link href="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-[10px]">로그인</span>
                </Link>
              )}
              {isLoggedIn && (
                <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                  <Eye size={22} strokeWidth={1.5} />
                  <span className="text-[10px]">내 대시보드</span>
                </Link>
              )}
              <Link href="/advertising" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
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
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="상품권, 업체, 커뮤니티 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                maxLength={80}
                className="w-full h-[38px] pl-3 pr-10 border border-gray-300 text-[13px] focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full w-[38px] flex items-center justify-center bg-accent text-white"
                aria-label="검색"
              >
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sub Navigation - 단일 메가메뉴 바 (어떤 항목 hover해도 모든 컬럼 한 번에 펼쳐짐) */}
      <div className="hidden md:block bg-white border-b border-gray-300">
        <div className="container-main">
          <MegaMenuBar
            columns={NAV_COLUMNS}
            rightExtra={
              <>
                <Link href="/custom-search" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                  <Search size={12} /> 상세검색
                </Link>
                <Link href="/fraud" className="flex items-center gap-1 px-3 py-3 text-[12px] text-gray-600 hover:text-accent transition-colors">
                  <ShieldAlert size={12} /> 사기방지
                </Link>
              </>
            }
          />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-2">
            <Link href="/board?tab=sell" className="block py-2.5 text-[13px] text-gray-700 font-bold border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              상품권 팝니다
            </Link>
            <Link href="/board?tab=buy" className="block py-2.5 text-[13px] text-gray-700 font-bold border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              상품권 삽니다
            </Link>
            <Link href="/recommended" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              매입업체
            </Link>
            <Link href="/community" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              커뮤니티
            </Link>
            <Link href="/custom-search" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              상세검색
            </Link>
            <Link href="/guide" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              이용안내
            </Link>
            <Link href="/faq" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              고객센터
            </Link>
            <Link href="/fraud" className="block py-2.5 text-[13px] text-gray-700 font-medium border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              사기방지 가이드
            </Link>
            <div className="border-t border-gray-200 mt-1 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="block py-2.5 text-[13px] font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>내 대시보드</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-[13px] text-red-500 py-2.5">로그아웃</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2.5 text-[13px] text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
                  <Link href="/register" className="block py-2.5 text-[13px] font-bold text-accent" onClick={() => setMobileMenuOpen(false)}>개인 회원가입</Link>
                  <Link href="/register-business" className="block py-2.5 text-[13px] text-gray-700" onClick={() => setMobileMenuOpen(false)}>업체 회원가입 (매입 업체)</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
