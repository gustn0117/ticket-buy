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
    <span key={i} className="inline-flex items-center justify-center w-[22px] h-[26px] bg-gray-800 text-white text-[13px] font-bold rounded-sm mx-[1px]">{d}</span>
  ));

  return (
    <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)' }}>
      <div className="container-main py-8 md:py-12 relative z-10">
        <div className="text-center md:text-left">
          <h1 className="text-white text-[20px] md:text-[28px] font-bold mb-2">
            전국 최대 규모! 상품권 업체가 모두 한곳에!
          </h1>
          <p className="text-gray-300 text-[12px] md:text-[14px]">
            나에게 맞는 상품권 업체 찾기! 상품권 매입 중개 플랫폼 1위!
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-5 justify-center md:justify-start text-[11px] md:text-[12px] text-gray-300">
            <div className="flex items-center gap-2">
              <span>현재 기준</span>
            </div>
            <div className="flex items-center gap-2">
              <span>오늘 방문자</span>
              <div className="flex">{formatNumber(visitorInfo.today)}</div>
              <span>명</span>
            </div>
            <div className="flex items-center gap-2">
              <span>누적 방문자</span>
              <div className="flex">{formatNumber(visitorInfo.total)}</div>
            </div>
            <div className="flex items-center gap-2">
              <span>총 등록업체 수</span>
              <div className="flex">{formatNumber(visitorInfo.totalCompanies)}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative badge */}
      <div className="hidden md:block absolute right-[10%] top-1/2 -translate-y-1/2">
        <div className="w-[160px] h-[160px] rounded-full bg-accent/20 flex items-center justify-center">
          <div className="w-[130px] h-[130px] rounded-full bg-accent/30 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[10px] text-gray-200">2014~2026 12년 연속</p>
              <p className="text-[14px] font-bold text-white mt-1">등록업체수 1위</p>
              <p className="text-[14px] font-bold text-accent">매입문의수 1위</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
