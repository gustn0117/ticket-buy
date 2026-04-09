'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TrendingUp } from 'lucide-react';

interface RealtimeTrade {
  id: string;
  buyer_name: string;
  seller_name: string;
  amount: number;
  created_at: string;
  status: string;
}

function maskName(name: string) {
  if (name.length <= 1) return name;
  return name[0] + '*'.repeat(name.length - 1);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  return new Date(dateStr).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function RealtimeTrades() {
  const [trades, setTrades] = useState<RealtimeTrade[]>([]);

  useEffect(() => {
    // Fetch recent completed trades
    supabase
      .from('chats')
      .select('id, created_at, current_step, post:posts(price), buyer:users!buyer_id(name), seller:users!seller_id(name)')
      .gte('current_step', 4)
      .order('updated_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) {
          setTrades(data.map((d: any) => ({
            id: d.id,
            buyer_name: d.buyer?.name ?? '구매자',
            seller_name: d.seller?.name ?? '판매자',
            amount: d.post?.price ?? 0,
            created_at: d.created_at,
            status: d.current_step >= 6 ? '거래 완료' : '입금 완료',
          })));
        }
      });

    // Real-time subscription
    const channel = supabase
      .channel('realtime-trades')
      .on('postgres_changes', { event: 'UPDATE', schema: 'ticket_buy', table: 'chats', filter: 'current_step=gte.4' }, () => {
        // Refetch on update
        supabase
          .from('chats')
          .select('id, created_at, current_step, post:posts(price), buyer:users!buyer_id(name), seller:users!seller_id(name)')
          .gte('current_step', 4)
          .order('updated_at', { ascending: false })
          .limit(5)
          .then(({ data }) => {
            if (data) {
              setTrades(data.map((d: any) => ({
                id: d.id,
                buyer_name: d.buyer?.name ?? '구매자',
                seller_name: d.seller?.name ?? '판매자',
                amount: d.post?.price ?? 0,
                created_at: d.created_at,
                status: d.current_step >= 6 ? '거래 완료' : '입금 완료',
              })));
            }
          });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <TrendingUp size={14} className="text-zinc-600" />
        <h3 className="text-[13px] font-semibold text-zinc-800">실시간 거래 체결</h3>
      </div>
      <p className="text-[10px] text-zinc-400 mb-3">거래 건 기준이며, 목록에는 입금 완료·거래 완료만 표시합니다.</p>
      {trades.length === 0 ? (
        <p className="text-[12px] text-zinc-400 py-4 text-center">아직 거래 데이터가 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between py-1.5 border-b border-zinc-50 last:border-0">
              <div className="flex items-center gap-2">
                <span className={`badge text-[10px] ${trade.status === '거래 완료' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {trade.status}
                </span>
                <span className="text-[11px] text-zinc-600">{trade.seller_name}</span>
                <span className="text-[11px] text-zinc-400">{maskName(trade.buyer_name)}님</span>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-zinc-700">총 {trade.amount.toLocaleString()}원</p>
                <p className="text-[10px] text-zinc-400">{timeAgo(trade.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
