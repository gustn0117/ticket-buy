'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, MapPin, FileText, Building2, Megaphone, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getPosts } from '@/lib/api';
import { addRecentBuyer } from '@/lib/recentBuyers';
import SellPostItem from '@/components/home/SellPostItem';
import type { DBPremiumBuyer, DBPost, DBUser } from '@/lib/types';

type PostWithAuthor = DBPost & { author: DBUser };
const SMS_BODY = '티켓바이 보고 연락드립니다.';
const stripPhone = (p: string) => p.replace(/[^0-9+]/g, '');

export default function BuyerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [buyer, setBuyer] = useState<DBPremiumBuyer | null>(null);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      supabase.from('premium_buyers').select('*').eq('id', id).single(),
      getPosts('buy'),
    ])
      .then(([{ data: b }, allPosts]) => {
        const buyerData = b as DBPremiumBuyer | null;
        setBuyer(buyerData);
        if (buyerData) {
          addRecentBuyer({
            id: buyerData.id,
            name: buyerData.name,
            region: buyerData.region,
            image_url: buyerData.image_url,
          });
        }
        if (buyerData?.user_id) {
          setPosts(allPosts.filter((p) => p.author_id === buyerData.user_id));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-[740px] mx-auto px-5 py-20 text-center text-zinc-400 text-[13px]">불러오는 중...</div>;
  }

  if (!buyer) {
    return (
      <div className="max-w-[740px] mx-auto px-5 py-20 text-center">
        <p className="text-zinc-400 text-[13px] mb-4">업체를 찾을 수 없습니다.</p>
        <Link href="/" className="text-[13px] text-zinc-900 underline">홈으로</Link>
      </div>
    );
  }

  const phoneDigits = stripPhone(buyer.phone || '');

  return (
    <div className="max-w-[740px] mx-auto px-5 py-6 pb-24 md:pb-6">
      <Link href="/" className="inline-flex items-center gap-1 text-[13px] text-zinc-400 hover:text-zinc-700 mb-4 transition-colors">
        <ArrowLeft size={15} /> 돌아가기
      </Link>

      {/* 히어로 — 헤드라인/사진 */}
      <div className="card overflow-hidden mb-5">
        {buyer.image_url ? (
          <div className="relative h-[160px] md:h-[200px] bg-gray-800">
            <img src={buyer.image_url} alt={buyer.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
            <div className="absolute inset-x-0 bottom-0 px-5 py-4">
              <span className="inline-block badge bg-white/20 text-white/90 mb-1.5">{buyer.tier === 'premium' ? 'PREMIUM' : buyer.tier === 'basic' ? 'BASIC' : 'STANDARD'}</span>
              <h1 className="text-white text-[19px] md:text-[22px] font-bold">{buyer.name}</h1>
              {buyer.headline && <p className="text-white/90 text-[13px] mt-1">{buyer.headline}</p>}
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 px-5 py-6">
            <span className="badge bg-white/10 text-white/70 mb-2 inline-block">{buyer.tier === 'premium' ? 'PREMIUM' : buyer.tier === 'basic' ? 'BASIC' : 'STANDARD'}</span>
            <h1 className="text-white text-[20px] font-bold mb-1">{buyer.name}</h1>
            {buyer.headline && <p className="text-zinc-300 text-[13px]">{buyer.headline}</p>}
          </div>
        )}

        {buyer.description && (
          <div className="px-5 py-4 border-b border-zinc-100">
            <p className="text-[13px] text-zinc-700 leading-relaxed whitespace-pre-line">{buyer.description}</p>
          </div>
        )}
      </div>

      {/* 업체정보 */}
      <section className="card overflow-hidden mb-5">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-200 bg-zinc-50">
          <Building2 size={14} className="text-accent" />
          <h2 className="text-[13px] font-bold text-zinc-800">업체정보</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          <Row icon={<FileText size={13} />} label="사업자등록번호" value={buyer.business_number} />
          <Row icon={<Building2 size={13} />} label="통신판매업신고번호" value={buyer.telecom_number} />
          <Row icon={<MapPin size={13} />} label="영업소" value={buyer.office_address} />
          <Row icon={<MapPin size={13} />} label="활동지역" value={buyer.region} />
          {buyer.brands && buyer.brands.length > 0 && (
            <div className="px-5 py-3">
              <p className="text-[11px] text-zinc-400 mb-1.5">취급 브랜드</p>
              <div className="flex flex-wrap gap-1.5">
                {buyer.brands.map((b) => (
                  <span key={b} className="badge bg-zinc-100 text-zinc-700 text-[11px]">{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 안내 + 통화 (PC) */}
        <div className="px-5 py-4 border-t border-zinc-100 bg-accent-bg">
          <p className="flex items-center gap-1.5 text-[12px] text-accent font-bold mb-2">
            <Megaphone size={13} />
            티켓바이를 보고 연락드렸다고 하시면 보다 상담이 쉬워집니다.
          </p>
          {buyer.phone && (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500">연락처</span>
                <span className="text-[14px] font-bold text-zinc-900 tabular-nums whitespace-nowrap">{buyer.phone}</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <a href={`tel:${phoneDigits}`} className="btn-accent h-9 px-4 text-[12.5px]">
                  <Phone size={13} /> 통화하기
                </a>
                <a href={`sms:${phoneDigits}?&body=${encodeURIComponent(SMS_BODY)}`} className="btn-secondary h-9 px-4 text-[12.5px]">
                  <MessageSquare size={13} /> 문자하기
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 부가설명 */}
      {buyer.supplementary_info && buyer.supplementary_info.trim() && (
        <section className="card overflow-hidden mb-5">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-200 bg-zinc-50">
            <FileText size={14} className="text-accent" />
            <h2 className="text-[13px] font-bold text-zinc-800">부가설명</h2>
          </div>
          <div className="px-5 py-4 text-[13px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
            {buyer.supplementary_info}
          </div>
          <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 text-[11px] text-zinc-500">
            ☎ 티켓바이를 보고 연락드렸다고 말씀해주세요.
          </div>
        </section>
      )}

      {/* 업체 구매글 */}
      {posts.length > 0 && (
        <section>
          <h2 className="section-title">{buyer.name}의 구매글</h2>
          <div className="card overflow-hidden">
            {posts.map((post) => (
              <SellPostItem key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 모바일 하단 고정: 업체명/연락처/통화 */}
      {buyer.phone && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-lg">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-[11px] text-gray-500 truncate">{buyer.name}</p>
              <p className="text-[14px] font-bold text-gray-900 tabular-nums whitespace-nowrap">{buyer.phone}</p>
            </div>
            <a
              href={`sms:${phoneDigits}?&body=${encodeURIComponent(SMS_BODY)}`}
              className="h-10 px-3 inline-flex items-center justify-center gap-1 border border-gray-300 text-gray-700 text-[12.5px] font-bold whitespace-nowrap"
              aria-label={`${buyer.name} 문자하기`}
            >
              <MessageSquare size={13} /> 문자
            </a>
            <a
              href={`tel:${phoneDigits}`}
              className="h-10 px-4 inline-flex items-center justify-center gap-1 bg-accent text-white text-[12.5px] font-bold whitespace-nowrap"
              aria-label={`${buyer.name} 통화하기`}
            >
              <Phone size={13} /> 통화하기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <div className="flex items-center gap-1.5 w-32 shrink-0 text-[12px] text-zinc-500">
        <span className="text-zinc-400">{icon}</span>
        {label}
      </div>
      <div className="text-[13px] text-zinc-800 flex-1 break-words">
        {value && value.trim() ? value : <span className="text-zinc-300">-</span>}
      </div>
    </div>
  );
}
