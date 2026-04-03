'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getChats } from '@/lib/api';
import type { DBChat } from '@/lib/types';

const statusFilters = ['전체', '거래중', '견적대기', '거래완료', '취소'];

const stepToStatus = (step: number, status?: string): string => {
  if (status && status !== 'active') return status;
  if (step >= 6) return '거래완료';
  if (step >= 2) return '거래중';
  return '견적대기';
};

export default function ChatListPage() {
  const { user, isLoggedIn } = useAuth();
  const [filter, setFilter] = useState('전체');
  const [chats, setChats] = useState<DBChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getChats(user.id)
      .then((data) => setChats(data))
      .catch((err) => setError(err.message || '채팅 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-[640px] mx-auto px-5 py-20 text-center animate-fade-in">
        <MessageCircle size={24} className="mx-auto mb-3 text-zinc-300" />
        <p className="text-zinc-500 text-[13px] mb-4">로그인 후 이용할 수 있습니다.</p>
        <Link href="/login" className="btn-primary inline-flex h-10 px-6">로그인</Link>
      </div>
    );
  }

  const filteredChats = filter === '전체'
    ? chats
    : chats.filter(c => stepToStatus(c.current_step, c.status) === filter);

  return (
    <div className="max-w-[640px] mx-auto px-5 py-6 animate-fade-in">
      <h1 className="section-title flex items-center gap-2 mb-5">
        <MessageCircle size={18} className="text-zinc-900" />
        채팅
      </h1>

      {/* Filters - Tab Underline */}
      <div className="flex border-b border-zinc-200 mb-5 overflow-x-auto scrollbar-hide">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`tab-underline whitespace-nowrap ${filter === s ? 'active' : ''}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-400 text-[13px]">{error}</div>
      ) : (
        <div className="space-y-3">
          {filteredChats.map((chat) => {
            const isBuyer = chat.buyer_id === user!.id;
            const partner = isBuyer ? chat.seller : chat.buyer;
            const partnerType = isBuyer ? '판매' : '구매';
            const chatStatus = stepToStatus(chat.current_step, chat.status);
            const postTitle = chat.post?.title ?? '삭제된 게시글';

            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block card card-hover p-4"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[13px] text-zinc-900">{partner?.name ?? '알 수 없음'}</span>
                        <span className={`badge ${
                          partnerType === '판매' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {partnerType}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{postTitle}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`badge ${
                      chatStatus === '거래완료' ? 'bg-zinc-100 text-zinc-900' :
                      chatStatus === '거래중' ? 'bg-blue-50 text-blue-600' :
                      chatStatus === '견적대기' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-zinc-100 text-zinc-500'
                    }`}>
                      {chatStatus}
                    </span>
                    <p className="text-[11px] text-zinc-400 mt-1.5">
                      {new Date(chat.updated_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}

          {filteredChats.length === 0 && (
            <div className="py-20 text-center text-zinc-400 text-[13px]">
              <MessageCircle size={20} className="mx-auto mb-3 text-zinc-300" />
              채팅 내역이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
