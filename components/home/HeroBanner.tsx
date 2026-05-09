'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { TRUST_LINKS } from '@/lib/trustLinks';

export default function HeroBanner() {
  const [visitorInfo, setVisitorInfo] = useState({ today: 0, total: 0, sellCount: 0 });

  useEffect(() => {
    let alive = true;
    const load = () => {
      fetch('/api/visitors', { cache: 'no-store' })
        .then(r => r.json())
        .then(data => {
          if (!alive) return;
          setVisitorInfo({
            today: data.today ?? 473,
            total: data.total ?? 87320,
            sellCount: data.sellCount ?? 0,
          });
        })
        .catch(() => alive && setVisitorInfo({ today: 473, total: 87320, sellCount: 0 }));
    };
    load();
    const t = setInterval(load, 60_000); // 60초마다 갱신
    return () => { alive = false; clearInterval(t); };
  }, []);

  const formatNumber = (n: number) => String(n).split('').map((d, i) => (
    <span key={i} className="inline-flex items-center justify-center w-[16px] h-[20px] bg-gray-800 text-white text-[11px] font-bold rounded-sm">{d}</span>
  ));

  return (
    <div className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 50%, #1a1a1a 100%)' }}>
      <div className="container-main py-10 md:py-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-white text-[18px] md:text-[24px] font-bold mb-2 leading-tight">
              전국 최대 규모! 상품권 업체가 모두 한곳에!
            </h1>
            <p className="text-gray-300 text-[11px] md:text-[13px]">
              나에게 맞는 상품권 업체 찾기! 상품권 매입 중개 플랫폼 1위!
            </p>
          </div>

          {/* 신뢰기관 바로가기 — PC만 노출 (모바일은 햄버거 메뉴 하단에 별도 노출) */}
          <div className="hidden lg:grid grid-cols-3 gap-2.5">
            {TRUST_LINKS.map(({ label, desc, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 px-3 py-3 lg:w-[128px] bg-white/10 hover:bg-white/20 border border-white/15 rounded transition-colors"
              >
                <div className="flex items-center gap-1 text-white">
                  <Icon size={14} />
                  <span className="text-[12px] font-bold whitespace-nowrap">{label}</span>
                  <ExternalLink size={10} className="opacity-60 group-hover:opacity-100" />
                </div>
                <span className="text-[10px] text-gray-300 whitespace-nowrap">{desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Stats bar — 한 줄로 깔끔히 (현재 기준 ~ 누적 방문자만) */}
      <div className="border-t border-white/10 bg-black/30 relative z-10">
        <div className="container-main py-2.5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-gray-300 whitespace-nowrap">
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
          </div>
        </div>
      </div>
    </div>
  );
}
