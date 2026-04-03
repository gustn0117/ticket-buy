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
      <div className="card p-5 animate-fade-in">
        <h3 className="section-title mb-5">업체 정보</h3>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">사업체명</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">사업자등록번호</label>
            <input
              type="text"
              value={form.businessNumber}
              onChange={(e) => handleChange('businessNumber', e.target.value)}
              className="input bg-zinc-50 text-zinc-500 cursor-not-allowed"
              readOnly
            />
            <p className="text-[11px] text-zinc-400 mt-1">사업자등록번호는 변경할 수 없습니다.</p>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">대표자명</label>
            <input
              type="text"
              value={form.representative}
              onChange={(e) => handleChange('representative', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">연락처</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">이메일</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-zinc-600 mb-1">주소</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="input"
            />
          </div>

          <button className="btn-primary">
            저장하기
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
