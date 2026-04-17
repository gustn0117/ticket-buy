'use client';

import { useEffect, useState } from 'react';

export default function HeroBanner() {
  const [visitorInfo, setVisitorInfo] = useState({ today: 0, total: 0, totalCompanies: 0 });

  useEffect(() => {
    fetch('/api/visitors')
      .then(r => r.json())
      .then(data => setVisitorInfo({
        today: data.today ?? 473,
        total: data.total ?? 40571676,
        totalCompanies: 11862,
      }))
      .catch(() => setVisitorInfo({ today: 473, total: 40571676, totalCompanies: 11862 }));
  }, []);

  const formatNumber = (n: number) => String(n).split('').map((d, i) => (
    <span key={i} className="inline-flex items-center justify-center w-[16px] h-[20px] bg-gray-800 text-white text-[11px] font-bold rounded-sm">{d}</span>
  ));

  return (
    <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)' }}>
      <div className="container-main py-6 md:py-8 relative z-10">
        <div className="text-center md:text-left">
          <h1 className="text-white text-[18px] md:text-[24px] font-bold mb-1.5">
            전국 최대 규모! 상품권 업체가 모두 한곳에!
          </h1>
          <p className="text-gray-300 text-[11px] md:text-[13px]">
            나에게 맞는 상품권 업체 찾기! 상품권 매입 중개 플랫폼 1위!
          </p>
        </div>
      </div>
      {/* Stats bar - 별도 구간 */}
      <div className="border-t border-white/10 bg-black/30 relative z-10">
        <div className="container-main py-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-gray-300">
            <span className="text-gray-400">현재 기준</span>
            <div className="flex items-center gap-1.5">
              <span>오늘 방문자</span>
              <div className="flex gap-px">{formatNumber(visitorInfo.today)}</div>
              <span>명</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>누적 방문자</span>
              <div className="flex gap-px">{formatNumber(visitorInfo.total)}</div>
              <span>명</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>총 등록업체 수</span>
              <div className="flex gap-px">{formatNumber(visitorInfo.totalCompanies)}</div>
              <span>개</span>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative badge */}
      <div className="hidden lg:block absolute right-[8%] top-[35%] -translate-y-1/2">
        <div className="w-[120px] h-[120px] rounded-full bg-accent/20 flex items-center justify-center">
          <div className="w-[96px] h-[96px] rounded-full bg-accent/30 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[9px] text-gray-200">2014~2026 12년 연속</p>
              <p className="text-[12px] font-bold text-white mt-0.5">등록업체수 1위</p>
              <p className="text-[12px] font-bold text-accent">매입문의수 1위</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
