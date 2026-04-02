'use client';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Paperclip, Send, X, FileText, CreditCard, Truck, CheckCircle2, Heart } from 'lucide-react';
import TradeStepBar from '@/components/chat/TradeStepBar';
import QuoteForm, { QuoteData } from '@/components/chat/QuoteForm';
import UserInfoPopup from '@/components/chat/UserInfoPopup';
import { chatList, users } from '@/data/mock';

interface Message {
  id: number;
  sender: string;
  type: string;
  content: string;
  time: string;
  data?: Record<string, unknown>;
}

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const chat = chatList.find(c => c.id === Number(id));
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'system', type: 'notice', content: '본 플랫폼은 중개 서비스만을 제공하며, 거래 당사자 간 발생하는 법적 분쟁에 대해 책임을 지지 않습니다. 거래 대금의 지급 및 상품권 전달은 판매자와 구매자 간 직접 이루어지며, 사기 피해 시 경찰 사이버수사대(182)에 신고하시기 바랍니다.', time: '2026.03.19 18:20' },
    { id: 2, sender: 'partner', type: 'message', content: '안녕하세요 저 제목으로 판매하시는건가요?', time: '2026.03.19 18:20' },
    { id: 3, sender: 'me', type: 'message', content: '네 맞습니다', time: '2026.03.19 18:28' },
    { id: 4, sender: 'me', type: 'message', content: '잠시만요 다시한번 확인하겠습니다', time: '2026.03.19 18:30' },
  ]);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState(chat?.step || 1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(100);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addSystemMessage = (content: string, type: string = 'system-action', data?: Record<string, unknown>) => {
    msgIdRef.current++;
    const now = new Date();
    const time = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    setMessages(prev => [...prev, { id: msgIdRef.current, sender: 'system', type, content, time, data }]);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    msgIdRef.current++;
    const now = new Date();
    const time = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    setMessages(prev => [...prev, { id: msgIdRef.current, sender: 'me', type: 'message', content: inputText, time }]);
    setInputText('');
  };

  const handleQuoteSubmit = (data: QuoteData) => {
    addSystemMessage('견적을 제안했습니다.', 'quote', data as unknown as Record<string, unknown>);
    setShowQuoteForm(false);
    addSystemMessage('[견적 제안]\n견적을 제안했습니다. 판매자의 응답을 기다려주세요.', 'system-action');
  };

  const acceptQuote = () => {
    addSystemMessage('[견적 수락]\n견적이 수락되었습니다. 기본정보를 요청하세요.', 'system-action');
    setCurrentStep(2);
  };

  const requestBasicInfo = () => {
    addSystemMessage('[기본정보 요청]\n견적이 수락되었습니다. 기본정보를 요청하세요.', 'system-action');
  };

  const submitBasicInfo = () => {
    addSystemMessage('[기본정보 제출]\n기본정보를 제출했습니다.', 'system-action');
    addSystemMessage('[기본정보 확인]\n판매자가 기본정보를 제출했습니다. 채팅에서 확인 또는 재요청해주세요.', 'system-action');
  };

  const confirmBasicInfo = () => {
    addSystemMessage('[기본정보 확인]\n기본정보를 확인했습니다. 계약서를 작성해주세요.', 'system-action');
    setCurrentStep(3);
  };

  const createContract = () => {
    addSystemMessage('[계약서 작성]\n계약서가 작성되었습니다.', 'system-action');
    addSystemMessage('[계약서 서명 완료]\n계약서가 확인되었습니다. 입금 확인을 요청하세요.', 'system-action');
    setCurrentStep(4);
  };

  const requestPayment = () => {
    addSystemMessage('[입금 확인 요청]\n입금 확인을 요청했습니다.', 'system-action');
  };

  const confirmPayment = () => {
    addSystemMessage('[입금 확인]\n입금을 확인했습니다.', 'system-action');
    addSystemMessage('[입금 확인]\n입금이 확인되었습니다. 배송정보를 요청하세요.', 'system-action');
    setCurrentStep(5);
  };

  const requestDelivery = () => {
    addSystemMessage('[배송정보 요청]\n배송정보를 요청했습니다. 판매자의 입력을 기다려주세요.', 'system-action');
  };

  const submitDelivery = () => {
    addSystemMessage('[배송정보 입력]\n배송정보가 입력되었습니다.\n기타: 알려준 가상계좌로', 'system-action');
  };

  const completeTrade = () => {
    addSystemMessage('[배송 완료 및 거래 완료]\n판매자가 배송정보를 입력했습니다. 수령을 확인하고 거래를 완료해주세요.', 'system-action');
    setCurrentStep(6);
  };

  // Step-based action button
  const getStepAction = () => {
    switch (currentStep) {
      case 1:
        return (
          <button
            onClick={() => setShowQuoteForm(true)}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center gap-2"
          >
            <FileText size={18} /> 견적 제안
          </button>
        );
      case 2:
        return (
          <div className="space-y-2">
            <button onClick={submitBasicInfo} className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 flex items-center justify-center gap-2">
              기본정보 제출
            </button>
            <button onClick={confirmBasicInfo} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center gap-2">
              기본정보 확인 완료
            </button>
          </div>
        );
      case 3:
        return (
          <button onClick={createContract} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center gap-2">
            <FileText size={18} /> 계약서 작성
          </button>
        );
      case 4:
        return (
          <div className="space-y-2">
            <button onClick={requestPayment} className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 flex items-center justify-center gap-2">
              <CreditCard size={18} /> 입금 확인 요청
            </button>
            <button onClick={confirmPayment} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center gap-2">
              입금 확인 완료
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-2">
            <button onClick={requestDelivery} className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 flex items-center justify-center gap-2">
              <Truck size={18} /> 배송정보 요청
            </button>
            <button onClick={submitDelivery} className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2">
              배송정보 입력
            </button>
            <button onClick={completeTrade} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> 배송 완료 및 거래 완료
            </button>
          </div>
        );
      case 6:
        return (
          <div className="text-center py-3 text-primary font-medium">
            <CheckCircle2 size={24} className="mx-auto mb-1" />
            거래가 완료되었습니다
          </div>
        );
      default:
        return null;
    }
  };

  if (!chat) {
    return (
      <div className="max-w-[640px] mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">채팅을 찾을 수 없습니다.</p>
        <Link href="/chat" className="text-primary mt-4 inline-block">목록으로</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[640px] mx-auto flex flex-col h-[calc(100vh-64px-56px)] md:h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/chat" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowUserInfo(true)} className="font-bold text-sm hover:text-primary">
                  {chat.partner}
                </button>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  chat.partnerType === '판매' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {chat.partnerType}
                </span>
              </div>
              <p className="text-xs text-gray-500">{chat.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>거래완료 {chat.tradeCompleted}건</span>
            <span>거래중 {chat.tradeOngoing}건</span>
            <span>지연중 {chat.tradeDelayed}건</span>
          </div>
        </div>
      </div>

      {/* Step Bar */}
      <div className="bg-white border-b border-gray-200">
        <TradeStepBar currentStep={currentStep} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-100 px-4 py-4 space-y-3">
        {messages.map((msg) => {
          if (msg.type === 'notice') {
            return (
              <div key={msg.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 leading-relaxed">
                {msg.content}
              </div>
            );
          }
          if (msg.type === 'system-action') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-white border border-green-200 rounded-lg px-4 py-2.5 text-xs text-green-700 max-w-[80%] text-center whitespace-pre-line">
                  {msg.content}
                </div>
              </div>
            );
          }
          if (msg.type === 'quote') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-white border border-primary/30 rounded-lg p-4 text-sm max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold flex items-center gap-1"><Heart size={16} className="fill-primary" /> 견적을 제안했습니다</span>
                  </div>
                  {msg.data && (
                    <div className="text-xs space-y-1 text-gray-600">
                      <p>수량: {String(msg.data.quantity)}건</p>
                      <p>구매금액: {Number(msg.data.pricePerUnit).toLocaleString()}원</p>
                      <p>상품권 금액: {Number(msg.data.faceValuePerUnit).toLocaleString()}원</p>
                      <p>할인율: {String(msg.data.discount)}%</p>
                      <p>발송: {String(msg.data.deliveryDate)}</p>
                    </div>
                  )}
                  {currentStep === 1 && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={acceptQuote} className="flex-1 bg-primary text-white text-xs py-2 rounded hover:bg-primary-dark">수락</button>
                      <button className="flex-1 bg-gray-100 text-gray-500 text-xs py-2 rounded hover:bg-gray-200">거절</button>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          const isMe = msg.sender === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${isMe ? 'order-2' : ''}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                  isMe
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
                <p className={`text-[10px] text-gray-400 mt-1 ${isMe ? 'text-right' : ''}`}>{msg.time}</p>
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
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        {getStepAction()}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600 shrink-0">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="메시지를 입력하세요"
            className="flex-1 h-10 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-primary text-sm"
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* User Info Popup */}
      {showUserInfo && (
        <UserInfoPopup
          user={users.user1}
          onClose={() => setShowUserInfo(false)}
        />
      )}
    </div>
  );
}
