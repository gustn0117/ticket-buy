'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { getPremiumBuyers } from '@/lib/api';
import type { DBPremiumBuyer } from '@/lib/types';

const MEDAL = ['🥇', '🥈', '🥉', '4위', '5위'];

export default function TopBuyers() {
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>([]);

  useEffect(() => {
    getPremiumBuyers(true)
      .then((data) => setBuyers(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-1">
        <Trophy size={14} className="text-zinc-600" />
        <h3 className="text-[13px] font-semibold text-zinc-800">업체 조회 TOP</h3>
      </div>
      <p className="text-[10px] text-zinc-400 mb-3">최근 24시간 샵 조회수 기준 · 활성 제휴 업체</p>
      {buyers.length === 0 ? (
        <p className="text-[12px] text-zinc-400 py-4 text-center">등록된 업체가 없습니다.</p>
      ) : (
        <div className="space-y-1.5">
          {buyers.map((buyer, i) => (
            <Link
              key={buyer.id}
              href={`/buyer/${buyer.id}`}
              className="flex items-center gap-2.5 py-1.5 hover:bg-zinc-50 rounded px-1 -mx-1 transition-colors"
            >
              <span className="text-[13px] w-6 text-center">{MEDAL[i]}</span>
              <span className="text-[12px] text-zinc-800 font-medium">{buyer.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
