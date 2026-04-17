'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, LayoutGrid, Briefcase, UserX, Users, Wallet, Smartphone, Coins, Home, Store, Zap, Building, Award, PiggyBank, CreditCard, RefreshCw, Car, LandPlot, ShoppingCart, Laptop, FileText, Palette, FileCheck, Monitor, Heart } from 'lucide-react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const productTypes = [
  { name: '전체', count: 1370, Icon: LayoutGrid },
  { name: '직장인', count: 139, Icon: Briefcase },
  { name: '무직자', count: 107, Icon: UserX },
  { name: '여성', count: 57, Icon: Users },
  { name: '비상금', count: 91, Icon: Wallet },
  { name: '모바일', count: 47, Icon: Smartphone },
  { name: '소액', count: 86, Icon: Coins },
  { name: '무방문', count: 82, Icon: Home },
  { name: '자영업', count: 65, Icon: Store },
  { name: '당일', count: 92, Icon: Zap },
  { name: '사업자', count: 91, Icon: Building },
  { name: '전문직', count: 27, Icon: Award },
  { name: '자산용', count: 38, Icon: PiggyBank },
  { name: '신용', count: 24, Icon: CreditCard },
  { name: '추가대출', count: 24, Icon: RefreshCw },
  { name: '자동차', count: 10, Icon: Car },
  { name: '부동산', count: 55, Icon: LandPlot },
  { name: '생활비', count: 37, Icon: ShoppingCart },
  { name: '온라인', count: 37, Icon: Laptop },
  { name: '임용자', count: 37, Icon: FileText },
  { name: '프리랜서', count: 37, Icon: Palette },
  { name: '전문보증', count: 8, Icon: FileCheck },
  { name: '비대면', count: 38, Icon: Monitor },
  { name: '주부대출', count: 32, Icon: Heart },
];

const demoCompanies = Array.from({ length: 10 }, (_, i) => ({
  id: `prod-${i}`,
  name: `상품권 매입업체 ${i + 1}`,
  desc: '빠르고 안전한 상품권 매입 전문',
  phone: `010-${String(4000 + i * 111).slice(0, 4)}-${String(8000 + i * 222).slice(0, 4)}`,
  region: '전국',
  isNew: i < 2,
  isBest: i < 1,
}));

export default function ProductCategoryPage() {
  const [selectedType, setSelectedType] = useState('전체');

  return (
    <div className="container-main py-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">상품별 업체찾기</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; 상품별 업체찾기
        </div>
      </div>

      <div className="flex gap-4">
        <LeftSidebar />

        <div className="flex-1 min-w-0">
          {/* Premium Banner + Product Icons */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
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

            <div className="flex-1 bg-white border border-gray-200">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-0">
                {productTypes.map((type) => {
                  const IconComp = type.Icon;
                  return (
                    <button
                      key={type.name}
                      onClick={() => setSelectedType(type.name)}
                      className={`category-icon ${selectedType === type.name ? 'active' : ''}`}
                    >
                      <div className="icon-circle">
                        <IconComp size={16} strokeWidth={1.5} />
                      </div>
                      <span className="icon-label">{type.name}</span>
                      <span className="icon-count">{type.count}</span>
                    </button>
                  );
                })}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-[10px] text-gray-400">
                상품을 선택하여 업체를 보실수 있습니다.
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 px-4 py-2 mb-4 text-[11px] text-gray-500">
            * 배너위치는 실시간으로 랜덤 배치됩니다.
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold">
              상품별 <span className="text-accent">업체 등록 현황</span>
            </h2>
            <span className="text-[11px] text-gray-400">광고문의</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
            {demoCompanies.map((company) => (
              <Link key={company.id} href="/board" className="company-card card-hover block">
                <div className="company-card-image relative">
                  <h3>{company.name}</h3>
                  {company.isNew && (
                    <span className="absolute top-2 right-2 text-[9px] text-white bg-red-500 px-1.5 py-0.5 rounded-sm font-bold">NEW</span>
                  )}
                  {company.isBest && (
                    <span className="absolute top-2 left-2 text-[9px] text-white bg-accent px-1.5 py-0.5 rounded-sm font-bold">BEST</span>
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
