'use client';

import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, BarChart3, Users, Eye, Zap, Shield, Clock } from 'lucide-react';

const adProducts = [
  {
    id: 'hero_banner',
    name: '메인 히어로 배너',
    size: '1140 x 200 px',
    position: '메인 페이지 최상단',
    desc: '사이트 방문 시 가장 먼저 보이는 프리미엄 위치. 전체 사용자의 100%가 노출됩니다.',
    price: '500,000',
    unit: '월',
    popular: true,
    features: ['최대 노출량', '전체 유저 도달', '브랜드 인지도 극대화'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="32" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="12" width="14" height="3" rx="1" fill="currentColor" opacity="0.2"/><rect x="8" y="17" width="20" height="2" rx="1" fill="currentColor" opacity="0.1"/><rect x="8" y="21" width="8" height="2" rx="1" fill="currentColor" opacity="0.15"/><circle cx="30" cy="17" r="4" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1"/></svg>,
  },
  {
    id: 'main_top',
    name: '메인 상단 배너',
    size: '1140 x 90 px',
    position: '메인 히어로 배너 아래',
    desc: '게시글 목록 바로 위에 위치하여 상품 탐색 전 자연스럽게 노출됩니다.',
    price: '300,000',
    unit: '월',
    popular: false,
    features: ['높은 클릭률', '자연스러운 노출', '게시글 탐색 유도'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="9" width="12" height="2" rx="1" fill="currentColor" opacity="0.2"/><rect x="4" y="18" width="32" height="3" rx="1" fill="currentColor" opacity="0.06"/><rect x="4" y="23" width="32" height="3" rx="1" fill="currentColor" opacity="0.06"/><rect x="4" y="28" width="32" height="3" rx="1" fill="currentColor" opacity="0.06"/><rect x="4" y="33" width="32" height="3" rx="1" fill="currentColor" opacity="0.06"/></svg>,
  },
  {
    id: 'board_top',
    name: '게시판 상단 배너',
    size: '960 x 90 px',
    position: '삽니다/팝니다 게시판 상단',
    desc: '거래글을 적극적으로 탐색하는 유저에게 직접 노출. 거래 의향이 높은 타겟층입니다.',
    price: '250,000',
    unit: '월',
    popular: false,
    features: ['구매 의향 높은 유저', '게시판 진입 시 노출', '타겟 마케팅'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="4" width="28" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="7" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.2"/><path d="M6 15h28M6 21h28M6 27h28M6 33h28" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/><rect x="6" y="14" width="28" height="4" rx="1" fill="currentColor" opacity="0.04"/><rect x="6" y="20" width="28" height="4" rx="1" fill="currentColor" opacity="0.04"/></svg>,
  },
  {
    id: 'detail_bottom',
    name: '게시글 상세 하단',
    size: '740 x 90 px',
    position: '개별 게시글 하단',
    desc: '상품 상세 정보를 확인한 유저에게 노출. 구매 결정 직전 단계의 고효율 광고입니다.',
    price: '200,000',
    unit: '월',
    popular: false,
    features: ['구매 결정 단계 노출', '높은 전환율', '상세 페이지 독점'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="4" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="8" width="14" height="2" rx="1" fill="currentColor" opacity="0.15"/><rect x="10" y="12" width="20" height="1.5" rx="0.75" fill="currentColor" opacity="0.08"/><rect x="10" y="15" width="20" height="1.5" rx="0.75" fill="currentColor" opacity="0.08"/><rect x="10" y="20" width="20" height="4" rx="1" fill="currentColor" opacity="0.06"/><rect x="6" y="31" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/></svg>,
  },
  {
    id: 'footer_banner',
    name: '푸터 상단 배너',
    size: '1140 x 80 px',
    position: '페이지 하단 푸터 위',
    desc: '모든 페이지 하단에 지속적으로 노출. 반복 인지를 통한 브랜드 각인 효과가 탁월합니다.',
    price: '150,000',
    unit: '월',
    popular: false,
    features: ['전 페이지 노출', '반복 인지 효과', '합리적 가격'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="20" rx="2" fill="currentColor" opacity="0.03" stroke="currentColor" strokeWidth="0.5"/><rect x="8" y="8" width="8" height="1.5" rx="0.75" fill="currentColor" opacity="0.1"/><rect x="8" y="11" width="14" height="1" rx="0.5" fill="currentColor" opacity="0.06"/><rect x="4" y="28" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="31" width="12" height="2" rx="1" fill="currentColor" opacity="0.2"/></svg>,
  },
  {
    id: 'popup',
    name: '팝업 광고',
    size: '400 x 500 px',
    position: '사이트 접속 시 화면 중앙',
    desc: '신규 방문자에게 강제 노출되는 풀스크린 팝업. 이벤트, 프로모션에 최적화되어 있습니다.',
    price: '400,000',
    unit: '월',
    popular: false,
    features: ['강제 노출', '이벤트/프로모션', '고주목도'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="24" height="32" rx="3" stroke="currentColor" strokeWidth="1.5"/><rect x="12" y="8" width="16" height="10" rx="2" fill="currentColor" opacity="0.06"/><rect x="12" y="21" width="10" height="2" rx="1" fill="currentColor" opacity="0.12"/><rect x="12" y="25" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.06"/><rect x="12" y="28" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.06"/><line x1="28" y1="7" x2="30" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="30" y1="7" x2="28" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    id: 'premium_buyer',
    name: '프리미엄 구매 업체',
    size: '카드형',
    position: '메인 / 게시판 삽니다 탭',
    desc: '구매 업체 전용 프리미엄 카드 노출. 등급(프리미엄/스탠다드/베이직)별 차등 노출됩니다.',
    price: '100,000',
    unit: '월~',
    popular: true,
    features: ['등급별 노출 우선순위', '전용 상세 페이지', '연락처 직접 노출'],
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="22" y="6" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="7" y="10" width="8" height="2" rx="1" fill="currentColor" opacity="0.15"/><rect x="25" y="10" width="8" height="2" rx="1" fill="currentColor" opacity="0.15"/><rect x="7" y="14" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0.08"/><rect x="25" y="14" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0.08"/><rect x="7" y="17" width="8" height="3" rx="1" fill="currentColor" opacity="0.1"/><rect x="25" y="17" width="8" height="3" rx="1" fill="currentColor" opacity="0.1"/><path d="M13 26l7 6 7-6" stroke="currentColor" strokeWidth="1" opacity="0.2"/><circle cx="20" cy="32" r="3" stroke="currentColor" strokeWidth="1" opacity="0.2"/></svg>,
  },
];

const stats = [
  { icon: Users, label: '월 평균 방문자', value: '10,000+', sub: 'UV 기준' },
  { icon: Eye, label: '월 페이지뷰', value: '50,000+', sub: '전체 페이지 합산' },
  { icon: BarChart3, label: '평균 체류시간', value: '4분 30초', sub: '세션 기준' },
  { icon: Zap, label: '평균 CTR', value: '2.8%', sub: '배너 광고 기준' },
];

export default function AdvertisingPage() {
  return (
    <div className="max-w-[960px] mx-auto px-5 py-8">
      {/* Hero */}
      <div className="bg-zinc-900 rounded-lg px-8 py-12 mb-8 text-center">
        <p className="text-zinc-500 text-[12px] tracking-wider uppercase mb-3">Advertising</p>
        <h1 className="text-white text-[24px] md:text-[32px] font-semibold mb-3 leading-tight">티켓바이 광고 안내</h1>
        <p className="text-zinc-400 text-[14px] max-w-lg mx-auto leading-relaxed mb-6">
          상품권 거래에 특화된 타겟 유저에게 직접 도달하세요.<br className="hidden md:block" />
          위치별 맞춤 광고로 최대 효율을 경험하실 수 있습니다.
        </p>
        <Link href="/register-business" className="btn-primary inline-flex h-10 px-6 text-[13px]">
          광고 문의하기 <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {stats.map(s => (
          <div key={s.label} className="card p-4 text-center">
            <s.icon size={18} className="mx-auto mb-2 text-zinc-400" />
            <p className="text-[18px] font-semibold text-zinc-900">{s.value}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">{s.label}</p>
            <p className="text-[10px] text-zinc-300">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-[20px] font-semibold text-zinc-900 mb-2">광고 상품 안내</h2>
        <p className="text-[13px] text-zinc-500">위치와 예산에 맞는 광고 상품을 선택하세요.</p>
      </div>

      {/* Products */}
      <div className="space-y-4 mb-10">
        {adProducts.map(p => (
          <div key={p.id} className={`card overflow-hidden ${p.popular ? 'border-zinc-900' : ''}`}>
            {p.popular && (
              <div className="bg-zinc-900 text-white text-[10px] font-medium text-center py-1 tracking-wider uppercase">인기 상품</div>
            )}
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                {/* Icon */}
                <div className="w-16 h-16 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                  {p.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-[15px] font-semibold text-zinc-900">{p.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge bg-zinc-100 text-zinc-500">{p.size}</span>
                        <span className="badge bg-zinc-100 text-zinc-500">{p.position}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[20px] font-semibold text-zinc-900">{p.price}<span className="text-[12px] font-normal text-zinc-400">원</span></p>
                      <p className="text-[11px] text-zinc-400">/ {p.unit}</p>
                    </div>
                  </div>

                  <p className="text-[13px] text-zinc-500 leading-relaxed mb-3">{p.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {p.features.map(f => (
                      <span key={f} className="flex items-center gap-1 text-[11px] text-zinc-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" opacity="0.3"/><path d="M4 6l1.5 1.5L8 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="mb-10">
        <h2 className="text-[18px] font-semibold text-zinc-900 mb-4 text-center">광고주 혜택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="card p-5 text-center">
            <Shield size={20} className="mx-auto mb-3 text-zinc-400" />
            <h4 className="text-[13px] font-semibold mb-1">안전한 플랫폼</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">계약서 기반 거래 시스템으로 신뢰도 높은 사용자층이 형성되어 있습니다.</p>
          </div>
          <div className="card p-5 text-center">
            <BarChart3 size={20} className="mx-auto mb-3 text-zinc-400" />
            <h4 className="text-[13px] font-semibold mb-1">실시간 성과 리포트</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">노출수, 클릭수, CTR 등 광고 성과를 실시간으로 확인하실 수 있습니다.</p>
          </div>
          <div className="card p-5 text-center">
            <Clock size={20} className="mx-auto mb-3 text-zinc-400" />
            <h4 className="text-[13px] font-semibold mb-1">유연한 계약 기간</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">월 단위 계약으로 부담 없이 시작하고, 성과에 따라 연장할 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="card bg-zinc-50 p-8 text-center">
        <h3 className="text-[16px] font-semibold mb-2">광고 집행이 필요하신가요?</h3>
        <p className="text-[13px] text-zinc-500 mb-5 max-w-md mx-auto">
          담당자가 24시간 내 연락드리겠습니다. 맞춤 견적 및 패키지 할인도 가능합니다.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/register-business" className="btn-primary h-10 px-6 text-[13px]">
            문의하기 <ArrowRight size={14} />
          </Link>
          <a href="tel:1234-5678" className="btn-secondary h-10 px-6 text-[13px]">
            <Smartphone size={14} /> 1234-5678
          </a>
        </div>
      </div>
    </div>
  );
}
