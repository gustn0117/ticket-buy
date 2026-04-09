'use client';

import { Search, Monitor, Shield } from 'lucide-react';
import Link from 'next/link';
import RealtimeTrades from './RealtimeTrades';
import TopBuyers from './TopBuyers';
import SideNotices from './SideNotices';
import AdBanner from '@/components/ads/AdBanner';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-[280px] shrink-0 space-y-4">
      {/* Quick Links - 내채팅 */}
      <div className="card p-4">
        <h3 className="text-[13px] font-semibold text-zinc-800 mb-3">내채팅</h3>
        <div className="grid grid-cols-3 gap-2">
          <Link href="/board?tab=buy" className="flex flex-col items-center gap-1.5 py-2.5 rounded-lg border border-zinc-100 hover:bg-zinc-50 transition-colors">
            <Search size={16} className="text-zinc-500" />
            <span className="text-[10px] text-zinc-600">사업자 조회</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center gap-1.5 py-2.5 rounded-lg border border-zinc-100 hover:bg-zinc-50 transition-colors">
            <Monitor size={16} className="text-zinc-500" />
            <span className="text-[10px] text-zinc-600">디지트</span>
          </Link>
          <Link href="/fraud" className="flex flex-col items-center gap-1.5 py-2.5 rounded-lg border border-zinc-100 hover:bg-zinc-50 transition-colors">
            <Shield size={16} className="text-zinc-500" />
            <span className="text-[10px] text-zinc-600">사이버수사대</span>
          </Link>
        </div>
      </div>

      <TopBuyers />
      <SideNotices />
      <RealtimeTrades />

      {/* Sidebar Ad Banners */}
      <AdBanner slot="sidebar_top" className="h-[120px]" />
      <AdBanner slot="sidebar_bottom" className="h-[120px]" />
    </aside>
  );
}
