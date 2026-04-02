'use client';

import Link from 'next/link';
import { Search, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { notices } from '@/data/mock';

export default function Sidebar() {
  const { isLoggedIn, user } = useAuth();

  return (
    <aside className="space-y-4">
      {/* Login Box */}
      <div className="bg-white rounded-lg p-5 border border-gray-200">
        {isLoggedIn ? (
          <div className="text-center">
            <p className="font-medium text-lg mb-1">{user?.businessName || user?.name}</p>
            <p className="text-sm text-gray-500 mb-3">{user?.type === 'business' ? '프리미엄 업체' : '일반 회원'}</p>
            <Link
              href="/dashboard"
              className="block w-full bg-primary text-white rounded-lg py-2.5 text-center font-medium hover:bg-primary-dark transition-colors"
            >
              대시보드
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-4">로그인이 필요합니다</p>
            <Link
              href="/login"
              className="block w-full bg-primary text-white rounded-lg py-2.5 text-center font-medium hover:bg-primary-dark transition-colors"
            >
              로그인
            </Link>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <button className="flex flex-col items-center py-4 hover:bg-gray-50 transition-colors">
            <Search size={20} className="text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">사업자 조회</span>
          </button>
          <button className="flex flex-col items-center py-4 hover:bg-gray-50 transition-colors">
            <Shield size={20} className="text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">더치트</span>
          </button>
          <button className="flex flex-col items-center py-4 hover:bg-gray-50 transition-colors">
            <AlertTriangle size={20} className="text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">사이버수사대</span>
          </button>
        </div>
      </div>

      {/* Notices */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2">
          <span className="text-lg">📢</span> 공지사항
        </h3>
        <ul className="space-y-2">
          {notices.slice(0, 5).map((notice) => (
            <li key={notice.id}>
              <Link href="/notice" className="block text-sm text-gray-600 hover:text-primary truncate">
                {notice.title}
              </Link>
              <span className="text-[10px] text-gray-400">{notice.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
