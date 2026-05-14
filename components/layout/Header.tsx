'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, User, Menu, X, Clock, Eye, ShieldAlert, Megaphone, Home as HomeIcon } from 'lucide-react';
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
      {/* 상단 유틸리티 바 — 요청대로 '티켓바이 - 상품권 매입/매도 중개플랫폼 ~ 회원가입 로그인' 문구 일괄 제거 */}

      {/* Main header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-main">
          {/* 모바일 헤더: [홈/돋보기 | 로고(가운데) | 전체메뉴(햄버거)] */}
          <div className="md:hidden grid grid-cols-3 items-center h-[60px]">
            <div className="flex items-center gap-1">
              <Link href="/" aria-label="홈" className="w-9 h-9 flex items-center justify-center border border-gray-300 text-gray-600 hover:text-accent hover:border-accent">
                <HomeIcon size={16} />
              </Link>
              <Link href="/search" aria-label="검색" className="w-9 h-9 flex items-center justify-center border border-gray-300 text-gray-600 hover:text-accent hover:border-accent">
                <Search size={16} />
              </Link>
            </div>
            <Link href="/" className="flex items-center justify-center">
              <Image src="/logo-dark.png" alt="티켓바이" width={140} height={32} className="h-7 w-auto object-contain" priority />
            </Link>
            <button
              type="button"
              aria-label="전체메뉴"
              onClick={() => setMobileMenuOpen(true)}
              className="ml-auto flex items-center gap-1 px-2.5 h-9 border border-gray-300 text-gray-700 hover:text-accent hover:border-accent text-[12px]"
            >
              <Menu size={14} /> 전체메뉴
            </button>
          </div>

          {/* PC 헤더 */}
          <div className="hidden md:flex items-center justify-between h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/logo-dark.png" alt="티켓바이" width={180} height={40} className="h-10 w-auto object-contain" priority />
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
                  <span className="text-[10px]">업체 로그아웃</span>
                </button>
              ) : (
                <Link href="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-accent transition-colors">
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-[10px]">업체 로그인</span>
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

          </div>
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

      {/* 모바일 우측 슬라이드 드로어 — 이전 페이지는 움직이지 않고 메뉴만 우측에서 슬라이드 */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[70]" onClick={() => setMobileMenuOpen(false)}>
          {/* 어두운 배경 오버레이 */}
          <div className="absolute inset-0 bg-black/40" />

          {/* 우측 슬라이드 패널 */}
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-[78%] max-w-[340px] bg-white shadow-2xl overflow-y-auto"
          >
            {/* 드로어 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-accent text-white">
              <span className="text-[14px] font-bold">티켓바이 전체메뉴</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="닫기"
                className="text-white/90 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* 검색 폼 */}
            <form onSubmit={handleSearchSubmit} className="px-4 py-3 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="상품권, 업체, 커뮤니티 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  maxLength={80}
                  className="w-full h-9 pl-3 pr-9 border border-gray-300 text-[12.5px] focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full w-9 flex items-center justify-center bg-accent text-white"
                  aria-label="검색"
                >
                  <Search size={14} />
                </button>
              </div>
            </form>

            {/* 그룹형 메뉴 (대출나라 스타일) — 공백 최소화 */}
            <nav className="py-0">
              {[
                {
                  group: '최근본업체',
                  items: [
                    { label: '최근본업체', href: '/recommended' },
                    { label: '주의사항', href: '/fraud' },
                  ],
                },
                {
                  group: '매입업체찾기',
                  items: [
                    { label: '지역별 업체찾기', href: '/category/area' },
                    { label: '상품별 업체찾기', href: '/category/product' },
                    { label: '상호명 업체찾기', href: '/search' },
                    { label: '업체 연락처 검색', href: '/custom-search' },
                  ],
                },
                {
                  group: '오늘의 추천업체',
                  items: [{ label: '오늘의 추천업체', href: '/recommended' }],
                },
                {
                  group: '사기번호검색',
                  items: [
                    { label: '사기번호검색', href: '/fraud' },
                    { label: '피해신고하기', href: '/fraud#report' },
                    { label: '불법금융대응', href: '/fraud#response' },
                  ],
                },
                {
                  group: '정식업체조회',
                  items: [
                    { label: '정식업체조회', href: '/guide' },
                    { label: '업체확인방법', href: '/guide#verify' },
                  ],
                },
                {
                  group: '커뮤니티',
                  items: [{ label: '커뮤니티', href: '/community' }],
                },
                {
                  group: '게시판',
                  items: [
                    { label: '상품권 팝니다', href: '/board?tab=sell' },
                    { label: '상품권 삽니다', href: '/board?tab=buy' },
                  ],
                },
                {
                  group: '고객센터',
                  items: [
                    { label: '이용안내', href: '/guide' },
                    { label: '자주묻는질문', href: '/faq' },
                    { label: '광고문의', href: '/advertising' },
                  ],
                },
              ].map((g) => (
                <div key={g.group} className="border-b border-gray-200">
                  <p className="px-4 pt-1.5 pb-0 text-[12px] font-bold text-accent">{g.group}</p>
                  {g.items.map((m) => (
                    <Link
                      key={m.label + m.href}
                      href={m.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-5 py-0.5 text-[12.5px] text-gray-700 hover:bg-gray-50"
                    >
                      · {m.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            {/* 인증 영역 */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              {isLoggedIn ? (
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[13px] font-bold text-gray-900"
                  >
                    내 대시보드
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-[12px] text-red-500"
                  >
                    업체 로그아웃
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-accent h-9 text-[12.5px] inline-flex items-center justify-center"
                  >
                    업체 로그인
                  </Link>
                  <Link
                    href="/register-business"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary h-9 text-[12.5px] inline-flex items-center justify-center"
                  >
                    업체 회원가입
                  </Link>
                </div>
              )}
            </div>

          </aside>
        </div>
      )}
    </header>
  );
}
