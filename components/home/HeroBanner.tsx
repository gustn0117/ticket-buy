'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  { id: 1, title: '공식 제휴 업체를 모집합니다', desc: '티켓바이와 함께 성장할 파트너를 찾고 있습니다.' },
  { id: 2, title: '계약서 기반 안심 거래', desc: '전자 계약서와 단계별 프로세스로 안전하게 거래하세요.' },
  { id: 3, title: '프리미엄 업체 등록 혜택', desc: '업체 등록 시 상단 노출 및 다양한 혜택을 제공합니다.' },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden mb-8" style={{ background: 'linear-gradient(135deg, #1C1D3E 0%, #2A2B55 100%)' }}>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(240,78,81,0.3), transparent 60%)' }} />
      {banners.map((b, idx) => (
        <div key={b.id}
          className={`transition-opacity duration-500 ${idx === current ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
          <div className="px-8 md:px-12 py-12 md:py-16 relative z-10">
            <p className="text-[12px] mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{b.desc}</p>
            <h2 className="text-white text-[20px] md:text-[26px] font-semibold leading-tight">{b.title}</h2>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
          className="w-7 h-7 rounded border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
          <ChevronLeft size={14} />
        </button>
        <span className="text-[11px] text-zinc-500 tabular-nums">{current + 1} / {banners.length}</span>
        <button onClick={() => setCurrent((c) => (c + 1) % banners.length)}
          className="w-7 h-7 rounded border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
