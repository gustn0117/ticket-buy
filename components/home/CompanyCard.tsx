'use client';

import Link from 'next/link';
import { Phone, User } from 'lucide-react';
import type { DBPremiumBuyer } from '@/lib/types';
import { addRecentBuyer } from '@/lib/recentBuyers';
import { pickFallbackPhoto } from '@/lib/fallbackPhotos';

interface CompanyCardProps {
  company: DBPremiumBuyer;
  isNew?: boolean;
  /** 이미지가 없을 때 기본 배경 사진 인덱스 (0~9) */
  fallbackIndex?: number;
}

export default function CompanyCard({ company, isNew, fallbackIndex = 0 }: CompanyCardProps) {
  const fallbackPhoto = pickFallbackPhoto(company.id || fallbackIndex);
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
      <div className="relative h-[125px] md:h-[140px] overflow-hidden bg-gray-800">
        <img
          src={company.image_url || fallbackPhoto}
          alt={company.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            company.image_url ? '' : 'opacity-60'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />
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
