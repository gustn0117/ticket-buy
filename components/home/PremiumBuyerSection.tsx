'use client';

import { useState } from 'react';
import PremiumBuyerCard from './PremiumBuyerCard';
import type { DBPremiumBuyer } from '@/lib/types';

const TIER_LABELS: Record<string, string> = {
  premium: '프리미엄',
  standard: '스탠다드',
  basic: '베이직',
};

const TIER_ORDER = ['premium', 'standard', 'basic'] as const;
const MAX_CARDS = 50;

interface PremiumBuyerSectionProps {
  buyers: DBPremiumBuyer[];
}

export default function PremiumBuyerSection({ buyers }: PremiumBuyerSectionProps) {
  const [activeTier, setActiveTier] = useState<string>('all');

  const filtered = activeTier === 'all' ? buyers : buyers.filter(b => b.tier === activeTier);
  const visible = filtered.slice(0, MAX_CARDS);

  const availableTiers = TIER_ORDER.filter(t => buyers.some(b => b.tier === t));

  if (buyers.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <h2 className="section-title mb-0">프리미엄 구매 업체</h2>
          <span className="badge bg-zinc-100 text-zinc-400">AD</span>
        </div>

        {availableTiers.length > 1 && (
          <div className="flex items-center gap-1">
            <button onClick={() => setActiveTier('all')}
              className={`text-[11px] px-2.5 py-1 rounded transition-colors ${activeTier === 'all' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-700'}`}>
              전체
            </button>
            {availableTiers.map(t => (
              <button key={t} onClick={() => setActiveTier(t)}
                className={`text-[11px] px-2.5 py-1 rounded transition-colors ${activeTier === t ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-700'}`}>
                {TIER_LABELS[t]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 모바일 2열, 태블릿 3열, 데스크탑 4열 - 최대 50개 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
        {visible.map((buyer) => (
          <PremiumBuyerCard key={buyer.id} {...buyer} />
        ))}
      </div>

      {filtered.length > MAX_CARDS && (
        <p className="text-[11px] text-zinc-400 text-center mt-3">{filtered.length}개 중 {MAX_CARDS}개 표시</p>
      )}
    </section>
  );
}
