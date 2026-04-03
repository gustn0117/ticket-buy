'use client';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Paperclip, Send, FileText, CreditCard, Truck, CheckCircle2, Heart } from 'lucide-react';
import TradeStepBar from '@/components/chat/TradeStepBar';
import QuoteForm, { QuoteData } from '@/components/chat/QuoteForm';
import UserInfoPopup from '@/components/chat/UserInfoPopup';
import { useAuth } from '@/contexts/AuthContext';
import { getChat, getMessages, sendMessage as apiSendMessage, updateChatStep } from '@/lib/api';
import type { DBChat, DBMessage } from '@/lib/types';

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [chat, setChat] = useState<DBChat | null>(null);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addSystemMessage = async (content: string, type: string = 'system-action', data?: Record<string, unknown>) => {
    if (!user) return;
    try {
      const msg = await apiSendMessage({
        chat_id: id,
        sender_id: null,
        type,
        content,
        data: data || null,
      });
      setMessages(prev => [...prev, msg]);
    } catch {
      // silent fail for system messages
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !user) return;
    const text = inputText;
    setInputText('');
    try {
      const msg = await apiSendMessage({
        chat_id: id,
        sender_id: user.id,
        type: 'message',
        content: text,
        data: null,
      });
      setMessages(prev => [...prev, msg]);
    } catch {
      setInputText(text);
    }
  };

  const advanceStep = async (step: number, status?: string) => {
    try {
      await updateChatStep(id, step, status);
      setCurrentStep(step);
    } catch {
      // silent
    }
  };

  const handleQuoteSubmit = async (data: QuoteData) => {
    await addSystemMessage('견적을 제안했습니다.', 'quote', data as unknown as Record<string, unknown>);
    setShowQuoteForm(false);
    await addSystemMessage('[견적 제안]\n견적을 제안했습니다. 판매자의 응답을 기다려주세요.', 'system-action');
  };

  const acceptQuote = async () => {
    await addSystemMessage('[견적 수락]\n견적이 수락되었습니다. 기본정보를 요청하세요.', 'system-action');
    await advanceStep(2);
  };

  const submitBasicInfo = async () => {
    await addSystemMessage('[기본정보 제출]\n기본정보를 제출했습니다.', 'system-action');
    await addSystemMessage('[기본정보 확인]\n판매자가 기본정보를 제출했습니다. 채팅에서 확인 또는 재요청해주세요.', 'system-action');
  };

  const confirmBasicInfo = async () => {
    await addSystemMessage('[기본정보 확인]\n기본정보를 확인했습니다. 계약서를 작성해주세요.', 'system-action');
    await advanceStep(3);
  };

  const createContract = async () => {
    await addSystemMessage('[계약서 작성]\n계약서가 작성되었습니다.', 'system-action');
    await addSystemMessage('[계약서 서명 완료]\n계약서가 확인되었습니다. 입금 확인을 요청하세요.', 'system-action');
    await advanceStep(4);
  };

  const requestPayment = async () => {
    await addSystemMessage('[입금 확인 요청]\n입금 확인을 요청했습니다.', 'system-action');
  };

  const confirmPayment = async () => {
    await addSystemMessage('[입금 확인]\n입금을 확인했습니다.', 'system-action');
    await addSystemMessage('[입금 확인]\n입금이 확인되었습니다. 배송정보를 요청하세요.', 'system-action');
    await advanceStep(5);
  };

  const requestDelivery = async () => {
    await addSystemMessage('[배송정보 요청]\n배송정보를 요청했습니다. 판매자의 입력을 기다려주세요.', 'system-action');
  };

  const submitDelivery = async () => {
    await addSystemMessage('[배송정보 입력]\n배송정보가 입력되었습니다.\n기타: 알려준 가상계좌로', 'system-action');
  };

  const completeTrade = async () => {
    await addSystemMessage('[배송 완료 및 거래 완료]\n판매자가 배송정보를 입력했습니다. 수령을 확인하고 거래를 완료해주세요.', 'system-action');
    await advanceStep(6, '거래완료');
  };

  const getStepAction = () => {
    switch (currentStep) {
      case 1:
        return (
          <button onClick={() => setShowQuoteForm(true)} className="btn-primary w-full h-10">
            <FileText size={16} /> 견적 제안
          </button>
        );
      case 2:
        return (
          <div className="space-y-2">
            <button onClick={submitBasicInfo} className="btn-secondary w-full h-10">기본정보 제출</button>
            <button onClick={confirmBasicInfo} className="btn-primary w-full h-10">기본정보 확인 완료</button>
          </div>
        );
      case 3:
        return (
          <button onClick={createContract} className="btn-primary w-full h-10">
            <FileText size={16} /> 계약서 작성
          </button>
        );
      case 4:
        return (
          <div className="space-y-2">
            <button onClick={requestPayment} className="btn-secondary w-full h-10">
              <CreditCard size={16} /> 입금 확인 요청
            </button>
            <button onClick={confirmPayment} className="btn-primary w-full h-10">입금 확인 완료</button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-2">
            <button onClick={requestDelivery} className="btn-secondary w-full h-10">
              <Truck size={16} /> 배송정보 요청
            </button>
            <button onClick={submitDelivery} className="btn-secondary w-full h-10">배송정보 입력</button>
            <button onClick={completeTrade} className="btn-primary w-full h-10">
              <CheckCircle2 size={16} /> 배송 완료 및 거래 완료
            </button>
          </div>
        );
      case 6:
        return (
          <div className="text-center py-3 text-zinc-900 font-medium text-[13px]">
            <CheckCircle2 size={24} className="mx-auto mb-1" />
            거래가 완료되었습니다
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-[640px] mx-auto px-5 py-12 text-center">
        <p className="text-zinc-400 text-[13px]">불러오는 중...</p>
      </div>
    );
  }

  if (error || !chat) {
    return (
      <div className="max-w-[640px] mx-auto px-5 py-12 text-center">
        <p className="text-zinc-500 text-[13px]">{error || '채팅을 찾을 수 없습니다.'}</p>
        <Link href="/chat" className="text-zinc-900 text-[13px] mt-4 inline-block underline">목록으로</Link>
      </div>
    );
  }

  const isBuyer = chat.buyer_id === user?.id;
  const partner = isBuyer ? chat.seller : chat.buyer;
  const partnerType = isBuyer ? '판매' : '구매';
  const postTitle = chat.post?.title ?? '삭제된 게시글';

  const partnerInfo = partner ? {
    name: partner.name,
    type: partner.type === 'business' ? '프리미엄 업체' : '일반 회원',
    joinDate: new Date(partner.created_at).toLocaleDateString('ko-KR'),
    tradeCompleted: 0,
    tradeOngoing: 0,
    tradeDelayed: 0,
  } : null;

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  };

  return (
    <div className="max-w-[640px] mx-auto flex flex-col h-[calc(100vh-64px-56px)] md:h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/chat" className="text-zinc-400 hover:text-zinc-600">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowUserInfo(true)} className="font-medium text-[13px] hover:text-zinc-600">
                  {partner?.name ?? '알 수 없음'}
                </button>
                <span className={`badge ${
                  partnerType === '판매' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {partnerType}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">{postTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Bar */}
      <div className="bg-white border-b border-zinc-200">
        <TradeStepBar currentStep={currentStep} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-zinc-50 px-4 py-4 space-y-3">
        {messages.map((msg) => {
          if (msg.type === 'notice') {
            return (
              <div key={msg.id} className="card bg-amber-50 border-amber-200 p-3 text-[11px] text-amber-800 leading-relaxed">
                {msg.content}
              </div>
            );
          }
          if (msg.type === 'system-action') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="card bg-zinc-50 px-4 py-2.5 text-[11px] text-zinc-600 max-w-[80%] text-center whitespace-pre-line">
                  {msg.content}
                </div>
              </div>
            );
          }
          if (msg.type === 'quote') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="card border-blue-200 p-4 text-[13px] max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 font-semibold flex items-center gap-1"><Heart size={16} className="fill-blue-600" /> 견적을 제안했습니다</span>
                  </div>
                  {msg.data && (
                    <div className="text-[11px] space-y-1 text-zinc-600">
                      <p>수량: {String(msg.data.quantity)}건</p>
                      <p>구매금액: {Number(msg.data.pricePerUnit).toLocaleString()}원</p>
                      <p>상품권 금액: {Number(msg.data.faceValuePerUnit).toLocaleString()}원</p>
                      <p>할인율: {String(msg.data.discount)}%</p>
                      <p>발송: {String(msg.data.deliveryDate)}</p>
                    </div>
                  )}
                  {currentStep === 1 && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={acceptQuote} className="btn-primary flex-1 h-8 text-[11px]">수락</button>
                      <button className="btn-secondary flex-1 h-8 text-[11px]">거절</button>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          const isMe = msg.sender_id === user?.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${isMe ? 'order-2' : ''}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-[13px] ${
                  isMe
                    ? 'bg-zinc-900 text-white rounded-tr-sm'
                    : 'bg-white text-zinc-800 rounded-tl-sm border border-zinc-200'
                }`}>
                  {msg.content}
                </div>
                <p className={`text-[11px] text-zinc-400 mt-1 ${isMe ? 'text-right' : ''}`}>{formatTime(msg.created_at)}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <QuoteForm onSubmit={handleQuoteSubmit} onClose={() => setShowQuoteForm(false)} />
          </div>
        </div>
      )}

      {/* Step Action */}
      <div className="bg-white border-t border-zinc-200 px-5 py-3">
        {getStepAction()}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-zinc-200 px-5 py-3">
        <div className="flex items-center gap-2">
          <button className="text-zinc-400 hover:text-zinc-600 shrink-0">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="메시지를 입력하세요"
            className="input flex-1 rounded-full"
          />
          <button
            onClick={handleSendMessage}
            className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:bg-zinc-800 shrink-0 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* User Info Popup */}
      {showUserInfo && partnerInfo && (
        <UserInfoPopup
          user={partnerInfo}
          onClose={() => setShowUserInfo(false)}
        />
      )}
    </div>
  );
}
