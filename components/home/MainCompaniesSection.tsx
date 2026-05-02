'use client';

import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import CompanyCard from './CompanyCard';
import type { DBPremiumBuyer } from '@/lib/types';

interface Props {
  buyers: DBPremiumBuyer[];
  loading?: boolean;
  /** 옆에 다른 위젯과 함께 배치될 때 4열 그리드로 줄임 */
  compact?: boolean;
  /** 표시할 카드 개수 (기본 16) */
  maxCount?: number;
}

export default function MainCompaniesSection({ buyers, loading, compact = false, maxCount = 16 }: Props) {
  const realCount = buyers.length;
  const items = buyers.slice(0, maxCount);
  const gridCls = compact
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3'
    : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3';

  return (
    <section className={compact ? '' : 'mb-6'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative">
        <p className="text-[11px] text-gray-400">* 배너위치는 실시간으로 랜덤 배치됩니다.</p>
        <h2 className="text-[15px] md:text-[17px] font-bold text-gray-800 absolute left-1/2 -translate-x-1/2 hidden md:block">
          메인 등록업체
        </h2>
        <Link href="/advertising" className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-accent border border-gray-200 px-2 py-1 rounded-sm">
          광고문의 <HelpCircle size={10} />
        </Link>
      </div>
      <h2 className="text-[15px] font-bold text-gray-800 text-center mb-3 md:hidden">메인 등록업체</h2>

      {loading ? (
        <div className="py-16 text-center text-gray-400 text-[13px]">불러오는 중...</div>
      ) : realCount === 0 ? (
        <div className="py-16 text-center bg-white border border-dashed border-gray-200">
          <p className="text-[13px] text-gray-500 mb-2">아직 등록된 업체가 없습니다.</p>
          <Link href="/advertising" className="text-[12px] text-accent font-bold hover:underline">
            첫 업체로 등록하기 →
          </Link>
        </div>
      ) : (
        <div className={gridCls}>
          {items.map((b, i) => (
            <CompanyCard key={b.id} company={b} isNew={i < 3} fallbackIndex={i} />
          ))}
        </div>
      )}
    </section>
  );
}
