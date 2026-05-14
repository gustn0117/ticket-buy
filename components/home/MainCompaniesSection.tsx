'use client';

import Link from 'next/link';
import { Phone, User, MessageSquare } from 'lucide-react';
import { useMemo } from 'react';
import CompanyCard from './CompanyCard';
import type { DBPremiumBuyer } from '@/lib/types';
import { pickFallbackPhoto } from '@/lib/fallbackPhotos';

const SMS_BODY = '티켓바이 보고 연락드립니다.';
const stripPhone = (p: string) => p.replace(/[^0-9+]/g, '');

interface Props {
  buyers: DBPremiumBuyer[];
  loading?: boolean;
  /** 옆에 다른 위젯과 함께 배치될 때 줄임 */
  compact?: boolean;
  /** 표시할 카드 개수 (기본 15) */
  maxCount?: number;
}

/** 샘플 카드 (DB가 비어있을 때 메인 등록업체 영역을 채우는 데모 데이터) */
const DEMO_COMPANIES = [
  { title: '간편한 비대면 매입', desc: '24시간 상담\n빠르고 안전하게', phone: '010-2158-5161', name: '티켓바이 매입팀', region: '전국' },
  { title: '즉시 입금 매입', desc: '전화 한통 바로 매입\n간편심사 빠른지급', phone: '010-4454-9991', name: '스마트 상품권', region: '전국' },
  { title: '24시 간편 매입', desc: '신용조회 X 등급 무관\n누구나 간편 매입', phone: '010-2158-5161', name: '리얼 상품권', region: '전국' },
  { title: '당일 비대면 매입', desc: '소액에서 1000만원까지\n당일 송금 원칙', phone: '010-6518-8030', name: '24시 프라임', region: '전국' },
  { title: '고객 맞춤 1:1 상담', desc: '부담없는 매입 진행\n친절 상담', phone: '010-9744-4145', name: '24시 안심매입', region: '전국' },
  { title: '쉽고 빠른 ARS 매입', desc: '말 한마디 없는 매입\n원하는 금액만 터치', phone: '1588-1278', name: '한국상품권몰', region: '전국' },
  { title: '쉬운 매입 친절 상담', desc: '월 1회 정산 없이\n빠르고 안전하게', phone: '010-5329-7561', name: '365 퍼스트', region: '전국' },
  { title: '힘드셨죠 전화주세요', desc: '당일승인 신용조회X\n최대한도 맞춤 매입', phone: '010-8110-7378', name: '24시 믿음상품권', region: '전국' },
  { title: '24시 비대면 전문', desc: '비대면 당일 매입\n수수료 선입금 없음', phone: '010-9732-8319', name: '24시 정안상품권', region: '전국' },
  { title: '비대면 당일 신속매입', desc: '법정 수수료 내 매입\n신용조회X 선입금X', phone: '010-9791-9114', name: '페어프라임', region: '전국' },
  { title: '24시 정직 당일 매입', desc: '전국 24시 비대면\n쉽고 빠른 간편진행', phone: '010-8241-0821', name: '365 프라임', region: '전국' },
  { title: '시간 낭비는 이제 그만', desc: '맞춤상담으로 매입 신속히\n결제는 최대한 천천히', phone: '010-5917-1355', name: '24시 서민안심', region: '전국' },
  { title: '간편한 비대면 월정산', desc: '개인맞춤형 매입실행\n분할결제 당일입금 OK', phone: '010-2611-3027', name: '미소지움', region: '전국' },
  { title: '당장 급하시면', desc: '빠른 승인 간단 서류\n친절하게 모시겠습니다', phone: '010-5329-7561', name: '365 더퍼스트', region: '전국' },
  { title: '신속 당일 즉시', desc: '당일 승인 원칙\n정직하게 신속하게', phone: '010-5351-8287', name: '뉴스타트', region: '전국' },
];

/** Fisher-Yates 셔플 — 새로고침마다 카드 위치 100% 랜덤 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function DemoCard({ item, index }: { item: typeof DEMO_COMPANIES[number]; index: number }) {
  const fallbackPhoto = pickFallbackPhoto(`demo-${index}-${item.title}`);
  const phoneDigits = stripPhone(item.phone);

  return (
    <div className="company-card card-hover group flex flex-col">
      <Link href="/register-business" className="block">
        <div className="relative h-[75px] md:h-[130px] overflow-hidden bg-gray-800">
          <img
            src={fallbackPhoto}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />
          <div className="absolute inset-0 flex items-center justify-center px-3">
            <h3 className="text-white text-[13px] md:text-[17px] font-bold text-center leading-tight drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </div>
        <div className="px-2.5 md:px-4 pt-2 md:pt-3 pb-0">
          <p className="text-[12px] md:text-[13px] text-gray-600 leading-tight text-center line-clamp-2 min-h-[28px] md:min-h-[34px] whitespace-pre-line">
            {item.desc}
          </p>
        </div>
        <div className="mx-2.5 md:mx-4 my-2 md:my-2.5 border-t border-gray-200" />
        <div className="flex items-center justify-center gap-1 md:gap-1.5 px-1 md:px-2 pb-2 md:pb-2.5 text-[12.5px] md:text-[14px] xl:text-[15px] font-bold text-gray-900 whitespace-nowrap tracking-tighter">
          <Phone size={11} className="text-gray-500 shrink-0 md:hidden" />
          <Phone size={12} className="text-gray-500 shrink-0 hidden md:inline" />
          <span className="tabular-nums whitespace-nowrap">{item.phone}</span>
        </div>
        <div className="flex justify-between items-center px-3 py-2 border-t border-gray-100 text-[11px]">
          <span className="text-accent font-bold flex items-center gap-1 truncate">
            <User size={10} className="shrink-0" />
            <span className="truncate">{item.name}</span>
          </span>
          <span className="text-gray-500 shrink-0 ml-2">{item.region}</span>
        </div>
      </Link>

      {/* 모바일 전용: 통화하기 / 문자하기 */}
      <div className="grid grid-cols-2 border-t border-gray-100 md:hidden">
        <a
          href={`tel:${phoneDigits}`}
          className="flex items-center justify-center gap-1.5 py-2.5 text-[12.5px] font-bold text-accent bg-white hover:bg-accent-bg transition-colors whitespace-nowrap border-r border-gray-100"
          aria-label={`${item.name} 통화하기`}
        >
          <Phone size={13} /> 통화하기
        </a>
        <a
          href={`sms:${phoneDigits}?&body=${encodeURIComponent(SMS_BODY)}`}
          className="flex items-center justify-center gap-1.5 py-2.5 text-[12.5px] font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap"
          aria-label={`${item.name} 문자하기`}
        >
          <MessageSquare size={13} /> 문자하기
        </a>
      </div>
    </div>
  );
}

export default function MainCompaniesSection({ buyers, loading, compact = false, maxCount = 15 }: Props) {
  // 새로고침마다 위치 랜덤 — 광고 형평성을 위해 priority 적용 후 셔플
  const items = useMemo(() => shuffle(buyers.slice(0, maxCount)), [buyers, maxCount]);
  const realCount = items.length;
  const fillCount = Math.max(0, maxCount - realCount);
  const fillItems = useMemo(() => shuffle(DEMO_COMPANIES).slice(0, fillCount), [fillCount]);

  // PC 한 줄 5개, 그 위는 모바일 2개 / 태블릿 3개 / 노트북 4개로 단계 전개
  // 모바일은 여백 최소화 (대출나라 모바일과 동일)
  const gridCls = compact
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1.5 md:gap-3'
    : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 md:gap-3';

  return (
    <section className={compact ? '' : 'mb-6'}>
      {/* 헤더 — '배너위치 실시간 안내문' + '광고문의' 버튼 삭제 */}
      <div className="text-center mb-3">
        <h2 className="text-[15px] md:text-[17px] font-bold text-gray-800">메인 등록업체</h2>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-400 text-[13px]">불러오는 중...</div>
      ) : (
        <div className={gridCls}>
          {items.map((b, i) => (
            <CompanyCard key={b.id} company={b} isNew={i < 3} fallbackIndex={i} />
          ))}
          {fillItems.map((item, i) => (
            <DemoCard key={`demo-${i}-${item.title}`} item={item} index={realCount + i} />
          ))}
        </div>
      )}
    </section>
  );
}
