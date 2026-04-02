'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { chatList } from '@/data/mock';

const statusFilters = ['전체', '거래중', '견적대기', '거래완료', '취소'];

export default function ChatListPage() {
  const [filter, setFilter] = useState('전체');

  const filteredChats = filter === '전체'
    ? chatList
    : chatList.filter(c => c.status === filter);

  return (
    <div className="max-w-[640px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageCircle size={22} className="text-primary" />
        채팅
      </h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="space-y-2">
        {filteredChats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                  👤
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{chat.partner}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      chat.partnerType === '판매' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {chat.partnerType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{chat.title}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  chat.status === '거래완료' ? 'bg-green-100 text-green-600' :
                  chat.status === '거래중' ? 'bg-blue-100 text-blue-600' :
                  chat.status === '견적대기' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {chat.status}
                </span>
                <p className="text-[10px] text-gray-400 mt-1">{chat.lastMessageTime}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-2">
                  {chat.unread}
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-2 text-[10px] text-gray-400">
              <span>거래완료 {chat.tradeCompleted}건</span>
              <span>거래중 {chat.tradeOngoing}건</span>
              <span>지연중 {chat.tradeDelayed}건</span>
            </div>
          </Link>
        ))}

        {filteredChats.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            채팅 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
