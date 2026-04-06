'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getChats } from '@/lib/api';
import type { DBChat } from '@/lib/types';

const statusFilters = ['전체', '거래중', '견적대기', '거래완료'];

const stepToStatus = (step: number, status?: string): string => {
  if (status && status !== 'active') return status;
  if (step >= 6) return '거래완료';
  if (step >= 2) return '거래중';
  return '견적대기';
};

const stepLabels = ['', '견적', '기본정보', '계약서', '입금', '배송', '완료'];

export default function ChatListPage() {
  const { user, isLoggedIn } = useAuth();
  const [filter, setFilter] = useState('전체');
  const [chats, setChats] = useState<DBChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    getChats(user.id)
      .then((data) => setChats(data))
      .catch((err) => setError(err.message || '채팅 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-[640px] mx-auto px-5 py-20 text-center">
        <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageCircle size={20} className="text-zinc-400" />
        </div>
        <p className="text-[13px] text-zinc-500 mb-4">로그인 후 이용할 수 있습니다.</p>
        <Link href="/login" className="btn-primary inline-flex h-9 px-5 text-[12px]">로그인</Link>
      </div>
    );
  }

  const filteredChats = filter === '전체' ? chats : chats.filter(c => stepToStatus(c.current_step, c.status) === filter);

  const formatRelative = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return '방금';
    if (mins < 60) return `${mins}분 전`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}시간 전`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}일 전`;
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="max-w-[640px] mx-auto px-5 py-6">
      <h1 className="text-[16px] font-semibold mb-4">채팅</h1>

      <div className="flex border-b border-zinc-200 mb-4">
        {statusFilters.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`tab-underline text-[12px] ${filter === s ? 'active' : ''}`}>{s}
            {s !== '전체' && <span className="ml-1 text-zinc-400">{chats.filter(c => stepToStatus(c.current_step, c.status) === s).length}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-400 text-[13px]">{error}</div>
      ) : filteredChats.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle size={16} className="text-zinc-300" />
          </div>
          <p className="text-zinc-400 text-[13px]">채팅 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {filteredChats.map((chat) => {
            const isBuyer = chat.buyer_id === user!.id;
            const partner = isBuyer ? chat.seller : chat.buyer;
            const partnerType = isBuyer ? '판매' : '구매';
            const chatStatus = stepToStatus(chat.current_step, chat.status);
            const postTitle = chat.post?.title ?? '삭제된 게시글';
            const stepLabel = stepLabels[chat.current_step] || '';

            return (
              <Link key={chat.id} href={`/chat/${chat.id}`}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-50 transition-colors group">
                {/* Avatar */}
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 text-[12px] font-medium shrink-0">
                  {partner?.name?.charAt(0) ?? '?'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[13px] font-medium text-zinc-900 truncate">{partner?.name ?? '알 수 없음'}</span>
                    <span className={`text-[9px] px-1 py-px rounded ${partnerType === '판매' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>{partnerType}</span>
                  </div>
                  <p className="text-[12px] text-zinc-500 truncate">{postTitle}</p>
                </div>

                {/* Right */}
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[10px] text-zinc-400">{formatRelative(chat.updated_at)}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      chatStatus === '거래완료' ? 'bg-zinc-100 text-zinc-600' :
                      chatStatus === '거래중' ? 'bg-blue-50 text-blue-600' :
                      'bg-yellow-50 text-yellow-600'
                    }`}>{stepLabel || chatStatus}</span>
                  </div>
                </div>

                <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-500 shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
