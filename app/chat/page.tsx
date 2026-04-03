'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, User } from 'lucide-react';
import { chatList } from '@/data/mock';

const statusFilters = ['전체', '거래중', '견적대기', '거래완료', '취소'];

export default function ChatListPage() {
  const [filter, setFilter] = useState('전체');

  const filteredChats = filter === '전체'
    ? chatList
    : chatList.filter(c => c.status === filter);

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

      {/* Chat List */}
      <div className="space-y-3">
        {filteredChats.map((chat) => (
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
                    <span className="font-medium text-[13px] text-zinc-900">{chat.partner}</span>
                    <span className={`badge ${
                      chat.partnerType === '판매' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {chat.partnerType}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{chat.title}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`badge ${
                  chat.status === '거래완료' ? 'bg-zinc-100 text-zinc-900' :
                  chat.status === '거래중' ? 'bg-blue-50 text-blue-600' :
                  chat.status === '견적대기' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-zinc-100 text-zinc-500'
                }`}>
                  {chat.status}
                </span>
                <p className="text-[11px] text-zinc-400 mt-1.5">{chat.lastMessageTime}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[13px] text-zinc-600 truncate flex-1">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <span className="bg-red-500 text-white text-[11px] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ml-3 font-medium">
                  {chat.unread}
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-3 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />완료 {chat.tradeCompleted}건</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />거래중 {chat.tradeOngoing}건</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" />지연 {chat.tradeDelayed}건</span>
            </div>
          </Link>
        ))}

        {filteredChats.length === 0 && (
          <div className="py-20 text-center text-zinc-400 text-[13px]">
            <MessageCircle size={20} className="mx-auto mb-3 text-zinc-300" />
            채팅 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
