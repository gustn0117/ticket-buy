'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: '공식 제휴 업체를 모집합니다',
    subtitle: '티켓바이와 함께 성장할 파트너를 찾고 있습니다.',
    bg: 'bg-gray-900',
  },
  {
    id: 2,
    title: '계약서 기반 안심 거래 시스템',
    subtitle: '전자 계약서와 단계별 거래 프로세스로 안전하게.',
    bg: 'bg-gray-800',
  },
  {
    id: 3,
    title: '프리미엄 업체 등록 혜택',
    subtitle: '업체 등록 시 상단 노출 및 다양한 혜택을 제공합니다.',
    bg: 'bg-gray-900',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-none md:rounded-lg overflow-hidden mb-8 -mx-6 md:mx-0 px-6 md:px-0" style={{ width: 'calc(100% + 48px)' }}>
      <div className="md:rounded-lg overflow-hidden">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`${idx === 0 ? '' : 'absolute inset-0'} ${banner.bg} transition-opacity duration-500 ${idx === current ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'}`}
          >
            <div className="px-8 md:px-14 py-14 md:py-20">
              <p className="text-gray-400 text-xs md:text-sm mb-3 tracking-wide">{banner.subtitle}</p>
              <h2 className="text-white text-xl md:text-3xl font-bold tracking-tight leading-tight">{banner.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
        className="absolute left-8 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
        <ChevronLeft size={16} />
      </button>
      <button onClick={() => setCurrent((c) => (c + 1) % banners.length)}
        className="absolute right-8 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
        <ChevronRight size={16} />
      </button>

      <div className="absolute bottom-4 left-8 md:left-14 flex gap-1.5">
        {banners.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)}
            className={`h-0.5 rounded-full transition-all duration-300 ${idx === current ? 'bg-white w-6' : 'bg-white/30 w-3'}`} />
        ))}
      </div>
    </div>
  );
}
