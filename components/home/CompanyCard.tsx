'use client';

import Link from 'next/link';
import { Phone, User } from 'lucide-react';
import type { DBPremiumBuyer } from '@/lib/types';
import { addRecentBuyer } from '@/lib/recentBuyers';

interface CompanyCardProps {
  company: DBPremiumBuyer;
  isNew?: boolean;
  /** 이미지가 없을 때 기본 배경 인덱스 (0~6) */
  fallbackIndex?: number;
}

/** 이미지가 없을 때 쓰는 아바타 풍의 그라데이션 배경 세트 */
const FALLBACK_BGS = [
  'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
  'linear-gradient(135deg, #5A6F8C 0%, #2C3E50 100%)',
  'linear-gradient(135deg, #4B5563 0%, #1F2937 100%)',
  'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
  'linear-gradient(135deg, #475569 0%, #1E293B 100%)',
  'linear-gradient(135deg, #52525B 0%, #27272A 100%)',
  'linear-gradient(135deg, #57534E 0%, #292524 100%)',
];

export default function CompanyCard({ company, isNew, fallbackIndex = 0 }: CompanyCardProps) {
  const fallbackBg = FALLBACK_BGS[fallbackIndex % FALLBACK_BGS.length];
  const displayTitle = company.headline?.trim() || company.description?.split('\n')[0]?.slice(0, 20) || company.name;

  const handleClick = () => {
    addRecentBuyer({
      id: company.id,
      name: company.name,
      region: company.region,
      image_url: company.image_url,
    });
  };

  return (
    <Link
      href={`/buyer/${company.id}`}
      onClick={handleClick}
      className="company-card card-hover block group"
    >
      {/* Image header with overlay title */}
      <div className="relative h-[125px] md:h-[140px] overflow-hidden">
        {company.image_url ? (
          <>
            <img src={company.image_url} alt={company.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />
          </>
        ) : (
          <div className="w-full h-full relative" style={{ background: fallbackBg }}>
            {/* subtle pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)'
            }} />
          </div>
        )}
        {/* Title overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <h3 className="text-white text-[14px] md:text-[15px] font-bold text-center leading-tight drop-shadow-md">
            {displayTitle}
          </h3>
        </div>
        {/* Badges */}
        {isNew && (
          <span className="absolute top-1.5 right-1.5 text-[9px] text-white bg-red-500 px-1.5 py-0.5 rounded-sm font-bold z-10">NEW</span>
        )}
        {company.tier === 'premium' && (
          <span className="absolute top-1.5 left-1.5 text-[9px] text-white bg-accent px-1.5 py-0.5 rounded-sm font-bold z-10">BEST</span>
        )}
      </div>

      {/* Body */}
      <div className="px-3 pt-3 pb-2.5">
        <p className="text-[12.5px] text-gray-600 leading-snug text-center line-clamp-2 min-h-[38px]">
          {company.description || '상품권 매입 전문 업체입니다.'}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[14px] md:text-[15px] font-bold text-gray-900 whitespace-nowrap">
          <Phone size={14} className="text-gray-500 shrink-0" />
          <span className="tabular-nums whitespace-nowrap">{company.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-3 py-2 border-t border-gray-100 text-[11px]">
        <span className="text-accent font-bold flex items-center gap-1 truncate">
          <User size={10} className="shrink-0" />
          <span className="truncate">{company.name}</span>
        </span>
        <span className="text-gray-500 shrink-0 ml-2">{company.region || '전국'}</span>
      </div>
    </Link>
  );
}
