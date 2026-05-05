'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Ad } from '@/lib/ads';

const STORAGE_KEY = 'ad_popup_dismissed_at';
const COOLDOWN_HOURS = 12; // 한 번 닫으면 12시간 동안 다시 안 뜸

export default function AdPopup() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 쿨다운 체크
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (dismissed) {
        const since = Date.now() - Number(dismissed);
        if (since < COOLDOWN_HOURS * 3600_000) return;
      }
    } catch {}

    fetch(`/api/ads?slot=popup&active=true`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((ads: Ad[]) => {
        if (Array.isArray(ads) && ads.length > 0) {
          setAd(ads[0]);
          // 1.2초 정도 기다렸다가 자연스럽게 표시
          setTimeout(() => setOpen(true), 1200);
        }
      })
      .catch(() => {});
  }, []);

  const close = (todayClose = false) => {
    setOpen(false);
    if (todayClose) {
      try {
        sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
    }
  };

  if (!ad || !open) return null;

  const Inner = (
    <div className="bg-white shadow-2xl border border-gray-200 overflow-hidden" style={{ width: 360, maxWidth: 'calc(100vw - 32px)' }}>
      {ad.image_url ? (
        <img src={ad.image_url} alt={ad.title} className="w-full" />
      ) : (
        <div className="bg-zinc-900 text-white p-8 text-center">
          {ad.title && <p className="text-[18px] font-bold mb-2">{ad.title}</p>}
          {ad.description && <p className="text-[13px] text-gray-300 leading-relaxed">{ad.description}</p>}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50">
        <button
          onClick={() => close(true)}
          className="text-[12px] text-gray-500 hover:text-accent"
        >
          오늘 그만 보기
        </button>
        <button
          onClick={() => close(false)}
          className="text-[12px] text-gray-700 font-bold hover:text-accent flex items-center gap-1"
          aria-label="닫기"
        >
          <X size={13} /> 닫기
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
      {ad.link_url ? (
        <a
          href={ad.link_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => close(false)}
          className="block"
        >
          {Inner}
        </a>
      ) : (
        Inner
      )}
    </div>
  );
}
