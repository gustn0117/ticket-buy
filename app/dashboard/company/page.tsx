'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function CompanyPage() {
  const [form, setForm] = useState({
    businessName: '티켓마스터',
    businessNumber: '123-45-67890',
    representative: '홍길동',
    phone: '010-1111-2222',
    email: 'bq@mail.com',
    address: '서울시 강남구 테스트로 1',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-base mb-6">업체 정보</h3>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사업체명</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사업자등록번호</label>
            <input
              type="text"
              value={form.businessNumber}
              onChange={(e) => handleChange('businessNumber', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대표자명</label>
            <input
              type="text"
              value={form.representative}
              onChange={(e) => handleChange('representative', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            저장하기
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
