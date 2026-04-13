'use client';

import { useEffect, useState } from 'react';
import type { Ad } from '@/lib/ads';

// Fisher-Yates 셔플
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MainAdsSection() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    // main_top 슬롯을 메인 광고 영역으로 사용, 새로고침마다 랜덤 순서
    fetch('/api/ads?slot=main_top&active=true')
      .then(r => r.json())
      .then((data: Ad[]) => setAds(shuffle(data)))
      .catch(() => {});
  }, []);

  if (ads.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-baseline gap-2 mb-3">
        <h2 className="section-title mb-0">메인 광고</h2>
        <span className="badge bg-zinc-100 text-zinc-400">AD</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {ads.map((ad) => {
          const content = (
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 hover:border-zinc-400 transition-colors">
              {ad.image_url ? (
                <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-3">
                  <div className="text-center">
                    <p className="text-[12px] font-semibold text-zinc-700">{ad.title}</p>
                    {ad.description && <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{ad.description}</p>}
                  </div>
                </div>
              )}
              <span className="absolute top-1.5 right-1.5 text-[9px] text-white bg-black/50 px-1.5 py-0.5 rounded">AD</span>
            </div>
          );
          return ad.link_url ? (
            <a key={ad.id} href={ad.link_url} target="_blank" rel="noopener noreferrer">{content}</a>
          ) : (
            <div key={ad.id}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}
