'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HandshakeIcon, ShieldCheckIcon, FireIcon } from '@/components/icons/SvgIcons';

const banners = [
  {
    id: 1,
    title: '티켓바이와 함께할 공식 제휴 업체(광고주)를 모집합니다!',
    icon: HandshakeIcon,
    bg: 'from-green-700 to-green-900',
  },
  {
    id: 2,
    title: '안전한 상품권 거래, 티켓바이에서 시작하세요',
    icon: ShieldCheckIcon,
    bg: 'from-blue-700 to-blue-900',
  },
  {
    id: 3,
    title: '프리미엄 업체 등록 시 다양한 혜택 제공!',
    icon: FireIcon,
    bg: 'from-orange-600 to-red-700',
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
    <div className="relative w-full h-[200px] md:h-[280px] rounded-lg overflow-hidden bg-gray-800">
      {banners.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 bg-gradient-to-r ${banner.bg} ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center text-white px-8">
            <span className="mb-4 block text-white">{<banner.icon size={48} />}</span>
            <h2 className="text-lg md:text-2xl font-bold">{banner.title}</h2>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
