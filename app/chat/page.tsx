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
    <div className="max-w-[640px] mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-xl font-extrabold tracking-tight mb-5 flex items-center gap-2.5">
        <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
          <MessageCircle size={18} className="text-gray-900" />
        </div>
        채팅
      </h1>

      {/* Filters - Segmented Control */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-5 overflow-x-auto">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-1 min-w-fit px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              filter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
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
            className="block bg-white rounded-2xl border border-gray-200/60 p-4 shadow-sm card-hover transition-all"
          >
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{chat.partner}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-medium ${
                      chat.partnerType === '판매' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {chat.partnerType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{chat.title}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold ${
                  chat.status === '거래완료' ? 'bg-gray-50 text-gray-900' :
                  chat.status === '거래중' ? 'bg-blue-50 text-blue-600' :
                  chat.status === '견적대기' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {chat.status}
                </span>
                <p className="text-[10px] text-gray-400 mt-1.5">{chat.lastMessageTime}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ml-3 font-semibold shadow-sm">
                  {chat.unread}
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />완료 {chat.tradeCompleted}건</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />거래중 {chat.tradeOngoing}건</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" />지연 {chat.tradeDelayed}건</span>
            </div>
          </Link>
        ))}

        {filteredChats.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle size={20} className="text-gray-300" />
            </div>
            채팅 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
