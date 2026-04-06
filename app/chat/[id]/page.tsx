'use client';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, FileText, CreditCard, Truck, CheckCircle2, Info, ChevronDown } from 'lucide-react';
import QuoteForm, { QuoteData } from '@/components/chat/QuoteForm';
import UserInfoPopup from '@/components/chat/UserInfoPopup';
import { useAuth } from '@/contexts/AuthContext';
import { getChat, getMessages, sendMessage as apiSendMessage, updateChatStep } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import type { DBChat, DBMessage } from '@/lib/types';

const stepLabels = ['', '견적', '기본정보', '계약서', '입금', '배송', '완료'];

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [chat, setChat] = useState<DBChat | null>(null);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showStepActions, setShowStepActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getChat(id), getMessages(id)])
      .then(([chatData, msgData]) => {
        setChat(chatData);
        setCurrentStep(chatData.current_step || 1);
        setMessages(msgData);
      })
      .catch((err) => setError(err.message || '채팅을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));

    const channel = supabase
      .channel(`chat-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'ticket_buy', table: 'messages', filter: `chat_id=eq.${id}` },
        (payload: { new: DBMessage }) => {
          setMessages(prev => prev.some(m => m.id === payload.new.id) ? prev : [...prev, payload.new]);
        })
      .on('postgres_changes', { event: 'UPDATE', schema: 'ticket_buy', table: 'chats', filter: `id=eq.${id}` },
        (payload: { new: { current_step: number; status: string } }) => {
          setCurrentStep(payload.new.current_step);
        })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addSystemMessage = async (content: string, type: string = 'system-action', data?: Record<string, unknown>) => {
    if (!user) return;
    try {
      const msg = await apiSendMessage({ chat_id: id, sender_id: null, type, content, data: data || null });
      setMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, msg]);
    } catch {}
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !user || sending) return;
    const text = inputText;
    setInputText('');
    setSending(true);
    try {
      const msg = await apiSendMessage({ chat_id: id, sender_id: user.id, type: 'message', content: text, data: null });
      setMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, msg]);
    } catch { setInputText(text); }
    setSending(false);
    inputRef.current?.focus();
  };

  const advanceStep = async (step: number, status?: string) => {
    try { await updateChatStep(id, step, status); setCurrentStep(step); } catch {}
  };

  const handleQuoteSubmit = async (data: QuoteData) => {
    await addSystemMessage('견적을 제안했습니다.', 'quote', data as unknown as Record<string, unknown>);
    setShowQuoteForm(false);
    await addSystemMessage('견적을 제안했습니다. 상대방의 응답을 기다려주세요.', 'system-action');
  };

  const stepActions: Record<number, { primary?: { label: string; action: () => void; icon?: React.ReactNode }; secondary?: { label: string; action: () => void; icon?: React.ReactNode }[] }> = {
    1: { primary: { label: '견적 제안', action: () => setShowQuoteForm(true), icon: <FileText size={14} /> } },
    2: {
      primary: { label: '기본정보 확인 완료', action: async () => { await addSystemMessage('기본정보를 확인했습니다.', 'system-action'); await advanceStep(3); } },
      secondary: [{ label: '기본정보 제출', action: async () => { await addSystemMessage('기본정보를 제출했습니다.', 'system-action'); } }],
    },
    3: { primary: { label: '계약서 작성', action: async () => { await addSystemMessage('계약서가 작성되었습니다.', 'system-action'); await advanceStep(4); }, icon: <FileText size={14} /> } },
    4: {
      primary: { label: '입금 확인 완료', action: async () => { await addSystemMessage('입금이 확인되었습니다.', 'system-action'); await advanceStep(5); } },
      secondary: [{ label: '입금 확인 요청', action: async () => { await addSystemMessage('입금 확인을 요청했습니다.', 'system-action'); }, icon: <CreditCard size={14} /> }],
    },
    5: {
      primary: { label: '거래 완료', action: async () => { await addSystemMessage('거래가 완료되었습니다.', 'system-action'); await advanceStep(6, '거래완료'); }, icon: <CheckCircle2 size={14} /> },
      secondary: [
        { label: '배송정보 요청', action: async () => { await addSystemMessage('배송정보를 요청했습니다.', 'system-action'); }, icon: <Truck size={14} /> },
        { label: '배송정보 입력', action: async () => { await addSystemMessage('배송정보가 입력되었습니다.', 'system-action'); } },
      ],
    },
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${m}`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const getDateKey = (dateStr: string) => new Date(dateStr).toDateString();

  if (loading) return <div className="max-w-[640px] mx-auto px-5 py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>;
  if (error || !chat) {
    return (
      <div className="max-w-[640px] mx-auto px-5 py-20 text-center">
        <p className="text-zinc-400 text-[13px] mb-4">{error || '채팅을 찾을 수 없습니다.'}</p>
        <Link href="/chat" className="text-[13px] text-zinc-900 underline">목록으로</Link>
      </div>
    );
  }

  const isBuyer = chat.buyer_id === user?.id;
  const partner = isBuyer ? chat.seller : chat.buyer;
  const partnerType = isBuyer ? '판매' : '구매';
  const postTitle = chat.post?.title ?? '삭제된 게시글';
  const currentActions = stepActions[currentStep];
  const partnerInfo = partner ? {
    name: partner.name, type: partner.type === 'business' ? '프리미엄 업체' : '일반 회원',
    joinDate: new Date(partner.created_at).toLocaleDateString('ko-KR'), tradeCompleted: 0, tradeOngoing: 0, tradeDelayed: 0,
  } : null;

  let lastDateKey = '';

  return (
    <div className="max-w-[640px] mx-auto flex flex-col h-[calc(100vh-60px-52px)] md:h-[calc(100vh-60px)]">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/chat" className="text-zinc-400 hover:text-zinc-700"><ArrowLeft size={18} /></Link>
          <button onClick={() => setShowUserInfo(true)} className="flex items-center gap-2.5 flex-1 min-w-0 text-left">
            <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center text-white shrink-0 text-[12px] font-semibold">
              {partner?.name?.charAt(0) ?? '?'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-zinc-900">{partner?.name ?? '알 수 없음'}</span>
                <span className={`text-[10px] px-1.5 py-px rounded font-medium ${partnerType === '판매' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>{partnerType}</span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate">{postTitle}</p>
            </div>
          </button>
          {currentStep < 6 && (
            <span className="text-[10px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded shrink-0">{stepLabels[currentStep]} ({currentStep}/6)</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-[#F5F5F5]">
        {messages.map((msg) => {
          const dateKey = getDateKey(msg.created_at);
          let showDate = false;
          if (dateKey !== lastDateKey) { showDate = true; lastDateKey = dateKey; }

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center py-2">
                  <span className="text-[10px] text-zinc-400 bg-white/80 px-3 py-1 rounded-full border border-zinc-200/50">{formatDate(msg.created_at)}</span>
                </div>
              )}

              {msg.type === 'notice' && (
                <div className="bg-white border border-zinc-200 rounded-lg px-4 py-3 mb-2">
                  <div className="flex gap-2.5">
                    <Info size={14} className="text-zinc-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-zinc-500 leading-[1.7]">{msg.content}</p>
                  </div>
                </div>
              )}

              {msg.type === 'system-action' && (
                <div className="flex justify-center py-1">
                  <span className="text-[11px] text-zinc-400">{msg.content}</span>
                </div>
              )}

              {msg.type === 'quote' && (
                <div className="flex justify-center py-1">
                  <div className="bg-white border border-zinc-200 rounded-lg p-4 max-w-[320px] w-full">
                    <p className="text-[12px] font-semibold text-zinc-900 mb-2.5 flex items-center gap-1.5">
                      <FileText size={13} className="text-zinc-400" /> 견적 제안
                    </p>
                    {msg.data && (
                      <div className="space-y-1 text-[11px] mb-3">
                        <div className="flex justify-between"><span className="text-zinc-400">수량</span><span className="text-zinc-700">{String(msg.data.quantity)}건</span></div>
                        <div className="flex justify-between"><span className="text-zinc-400">구매금액</span><span className="text-zinc-700">{Number(msg.data.pricePerUnit).toLocaleString()}원</span></div>
                        <div className="flex justify-between"><span className="text-zinc-400">상품권 금액</span><span className="text-zinc-700">{Number(msg.data.faceValuePerUnit).toLocaleString()}원</span></div>
                        <div className="flex justify-between border-t border-zinc-100 pt-1 mt-1"><span className="text-zinc-400">할인율</span><span className="text-red-500 font-medium">{String(msg.data.discount)}%</span></div>
                      </div>
                    )}
                    {currentStep === 1 && (
                      <div className="flex gap-2">
                        <button onClick={async () => { await addSystemMessage('견적이 수락되었습니다.', 'system-action'); await advanceStep(2); }} className="btn-primary flex-1 h-8 text-[11px]">수락</button>
                        <button className="btn-secondary flex-1 h-8 text-[11px]">거절</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {msg.type === 'message' && (() => {
                const isMe = msg.sender_id === user?.id;
                return (
                  <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-0.5`}>
                    <div className={`flex items-end gap-1.5 max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                      <div className={`px-3.5 py-2 text-[13px] leading-[1.6] ${
                        isMe ? 'bg-zinc-900 text-white rounded-[18px] rounded-br-[4px]'
                              : 'bg-white text-zinc-800 rounded-[18px] rounded-bl-[4px] border border-zinc-200'
                      }`}>
                        {msg.content}
                      </div>
                      <span className="text-[9px] text-zinc-400 shrink-0 pb-1">{formatTime(msg.created_at)}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quote Form */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <QuoteForm onSubmit={handleQuoteSubmit} onClose={() => setShowQuoteForm(false)} />
        </div>
      )}

      {/* Step Actions (collapsible) */}
      {currentStep < 6 && currentActions && (
        <div className="bg-white border-t border-zinc-200 shrink-0">
          <button onClick={() => setShowStepActions(!showStepActions)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] text-zinc-500 hover:text-zinc-700 transition-colors">
            거래 관리 <ChevronDown size={12} className={`transition-transform ${showStepActions ? 'rotate-180' : ''}`} />
          </button>
          {showStepActions && (
            <div className="px-4 pb-3 flex gap-2">
              {currentActions.secondary?.map((a, i) => (
                <button key={i} onClick={a.action} className="btn-secondary flex-1 h-8 text-[11px]">{a.icon}{a.label}</button>
              ))}
              {currentActions.primary && (
                <button onClick={currentActions.primary.action} className="btn-primary flex-1 h-8 text-[11px]">{currentActions.primary.icon}{currentActions.primary.label}</button>
              )}
            </div>
          )}
        </div>
      )}

      {currentStep >= 6 && (
        <div className="bg-zinc-50 border-t border-zinc-200 px-4 py-2.5 text-center shrink-0">
          <span className="text-[12px] text-zinc-500 flex items-center justify-center gap-1"><CheckCircle2 size={13} /> 거래 완료</span>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-zinc-200 px-3 py-2 shrink-0">
        <div className="flex items-center gap-2">
          <input ref={inputRef} type="text" value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSendMessage()}
            placeholder="메시지를 입력하세요"
            className="flex-1 h-10 px-4 bg-zinc-100 rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-zinc-300 placeholder:text-zinc-400" />
          <button onClick={handleSendMessage} disabled={!inputText.trim() || sending}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              inputText.trim() ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-400'
            }`}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {showUserInfo && partnerInfo && <UserInfoPopup user={partnerInfo} onClose={() => setShowUserInfo(false)} />}
    </div>
  );
}
