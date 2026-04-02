'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HandshakeIcon, ShieldCheckIcon, FireIcon } from '@/components/icons/SvgIcons';

const banners = [
  {
    id: 1,
    title: '공식 제휴 업체를\n모집합니다',
    subtitle: '티켓바이 파트너십',
    cta: '자세히 보기',
    icon: HandshakeIcon,
    gradient: 'from-emerald-600 via-emerald-700 to-teal-800',
    accent: 'bg-emerald-500/20',
  },
  {
    id: 2,
    title: '계약서 기반\n안심 거래 시스템',
    subtitle: '안전한 상품권 거래',
    cta: '안전거래 알아보기',
    icon: ShieldCheckIcon,
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    accent: 'bg-blue-500/20',
  },
  {
    id: 3,
    title: '프리미엄 업체 등록\n혜택 제공',
    subtitle: '업체 등록 안내',
    cta: '등록 신청하기',
    icon: FireIcon,
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    accent: 'bg-violet-500/20',
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
    <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden mb-8 shadow-xl shadow-gray-900/5">
      {banners.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 flex items-center transition-all duration-700 bg-gradient-to-br ${banner.gradient} ${
            idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/5" />

          <div className="relative z-10 flex items-center justify-between w-full px-8 md:px-14">
            <div className="flex-1">
              <span className="inline-block text-white/60 text-xs md:text-sm font-medium tracking-wide uppercase mb-2 md:mb-3">{banner.subtitle}</span>
              <h2 className="text-xl md:text-3xl font-extrabold text-white leading-tight whitespace-pre-line tracking-tight">{banner.title}</h2>
              <button className="mt-4 md:mt-5 inline-flex items-center gap-2 text-white/90 text-sm font-medium hover:text-white transition-colors group">
                {banner.cta}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className={`hidden md:flex w-24 h-24 rounded-3xl ${banner.accent} items-center justify-center text-white shrink-0 ml-8`}>
              <banner.icon size={44} />
            </div>
          </div>
        </div>
      ))}

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-4 left-8 md:left-14 flex gap-1.5">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-white w-8' : 'bg-white/30 w-4 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
