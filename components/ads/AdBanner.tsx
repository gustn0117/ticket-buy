'use client';

import { useState, useEffect } from 'react';
import type { Ad, AdSlot } from '@/lib/ads';
import { AD_SLOT_LABELS, AD_SLOT_SIZES } from '@/lib/ads';

// 각 슬롯의 표준 종횡비 (CSS aspect-ratio용)
const SLOT_ASPECT: Record<AdSlot, string> = {
  hero_banner: '1140 / 200',
  main_top: '1140 / 90',
  main_middle: '1140 / 90',
  sidebar_top: '300 / 250',
  sidebar_bottom: '300 / 250',
  board_top: '960 / 90',
  board_between: '960 / 60',
  detail_bottom: '740 / 90',
  chat_top: '320 / 60',
  footer_banner: '1140 / 80',
  popup: '400 / 500',
};

interface AdBannerProps {
  slot: AdSlot;
  className?: string;
  /** 활성 광고 없을 때 fallback 노드 (예: 다른 promo) */
  fallback?: React.ReactNode;
  /** 광고 없을 때 점선 placeholder를 숨김 (운영 시 권장) */
  hideEmpty?: boolean;
}

function EmptySlot({ slot, className, aspect }: { slot: AdSlot; className: string; aspect: string }) {
  return (
    <div
      className={`relative overflow-hidden border border-dashed border-zinc-300 bg-zinc-50 ${className}`}
      style={{
        aspectRatio: aspect,
        backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[11px] font-medium text-zinc-400">{AD_SLOT_LABELS[slot]}</p>
          <p className="text-[10px] text-zinc-300">{AD_SLOT_SIZES[slot]}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdBanner({ slot, className = '', fallback, hideEmpty = false }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loaded, setLoaded] = useState(false);
  const aspect = SLOT_ASPECT[slot];

  useEffect(() => {
    fetch(`/api/ads?slot=${slot}&active=true`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((ads: Ad[]) => {
        if (Array.isArray(ads) && ads.length > 0) setAd(ads[0]);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [slot]);

  if (!loaded) return null;
  if (!ad) {
    if (fallback) return <>{fallback}</>;
    if (hideEmpty) return null;
    return <EmptySlot slot={slot} className={className} aspect={aspect} />;
  }

  const content = (
    <div
      className={`relative overflow-hidden border border-zinc-200 bg-zinc-50 group ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {ad.image_url ? (
        <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center">
            {ad.title && <p className="text-[13px] font-semibold text-zinc-700 mb-1">{ad.title}</p>}
            {ad.description && <p className="text-[11px] text-zinc-500">{ad.description}</p>}
          </div>
        </div>
      )}
      <span className="absolute top-1.5 right-1.5 inline-flex items-center px-1.5 py-0.5 rounded-sm bg-black/60 text-white text-[9px] font-bold">AD</span>
    </div>
  );

  if (ad.link_url) {
    return (
      <a
        href={ad.link_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${className}`}
      >
        {content}
      </a>
    );
  }

  return content;
}
