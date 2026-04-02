'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HandshakeIcon, ShieldCheckIcon, FireIcon } from '@/components/icons/SvgIcons';

const banners = [
  {
    id: 1,
    title: '티켓바이와 함께할 공식 제휴 업체를 모집합니다',
    subtitle: '광고주 파트너십',
    icon: HandshakeIcon,
    bg: 'from-emerald-600 to-emerald-800',
  },
  {
    id: 2,
    title: '안전한 상품권 거래, 티켓바이에서 시작하세요',
    subtitle: '계약서 기반 안심 거래',
    icon: ShieldCheckIcon,
    bg: 'from-blue-600 to-indigo-800',
  },
  {
    id: 3,
    title: '프리미엄 업체 등록 시 다양한 혜택 제공',
    subtitle: '지금 바로 등록하세요',
    icon: FireIcon,
    bg: 'from-orange-500 to-rose-600',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <div className="relative w-full h-[160px] md:h-[220px] rounded-2xl overflow-hidden mb-6">
      {banners.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 flex items-center transition-opacity duration-700 bg-gradient-to-br ${banner.bg} ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-6 px-8 md:px-16">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/15 items-center justify-center text-white shrink-0">
              <banner.icon size={32} />
            </div>
            <div className="text-white">
              <p className="text-white/70 text-xs md:text-sm font-medium mb-1">{banner.subtitle}</p>
              <h2 className="text-lg md:text-2xl font-bold leading-snug">{banner.title}</h2>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === current ? 'bg-white w-6' : 'bg-white/40 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
