'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { categories } from '@/data/mock';

const regions = [
  '전체', '서울', '경기', '인천', '대전', '대구',
  '부산', '광주', '울산', '세종', '강원', '충북',
  '충남', '전북', '전남', '경북', '경남', '제주'
];

const productCategories = [
  '전체', '직장인', '무직자', '여성', '비상금',
  '모바일', '소액', '무방문', '자영업', '당일',
  '사업자', '전문직', '자산용', '신용'
];

export default function CategorySearch() {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* 지역으로 업체찾기 */}
      <div className="flex-1 bg-white border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-[14px] font-bold text-gray-800">지역으로 업체찾기</h3>
          <Link href="/category/area" className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-400 hover:text-accent hover:border-accent transition-colors">
            <Plus size={14} />
          </Link>
        </div>
        <div className="p-3">
          <div className="flex flex-wrap gap-1">
            {regions.map((region) => (
              <Link key={region} href={`/category/area?region=${region}`}
                className="px-2.5 py-1 text-[12px] text-gray-600 hover:text-accent hover:bg-accent/5 transition-colors">
                {region}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 상품으로 업체찾기 */}
      <div className="flex-1 bg-white border border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-[14px] font-bold text-gray-800">상품으로 업체찾기</h3>
          <Link href="/category/product" className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-400 hover:text-accent hover:border-accent transition-colors">
            <Plus size={14} />
          </Link>
        </div>
        <div className="p-3">
          <div className="flex flex-wrap gap-1">
            {productCategories.map((cat) => (
              <Link key={cat} href={`/category/product?type=${cat}`}
                className="px-2.5 py-1 text-[12px] text-gray-600 hover:text-accent hover:bg-accent/5 transition-colors">
                {cat}
              </Link>
            ))}
          </div>
          <div className="flex justify-end mt-1">
            <Link href="/category/product" className="text-[11px] text-accent font-bold hover:underline">
              더보기+
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
