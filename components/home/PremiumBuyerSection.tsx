'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PremiumBuyerCard from './PremiumBuyerCard';
import type { DBPremiumBuyer } from '@/lib/types';

const TIER_LABELS: Record<string, string> = {
  premium: '프리미엄',
  standard: '스탠다드',
  basic: '베이직',
};

const TIER_ORDER = ['premium', 'standard', 'basic'] as const;
const PER_PAGE = 6; // 2열 x 3행

interface PremiumBuyerSectionProps {
  buyers: DBPremiumBuyer[];
}

export default function PremiumBuyerSection({ buyers }: PremiumBuyerSectionProps) {
  const [activeTier, setActiveTier] = useState<string>('all');
  const [page, setPage] = useState(1);

  const filtered = activeTier === 'all' ? buyers : buyers.filter(b => b.tier === activeTier);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // 존재하는 티어만 탭에 표시
  const availableTiers = TIER_ORDER.filter(t => buyers.some(b => b.tier === t));

  const changeTier = (tier: string) => {
    setActiveTier(tier);
    setPage(1);
  };

  if (buyers.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <h2 className="section-title mb-0">프리미엄 구매 업체</h2>
          <span className="badge bg-zinc-100 text-zinc-400">AD</span>
        </div>

        {/* 티어 탭 */}
        {availableTiers.length > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => changeTier('all')}
              className={`text-[11px] px-2.5 py-1 rounded transition-colors ${activeTier === 'all' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-700'}`}>
              전체
            </button>
            {availableTiers.map(t => (
              <button key={t} onClick={() => changeTier(t)}
                className={`text-[11px] px-2.5 py-1 rounded transition-colors ${activeTier === t ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-700'}`}>
                {TIER_LABELS[t]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 카드 그리드 2열 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paged.map((buyer) => (
          <PremiumBuyerCard key={buyer.id} {...buyer} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 transition-colors">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-medium transition-colors ${
                p === page ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-100'
              }`}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
