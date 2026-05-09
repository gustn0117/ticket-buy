'use client';

import { useEffect, useState } from 'react';
import { Save, Zap } from 'lucide-react';

interface LineAd {
  id: string;
  tier_label: string;
  threshold_text: string;
  jump_count: number;
  sort_order: number;
}

export default function LineAdPricingEditor() {
  const [rows, setRows] = useState<LineAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/line-ad-pricing', { cache: 'no-store' });
      const data = await r.json();
      if (Array.isArray(data)) setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const updateRow = (id: string, patch: Partial<LineAd>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const save = async (row: LineAd) => {
    setSavingId(row.id);
    setSavedId(null);
    try {
      const res = await fetch('/api/line-ad-pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: row.id,
          tier_label: row.tier_label,
          threshold_text: row.threshold_text,
          jump_count: Number(row.jump_count) || 0,
          sort_order: row.sort_order,
        }),
      });
      if (res.ok) {
        setSavedId(row.id);
        setTimeout(() => setSavedId(null), 1800);
      }
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50">
        <h3 className="text-[14px] font-bold text-zinc-800 flex items-center gap-1.5">
          <Zap size={14} className="text-accent" />
          줄광고 점프 안내 (광고문의 페이지에 노출)
        </h3>
        <span className="text-[11px] text-zinc-500">광고비 등급 / 기준 / 무료 점프 횟수 직접 수정</span>
      </div>
      {loading ? (
        <p className="py-10 text-center text-[13px] text-zinc-400">불러오는 중...</p>
      ) : (
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="bg-white border-b border-zinc-200">
              <th className="text-left font-bold text-zinc-600 px-3 py-2 w-[140px]">등급명</th>
              <th className="text-left font-bold text-zinc-600 px-3 py-2">광고비 기준 텍스트</th>
              <th className="text-right font-bold text-zinc-600 px-3 py-2 w-[120px]">무료 점프 횟수</th>
              <th className="text-center font-bold text-zinc-600 px-3 py-2 w-[80px]">정렬</th>
              <th className="text-center font-bold text-zinc-600 px-3 py-2 w-[80px]">저장</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-100">
                <td className="px-3 py-2">
                  <input
                    value={row.tier_label}
                    onChange={(e) => updateRow(row.id, { tier_label: e.target.value })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={row.threshold_text}
                    onChange={(e) => updateRow(row.id, { threshold_text: e.target.value })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] focus:border-accent focus:outline-none"
                    placeholder="50만원 이상"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <input
                    type="number"
                    value={row.jump_count}
                    onChange={(e) => updateRow(row.id, { jump_count: Number(e.target.value) })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] text-right tabular-nums focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="number"
                    value={row.sort_order}
                    onChange={(e) => updateRow(row.id, { sort_order: Number(e.target.value) })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] text-center tabular-nums focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => save(row)}
                    disabled={savingId === row.id}
                    className={`inline-flex items-center gap-1 px-2 h-7 text-[11.5px] font-bold border ${
                      savedId === row.id ? 'bg-green-50 text-green-700 border-green-300' : 'bg-white text-accent border-accent hover:bg-accent-bg'
                    } disabled:opacity-50`}
                  >
                    <Save size={11} />
                    {savedId === row.id ? '완료' : savingId === row.id ? '저장중' : '저장'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
