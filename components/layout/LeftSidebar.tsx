'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Clock, HelpCircle, X } from 'lucide-react';
import { getRecentBuyers, clearRecentBuyers, RECENT_BUYERS_EVENT, type RecentBuyer } from '@/lib/recentBuyers';

export default function LeftSidebar() {
  const [recent, setRecent] = useState<RecentBuyer[]>([]);

  useEffect(() => {
    const refresh = () => setRecent(getRecentBuyers());
    refresh();
    window.addEventListener(RECENT_BUYERS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(RECENT_BUYERS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

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

      {/* 최근 등록 업체 (= 최근 본 업체) */}
      <div className="sidebar-box">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-accent" />
            <span className="text-[12px] font-bold text-gray-700">최근 등록 업체</span>
          </div>
          {recent.length > 0 && (
            <button
              onClick={clearRecentBuyers}
              aria-label="최근 등록 업체 비우기"
              className="text-gray-400 hover:text-accent"
            >
              <X size={11} />
            </button>
          )}
        </div>

        {recent.length === 0 ? (
          <p className="px-3 py-5 text-[11px] text-gray-400 leading-relaxed">
            업체 카드를 클릭하면 이곳에 기록됩니다.
          </p>
        ) : (
          <ul>
            {recent.map((b) => (
              <li key={b.id} className="border-b border-gray-100 last:border-b-0">
                <Link
                  href={`/buyer/${b.id}`}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors"
                  title={b.name}
                >
                  {b.image_url ? (
                    <img
                      src={b.image_url}
                      alt=""
                      className="w-6 h-6 rounded object-cover border border-gray-200 shrink-0"
                    />
                  ) : (
                    <span className="w-6 h-6 rounded bg-gray-100 border border-gray-200 shrink-0" />
                  )}
                  <span className="text-[11px] text-gray-700 truncate flex-1">{b.name}</span>
                  {b.region && (
                    <span className="text-[10px] text-gray-400 shrink-0">{b.region}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
