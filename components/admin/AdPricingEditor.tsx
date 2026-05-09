'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

interface Pricing {
  id: string;
  slot: string;
  label: string;
  period: string;
  price: number;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

/** 어드민 광고 탭 상단에 노출되는 광고 가격 인라인 편집 표 */
export default function AdPricingEditor() {
  const [rows, setRows] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/ad-pricing', { cache: 'no-store' });
      const data = await r.json();
      if (Array.isArray(data)) setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const updateRow = (id: string, patch: Partial<Pricing>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const save = async (row: Pricing) => {
    setSavingId(row.id);
    setSavedId(null);
    try {
      const res = await fetch('/api/ad-pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: row.id,
          label: row.label,
          period: row.period,
          price: Number(row.price) || 0,
          description: row.description,
          is_active: row.is_active,
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
        <h3 className="text-[14px] font-bold text-zinc-800">광고위치 및 비용안내 (사용자 노출 가격표)</h3>
        <span className="text-[11px] text-zinc-500">슬롯별 단가/이름/위치 안내를 직접 수정 → 저장</span>
      </div>
      {loading ? (
        <p className="py-10 text-center text-[13px] text-zinc-400">불러오는 중...</p>
      ) : (
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="bg-white border-b border-zinc-200">
              <th className="text-left font-bold text-zinc-600 px-3 py-2 w-[120px]">슬롯</th>
              <th className="text-left font-bold text-zinc-600 px-3 py-2 w-[160px]">노출 이름</th>
              <th className="text-left font-bold text-zinc-600 px-3 py-2">위치 안내(설명)</th>
              <th className="text-right font-bold text-zinc-600 px-3 py-2 w-[110px]">단가(원)</th>
              <th className="text-center font-bold text-zinc-600 px-3 py-2 w-[80px]">기간</th>
              <th className="text-center font-bold text-zinc-600 px-3 py-2 w-[60px]">노출</th>
              <th className="text-center font-bold text-zinc-600 px-3 py-2 w-[80px]">저장</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-100">
                <td className="px-3 py-2 font-mono text-[11px] text-zinc-500 whitespace-nowrap">{row.slot}</td>
                <td className="px-3 py-2">
                  <input
                    value={row.label}
                    onChange={(e) => updateRow(row.id, { label: e.target.value })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={row.description || ''}
                    onChange={(e) => updateRow(row.id, { description: e.target.value })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] focus:border-accent focus:outline-none"
                    placeholder="홈페이지 첫화면 ..."
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <input
                    type="number"
                    value={row.price}
                    onChange={(e) => updateRow(row.id, { price: Number(e.target.value) })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[12.5px] text-right tabular-nums focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={row.period}
                    onChange={(e) => updateRow(row.id, { period: e.target.value })}
                    className="w-full h-8 px-2 border border-zinc-200 text-[11.5px] text-center focus:border-accent focus:outline-none"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row.is_active}
                    onChange={(e) => updateRow(row.id, { is_active: e.target.checked })}
                    className="w-3.5 h-3.5"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => save(row)}
                    disabled={savingId === row.id}
                    className={`inline-flex items-center gap-1 px-2 h-7 text-[11.5px] font-bold border ${
                      savedId === row.id
                        ? 'bg-green-50 text-green-700 border-green-300'
                        : 'bg-white text-accent border-accent hover:bg-accent-bg'
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
