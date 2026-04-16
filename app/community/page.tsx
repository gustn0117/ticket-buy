'use client';

import Link from 'next/link';
import { Plus, ChevronRight } from 'lucide-react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const newsItems = [
  { title: '상품권 시장 동향 분석 리포트', date: '2026.04.06', isNew: true },
  { title: '온라인 상품권 거래 플랫폼 비교', date: '2026.04.01', isNew: true },
  { title: '상품권 매입 업체 등록 절차 안내', date: '2026.03.24', isNew: false },
  { title: '상품권 사기 피해 예방법 총정리', date: '2026.03.16', isNew: false },
  { title: '모바일 상품권 시세 변동 추이', date: '2026.03.10', isNew: false },
];

const qnaItems = [
  { title: '문의드립니다.', date: '2026.04.16', isNew: true },
  { title: '문의드립니다.', date: '2026.04.15', isNew: true },
  { title: '문의드립니다.', date: '2026.04.15', isNew: true },
  { title: '문의드립니다.', date: '2026.04.15', isNew: true },
  { title: '문의드립니다.', date: '2026.04.15', isNew: true },
];

const tipItems = [
  { title: '안전거래를 위한 필수 체크리스트', isNew: true },
  { title: '상품권 시세 확인하는 방법', isNew: true },
  { title: '사기 업체 구별하는 방법', isNew: false },
  { title: '상품권 거래 시 주의사항 안내', isNew: false },
  { title: '계약서 작성 방법 안내', isNew: true },
];

const industryNews = [
  { title: '"신고하니 추심 바로 중단"...불법 추심 대응', date: '2026.04.01', isNew: false },
  { title: '카드론 의존도 커진 자신용자...', date: '2026.03.24', isNew: false },
  { title: '업권도 "새출발기금" 참여...원리금 감면', date: '2026.03.10', isNew: false },
  { title: '신규대출 작년 4분기 8천억...3년...', date: '2026.03.03', isNew: false },
  { title: '"불법사채와 다르다"...이름 바꾸기...', date: '2026.02.19', isNew: false },
];

export default function CommunityPage() {
  return (
    <div className="container-main py-4">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">커뮤니티</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; 커뮤니티
        </div>
      </div>

      <div className="flex gap-3">
        <LeftSidebar />

        <div className="flex-1 min-w-0">
          {/* Community header with left nav */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Left nav panel */}
            <div className="w-full md:w-[200px] shrink-0">
              <div className="bg-gray-700 text-white p-4">
                <p className="text-[11px] text-gray-300">상품권업체가 모두 한 곳에, 티켓바이!</p>
                <h3 className="text-[18px] font-bold mt-1">커뮤니티</h3>
              </div>
              <div className="bg-white border border-gray-200 border-t-0">
                <Link href="/community" className="block px-4 py-2.5 text-[13px] text-accent font-bold border-b border-gray-100 bg-accent/5">업계뉴스</Link>
                <Link href="/faq" className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-accent border-b border-gray-100">질문과 답변</Link>
                <Link href="/guide" className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-accent border-b border-gray-100">거래TIP</Link>
                <Link href="/notice" className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-accent">업계뉴스</Link>
                <div className="border-t border-gray-200 p-3">
                  <Link href="/category/area" className="flex items-center gap-2 py-2 text-[12px] text-gray-600 hover:text-accent">
                    <MapPinIcon /> 지역별 업체찾기 <ChevronRight size={12} className="ml-auto text-gray-400" />
                  </Link>
                  <Link href="/category/product" className="flex items-center gap-2 py-2 text-[12px] text-gray-600 hover:text-accent">
                    <BoxIcon /> 상품별 업체찾기 <ChevronRight size={12} className="ml-auto text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1">
              <h2 className="text-[18px] font-bold text-gray-800 mb-4">커뮤니티</h2>

              {/* 2x2 grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 업계뉴스 */}
                <div className="bg-white border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h3 className="text-[14px] font-bold">업계뉴스</h3>
                    <Link href="/community" className="w-5 h-5 flex items-center justify-center border border-gray-300 text-gray-400 hover:text-accent">
                      <Plus size={12} />
                    </Link>
                  </div>
                  <div className="p-3">
                    {newsItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 text-[12px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-gray-400">·</span>
                          <span className="truncate text-gray-600">{item.title}</span>
                          {item.isNew && <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>}
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 질문과답변 */}
                <div className="bg-white border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h3 className="text-[14px] font-bold">질문과답변</h3>
                    <Link href="/faq" className="w-5 h-5 flex items-center justify-center border border-gray-300 text-gray-400 hover:text-accent">
                      <Plus size={12} />
                    </Link>
                  </div>
                  <div className="p-3">
                    {qnaItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 text-[12px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-gray-400">·</span>
                          <span className="truncate text-gray-600">{item.title}</span>
                          {item.isNew && <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>}
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 거래TIP */}
                <div className="bg-white border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h3 className="text-[14px] font-bold">거래TIP</h3>
                    <Link href="/guide" className="w-5 h-5 flex items-center justify-center border border-gray-300 text-gray-400 hover:text-accent">
                      <Plus size={12} />
                    </Link>
                  </div>
                  <div className="p-3">
                    {tipItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 py-1.5 text-[12px]">
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-600">{item.title}</span>
                        {item.isNew && <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 업계뉴스 */}
                <div className="bg-white border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h3 className="text-[14px] font-bold">업계뉴스</h3>
                    <Link href="/community" className="w-5 h-5 flex items-center justify-center border border-gray-300 text-gray-400 hover:text-accent">
                      <Plus size={12} />
                    </Link>
                  </div>
                  <div className="p-3">
                    {industryNews.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 text-[12px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-gray-400">·</span>
                          <span className="truncate text-gray-600">{item.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    </svg>
  );
}
