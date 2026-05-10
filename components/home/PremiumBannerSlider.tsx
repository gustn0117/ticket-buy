'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Phone, Search, HelpCircle } from 'lucide-react';
import type { DBPremiumBuyer } from '@/lib/types';

interface Props {
  buyers: DBPremiumBuyer[];
}

const stripPhone = (p: string) => p.replace(/[^0-9+]/g, '');
const PER_SLIDE = 2; // 한 슬라이드에 2줄

/** Fisher-Yates 셔플 — 새로고침마다 노출 순서 100% 랜덤 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 메인 등록업체 밑에 노출되는 프리미엄 배너 슬라이더 (옆으로 넘기기, 2줄씩) */
export default function PremiumBannerSlider({ buyers }: Props) {
  const [page, setPage] = useState(0);
  // 새로고침마다 위치 100% 랜덤 (PDF 요청)
  const featured = useMemo(() => shuffle(buyers).slice(0, 12), [buyers]); // 최대 12개
  const totalPages = Math.max(1, Math.ceil(featured.length / PER_SLIDE));

  // 6초마다 자동 슬라이드
  useEffect(() => {
    if (totalPages <= 1) return;
    const t = setInterval(() => setPage((p) => (p + 1) % totalPages), 6000);
    return () => clearInterval(t);
  }, [totalPages]);

  if (featured.length === 0) return null;

  const start = page * PER_SLIDE;
  const items = featured.slice(start, start + PER_SLIDE);

  return (
    <section className="bg-white border border-gray-200 mb-5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-bold text-gray-800">프리미엄 배너광고</h3>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`${i + 1}페이지`}
                className={`w-1.5 h-1.5 rounded-full ${i === page ? 'bg-accent' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/advertising" className="flex items-center gap-1 px-2 py-1 text-[11px] text-gray-500 hover:text-accent border border-gray-200">
            광고문의 <HelpCircle size={10} />
          </Link>
          <button
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
            aria-label="이전"
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            aria-label="다음"
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-accent hover:text-accent"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
      <ul>
        {items.map((b) => {
          const phoneDigits = stripPhone(b.phone || '');
          return (
            <li key={b.id} className="border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-900 mb-0.5 truncate">
                    {b.headline?.trim() || b.description?.split('\n')[0] || b.name}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="badge bg-gray-100 text-gray-600">{b.region || '전국'}</span>
                    <span className="text-gray-700 font-medium truncate">{b.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/buyer/${b.id}`}
                    className="inline-flex items-center gap-1 px-2.5 h-8 text-[12px] text-gray-600 border border-gray-300 hover:text-accent hover:border-accent whitespace-nowrap"
                  >
                    <Search size={11} /> 상세보기
                  </Link>
                  {phoneDigits && (
                    <a
                      href={`tel:${phoneDigits}`}
                      className="inline-flex items-center gap-1 px-2.5 h-8 text-[12px] font-bold text-white bg-accent hover:brightness-110 whitespace-nowrap"
                    >
                      <Phone size={11} /> 통화하기
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
