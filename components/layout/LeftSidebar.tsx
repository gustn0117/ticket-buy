'use client';

import Link from 'next/link';
import { Search, HelpCircle, Shield } from 'lucide-react';
import { useState } from 'react';

export default function LeftSidebar() {
  const [fraudNumber, setFraudNumber] = useState('');

  const recentCompanies = [
    '태산대부중개', '가로대부업', '24시당장대부중개',
    '긴급대부중개', '남산대부', '24시튼튼대부중개',
    '에이스대부중개', '빠른당일대부', '뉴스타트대부중개',
    '24시정안대부'
  ];

  return (
    <aside className="w-[200px] shrink-0 hidden lg:block space-y-2.5">
      {/* 사기번호 검색 */}
      <div className="sidebar-box">
        <div className="flex flex-col items-center py-4 px-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
            <Search size={18} className="text-accent" />
          </div>
          <span className="text-[12px] font-bold text-gray-700">사기번호검색</span>
          <div className="w-full mt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="전화번호 입력"
                value={fraudNumber}
                onChange={(e) => setFraudNumber(e.target.value)}
                className="w-full h-[30px] pl-2 pr-7 border border-gray-300 text-[11px] focus:border-accent focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full w-[28px] flex items-center justify-center bg-accent text-white">
                <Search size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 회원가입 배너 */}
      <div className="sidebar-box overflow-hidden">
        <Link href="/register-business" className="block">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
            <p className="text-[11px] text-gray-300">회원가입 없이</p>
            <p className="text-[11px] text-gray-300">무료로 이용</p>
            <p className="text-[13px] font-bold mt-1">가능합니다.</p>
          </div>
        </Link>
      </div>

      {/* 최근 등록 업체 */}
      <div className="sidebar-box">
        <div className="sidebar-box-title flex items-center gap-2">
          <Shield size={13} className="text-accent" />
          최근 등록 업체
        </div>
        <div className="p-2">
          {recentCompanies.map((name, i) => (
            <Link key={i} href="/board" className="flex items-center gap-1.5 py-1 px-2 text-[11px] text-gray-600 hover:text-accent hover:bg-gray-50 transition-colors">
              <span className="truncate">{name}</span>
              <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 자주묻는질문 */}
      <div className="sidebar-box">
        <Link href="/faq" className="flex items-center gap-2 px-3 py-3 hover:bg-gray-50 transition-colors">
          <HelpCircle size={14} className="text-gray-500" />
          <span className="text-[12px] text-gray-600">자주묻는질문</span>
        </Link>
      </div>
    </aside>
  );
}
