'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const REGIONS = [
  '전체', '서울', '경기', '인천', '대전', '대구',
  '부산', '광주', '울산', '세종', '강원', '충북',
  '충남', '전북', '전남', '경북', '경남', '제주',
];

const BRANDS = [
  '전체', '신세계', '롯데', '문화상품권', '컬쳐랜드',
  '스타벅스', '온캐시', '구글플레이', '해피머니',
  '틴캐시', '배민상품권', '교보문고', 'GS25', 'CU',
];

type Tab = 'region' | 'product';

export default function BuyerFinder() {
  const [tab, setTab] = useState<Tab>('region');

  const items = tab === 'region' ? REGIONS : BRANDS;
  const moreHref = tab === 'region' ? '/category/area' : '/category/product';
  const buildHref = (item: string) => {
    if (item === '전체') return moreHref;
    return tab === 'region'
      ? `/category/area?region=${encodeURIComponent(item)}`
      : `/category/product?type=${encodeURIComponent(item)}`;
  };

  return (
    <div className="bg-white border border-gray-200 mb-5">
      {/* 좌/우 탭 헤더 */}
      <div className="grid grid-cols-2 border-b border-gray-200 relative">
        <button
          type="button"
          onClick={() => setTab('region')}
          className={`py-3 text-center text-[14px] font-bold transition-colors ${
            tab === 'region'
              ? 'text-accent border-b-2 border-accent bg-accent/5'
              : 'text-gray-600 hover:text-accent border-b-2 border-transparent'
          }`}
        >
          지역별 업체찾기
        </button>
        <button
          type="button"
          onClick={() => setTab('product')}
          className={`py-3 text-center text-[14px] font-bold transition-colors ${
            tab === 'product'
              ? 'text-accent border-b-2 border-accent bg-accent/5'
              : 'text-gray-600 hover:text-accent border-b-2 border-transparent'
          }`}
        >
          상품별 업체찾기
        </button>
        <Link
          href={moreHref}
          aria-label="전체보기"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-accent hover:text-accent transition-colors"
        >
          <Plus size={13} />
        </Link>
      </div>

      {/* 콘텐츠 */}
      <div className="px-4 py-3">
        <div className="flex flex-wrap gap-x-1 gap-y-2 text-[12.5px] tracking-tight">
          {items.map((item, i) => (
            <span key={item} className="flex items-center">
              <Link
                href={buildHref(item)}
                className="text-gray-700 hover:text-accent hover:underline whitespace-nowrap"
              >
                {item}
              </Link>
              {i < items.length - 1 && <span className="text-gray-300 mx-1">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
