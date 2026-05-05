'use client';

import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import AdBanner from '@/components/ads/AdBanner';

export default function ChatPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="max-w-[640px] mx-auto px-5 py-10">
      {/* AD: 채팅 상단 (320x60) */}
      <AdBanner slot="chat_top" hideEmpty className="mb-6 mx-auto" />

      {!isLoggedIn ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle size={20} className="text-zinc-400" />
          </div>
          <p className="text-[13px] text-zinc-500 mb-4">로그인 후 이용할 수 있습니다.</p>
          <Link href="/login" className="btn-primary inline-flex h-9 px-5 text-[12px]">
            로그인
          </Link>
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle size={20} className="text-zinc-400" />
          </div>
          <p className="text-[14px] font-medium text-zinc-700 mb-2">상담 안내</p>
          <p className="text-[12px] text-zinc-500 leading-relaxed mb-4">
            거래는 게시글 댓글 또는 업체 전화/문자로 진행됩니다.<br />
            궁금한 점은 1:1 문의를 이용해주세요.
          </p>
          <Link href="/contact" className="btn-primary inline-flex h-9 px-5 text-[12px]">
            1:1 문의하기
          </Link>
        </div>
      )}
    </div>
  );
}
