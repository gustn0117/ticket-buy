'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, FileText, Users, BarChart3, Building2, Globe, PenSquare } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: '현황', icon: LayoutDashboard },
  { href: '/dashboard/schedule', label: '스케줄 현황', icon: Calendar },
  { href: '/dashboard/transactions', label: '거래 내역', icon: FileText },
  { href: '/dashboard/customers', label: '고객별 집계', icon: Users },
  { href: '/dashboard/stats', label: '통계', icon: BarChart3 },
  { href: '/dashboard/company', label: '업체 정보', icon: Building2 },
  { href: '/dashboard/profile', label: '업체 소개', icon: Globe },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-6">
      <div className="flex overflow-x-auto gap-0 mb-6 border-b border-gray-200 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={13} />
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/board/write"
          className="flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 border-transparent text-gray-400 hover:text-gray-600 transition-colors ml-auto"
        >
          <PenSquare size={13} />
          등록 글
        </Link>
      </div>

      {children}
    </div>
  );
}
