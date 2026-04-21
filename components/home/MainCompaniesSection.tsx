'use client';

import Link from 'next/link';
import { ChevronRight, Phone, User, HelpCircle } from 'lucide-react';
import CompanyCard from './CompanyCard';
import type { DBPremiumBuyer } from '@/lib/types';

interface Props {
  buyers: DBPremiumBuyer[];
  loading?: boolean;
}

/** 실 데이터가 부족할 때 채우는 데모 업체 카드 (15개까지) */
const DEMO_COMPANIES = [
  { title: '간편한 비대면 매입', desc: '24시간 상담\n빠르고 안전하게', phone: '010-2158-5161', name: '티켓바이 매입팀', region: '전국' },
  { title: '즉시 입금 매입', desc: '전화 한통 바로 매입\n간편심사 빠른지급', phone: '010-4454-9991', name: '스마트 상품권', region: '전국' },
  { title: '24시 간편 매입', desc: '신용조회 x 등급 무관\n누구나 간편 매입', phone: '010-2158-5161', name: '리얼 상품권', region: '전국' },
  { title: '당일 비대면 매입', desc: '소액에서 1000만원까지\n당일 송금 원칙', phone: '010-6518-8030', name: '24시 프라임', region: '전국' },
  { title: '고객 맞춤 1:1 상담', desc: '부담없는 매입 진행\n친절 상담', phone: '010-9744-4145', name: '24시 안심매입', region: '전국' },
  { title: '쉽고 빠른 ARS 매입', desc: '말 한마디 없는 매입\n원하시는 금액만 터치', phone: '1588-1278', name: '한국상품권몰', region: '전국' },
  { title: '쉬운 매입 친절 상담', desc: '월 1회 납부 없이\n빠르고 안전하게', phone: '010-5329-7561', name: '365 퍼스트', region: '전국' },
  { title: '힘드셨죠 전화주세요', desc: '당일승인 신용조회X\n최대한도 맞춤 매입', phone: '010-8110-7378', name: '24시 믿음상품권', region: '전국' },
  { title: '24시 비대면 전문', desc: '비대면 당일 매입\n수수료 선입금 없음', phone: '010-9732-8319', name: '24시 정안상품권', region: '전국' },
  { title: '비대면 당일 신속매입', desc: '법정 수수료 내 매입\n신용조회x선입금x', phone: '010-9791-9114', name: '페어프라임', region: '전국' },
  { title: '24시 전직 당일 매입', desc: '전국 24시 비대면\n쉽고 빠른 간편진행', phone: '010-8241-0821', name: '365 프라임', region: '전국' },
  { title: '시간 낭비는 이제 그만', desc: '맞춤상담으로 매입 신속히\n결제는 최대한 천천히', phone: '010-5917-1355', name: '24시 서민안심', region: '전국' },
  { title: '간편한 비대면 월매출', desc: '개인맞춤형 매입실행\n분할결제 당일입금 OK', phone: '010-2611-3027', name: '미소지움', region: '전국' },
  { title: '당장 급하시면', desc: '빠른 승인 간단 서류\n친절하게 모시겠습니다', phone: '010-5329-7561', name: '365 더퍼스트', region: '전국' },
  { title: '신속 당일 즉시', desc: '당일 승인 원칙\n정직하게 신속하게', phone: '010-5351-8287', name: '뉴스타트', region: '전국' },
];

function DemoCard({ item, index }: { item: typeof DEMO_COMPANIES[number]; index: number }) {
  const bgs = [
    'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
    'linear-gradient(135deg, #5A6F8C 0%, #2C3E50 100%)',
    'linear-gradient(135deg, #4B5563 0%, #1F2937 100%)',
    'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
    'linear-gradient(135deg, #475569 0%, #1E293B 100%)',
    'linear-gradient(135deg, #52525B 0%, #27272A 100%)',
    'linear-gradient(135deg, #57534E 0%, #292524 100%)',
  ];
  const bg = bgs[index % bgs.length];

  return (
    <Link href="/register-business" className="company-card card-hover block group">
      <div className="relative h-[150px] md:h-[160px] overflow-hidden" style={{ background: bg }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)'
        }} />
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <h3 className="text-white text-[15px] md:text-[16px] font-bold text-center leading-tight drop-shadow-md">
            {item.title}
          </h3>
        </div>
      </div>
      <div className="px-3 pt-3.5 pb-2.5">
        <p className="text-[12.5px] text-gray-600 leading-relaxed text-center line-clamp-2 min-h-[40px] whitespace-pre-line">
          {item.desc}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[14px] md:text-[15px] font-bold text-gray-900 whitespace-nowrap">
          <Phone size={14} className="text-gray-500 shrink-0" />
          <span className="tabular-nums whitespace-nowrap">{item.phone}</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-3 py-2 border-t border-gray-100 text-[11px]">
        <span className="text-accent font-bold flex items-center gap-1 truncate">
          <User size={10} className="shrink-0" />
          <span className="truncate">{item.name}</span>
        </span>
        <span className="text-gray-500 shrink-0 ml-2">{item.region}</span>
      </div>
    </Link>
  );
}

export default function MainCompaniesSection({ buyers, loading }: Props) {
  const realCount = buyers.length;
  const fillCount = Math.max(0, 15 - realCount);
  const fillItems = DEMO_COMPANIES.slice(0, fillCount);

  return (
    <section className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-[11px] text-gray-400">* 배너위치는 실시간으로 랜덤 배치됩니다.</p>
        </div>
        <h2 className="text-[17px] font-bold text-gray-800 absolute left-1/2 -translate-x-1/2 hidden md:block">
          메인 등록업체
        </h2>
        <Link href="/advertising" className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-accent border border-gray-200 px-2 py-1 rounded-sm">
          광고문의 <HelpCircle size={10} />
        </Link>
      </div>
      <h2 className="text-[17px] font-bold text-gray-800 text-center mb-3 md:hidden">메인 등록업체</h2>

      {loading ? (
        <div className="py-16 text-center text-gray-400 text-[13px]">불러오는 중...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {buyers.slice(0, 15).map((b, i) => (
            <CompanyCard key={b.id} company={b} isNew={i < 3} fallbackIndex={i} />
          ))}
          {fillItems.map((item, i) => (
            <DemoCard key={`demo-${i}`} item={item} index={realCount + i} />
          ))}
        </div>
      )}

      {realCount === 0 && (
        <p className="text-center text-[11px] text-gray-400 mt-3">
          샘플 카드가 표시됩니다. <Link href="/register-business" className="text-accent font-bold hover:underline">업체 등록하기 →</Link>
        </p>
      )}
    </section>
  );
}
