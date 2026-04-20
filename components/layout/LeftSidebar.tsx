'use client';

import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export default function LeftSidebar() {
  return (
    <aside className="w-[200px] shrink-0 hidden lg:block space-y-2.5">
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
