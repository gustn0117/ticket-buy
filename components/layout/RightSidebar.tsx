'use client';

import Link from 'next/link';
import { Calculator, Search, ExternalLink, Phone, MessageCircle } from 'lucide-react';

export default function RightSidebar() {
  return (
    <aside className="w-[180px] shrink-0 hidden xl:block space-y-2.5">
      {/* 상품권 시세 계산기 */}
      <div className="sidebar-box">
        <Link href="/guide" className="flex flex-col items-center py-4 px-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center mb-2">
            <Calculator size={20} className="text-accent" />
          </div>
          <span className="text-[11px] font-bold text-gray-700">상품권 시세</span>
          <span className="text-[10px] text-gray-500">계산기</span>
        </Link>
      </div>

      {/* 정식업체 조회 */}
      <div className="sidebar-box">
        <Link href="/board" className="flex flex-col items-center py-4 px-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center mb-2">
            <Search size={20} className="text-gray-600" />
          </div>
          <span className="text-[11px] font-bold text-gray-700">등록업체</span>
          <span className="text-[10px] text-gray-500">통합조회</span>
        </Link>
      </div>

      {/* 스폰서링크 */}
      <div className="sidebar-box">
        <div className="px-3 py-2 border-b border-gray-200">
          <span className="text-[11px] font-bold text-gray-500">스폰서링크</span>
        </div>
        <div className="p-3">
          <div className="bg-accent/5 border border-accent/20 rounded p-3 text-center">
            <p className="text-[11px] text-gray-600">행복을 드립니다</p>
            <div className="w-12 h-12 mx-auto my-2 bg-gray-100 rounded flex items-center justify-center">
              <Phone size={20} className="text-gray-400" />
            </div>
            <p className="text-[11px] text-gray-700 font-medium">편하게 문의주세요</p>
            <Link href="/register-business" className="inline-flex items-center gap-1 mt-2 text-[10px] text-accent font-bold">
              바로가기 <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
