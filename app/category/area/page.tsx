'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, LayoutGrid, Building2, Landmark, Anchor, Train, University, Waves, Sun, Factory, Construction, Mountain, Leaf, Wheat, Sprout, TreePine, MountainSnow, Palmtree } from 'lucide-react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const regions = [
  { name: '전체', count: 1300, Icon: LayoutGrid },
  { name: '서울', count: 134, Icon: Building2 },
  { name: '경기', count: 161, Icon: Landmark },
  { name: '인천', count: 90, Icon: Anchor },
  { name: '대전', count: 77, Icon: Train },
  { name: '대구', count: 83, Icon: University },
  { name: '부산', count: 110, Icon: Waves },
  { name: '광주', count: 77, Icon: Sun },
  { name: '울산', count: 63, Icon: Factory },
  { name: '세종', count: 30, Icon: Construction },
  { name: '강원', count: 63, Icon: Mountain },
  { name: '충북', count: 64, Icon: Leaf },
  { name: '충남', count: 63, Icon: Wheat },
  { name: '전북', count: 63, Icon: Sprout },
  { name: '전남', count: 60, Icon: TreePine },
  { name: '경북', count: 69, Icon: MountainSnow },
  { name: '경남', count: 79, Icon: TreePine },
  { name: '제주', count: 6, Icon: Palmtree },
];

const regionOrder = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '충북', '전북'];
const demoCompanies = Array.from({ length: 10 }, (_, i) => ({
  id: `area-${i}`,
  name: `상품권 매입 업체 ${i + 1}`,
  desc: '빠르고 안전한 상품권 매입 전문 업체입니다.',
  phone: `010-${String(1000 + i * 111).slice(0, 4)}-${String(5000 + i * 222).slice(0, 4)}`,
  region: regionOrder[i],
  isNew: i < 3,
}));

export default function AreaCategoryPage() {
  const [selectedRegion, setSelectedRegion] = useState('전체');

  return (
    <div className="container-main py-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">지역별 업체찾기</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; 지역별 업체찾기
        </div>
      </div>

      <div className="flex gap-4">
        <LeftSidebar />

        <div className="flex-1 min-w-0">
          {/* Premium Banner + Region Icons */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Premium banner */}
            <div className="w-full md:w-[280px] shrink-0 bg-white border border-gray-200">
              <div className="px-3 py-2 border-b border-gray-200">
                <span className="text-[12px] font-bold text-accent">Premium Banner</span>
              </div>
              <div className="p-6 text-center">
                <p className="text-[13px] font-bold text-gray-700">프리미엄 업체를 모집합니다</p>
                <p className="text-[11px] text-gray-500 mt-1">상단 노출 및 다양한 혜택 제공</p>
                <Link href="/register-business" className="inline-block mt-3 text-[11px] text-accent font-bold hover:underline">문의하기</Link>
              </div>
            </div>

            {/* Region icons grid */}
            <div className="flex-1 bg-white border border-gray-200">
              <div className="grid grid-cols-5 md:grid-cols-9 gap-0">
                {regions.map((region) => {
                  const IconComp = region.Icon;
                  return (
                    <button
                      key={region.name}
                      onClick={() => setSelectedRegion(region.name)}
                      className={`category-icon ${selectedRegion === region.name ? 'active' : ''}`}
                    >
                      <div className="icon-circle">
                        <IconComp size={16} strokeWidth={1.5} />
                      </div>
                      <span className="icon-label">{region.name}</span>
                      <span className="icon-count">{region.count}</span>
                    </button>
                  );
                })}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-[10px] text-gray-400">
                해당 지역의 상품권 업체를 선택하여 보실수 있습니다.
              </div>
            </div>
          </div>

          {/* Notice bar */}
          <div className="bg-white border border-gray-200 px-4 py-2 mb-4 text-[11px] text-gray-500">
            * 배너위치는 실시간으로 랜덤 배치됩니다.
          </div>

          {/* Company listing header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold">
              지역별 <span className="text-accent">업체 등록 현황</span>
            </h2>
            <span className="text-[11px] text-gray-400">광고문의</span>
          </div>

          {/* Company cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
            {demoCompanies.map((company) => (
              <Link key={company.id} href="/board" className="company-card card-hover block">
                <div className="company-card-image">
                  <h3>{company.name}</h3>
                  {company.isNew && (
                    <span className="absolute top-2 right-2 text-[9px] text-white bg-red-500 px-1.5 py-0.5 rounded-sm font-bold">NEW</span>
                  )}
                </div>
                <div className="company-card-body">
                  <p>{company.desc}</p>
                  <div className="company-card-phone">
                    <Phone size={13} className="text-gray-500" />
                    <span>{company.phone}</span>
                  </div>
                </div>
                <div className="company-card-footer">
                  <span className="text-accent font-bold flex items-center gap-1">
                    <MapPin size={10} />
                    {company.name.slice(0, 8)}
                  </span>
                  <span className="text-gray-500">{company.region}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
