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
  { href: '/dashboard/profile', label: '업체 소개 페이지', icon: Globe },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-1 mb-6 bg-white rounded-lg border border-gray-200 p-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/board/write"
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap text-gray-500 hover:bg-gray-100 ml-auto"
        >
          <PenSquare size={14} />
          등록 글
        </Link>
      </div>

      {children}
    </div>
  );
}
