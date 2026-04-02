'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { categories } from '@/data/mock';

export default function ProfilePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['lotte']);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('평일 09:00 - 18:00');

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filteredCategories = categories.filter(c => c.id !== 'all');

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-base mb-6">업체 소개 페이지 관리</h3>

        <div className="space-y-6 max-w-2xl">
          {/* Category selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">주력 상품권 카테고리</label>
            <p className="text-xs text-gray-400 mb-3">삽니다 탭에서 카테고리별로 업체가 노출됩니다. 최대 2개까지 선택 가능 (추가는 관리자 문의)</p>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    selectedCategories.includes(cat.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">업체 소개</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="업체 소개를 입력하세요"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">운영 시간</label>
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="예: 평일 09:00 - 18:00"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">업체 소개 이미지</label>
            <p className="text-xs text-gray-400 mb-3">office_image 01~06 중 선택 (기본: 01). 업체 소개 페이지 상단 배경으로 표시됩니다.</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[1,2,3,4,5,6].map(n => (
                <div
                  key={n}
                  className="aspect-[4/3] bg-gray-200 rounded cursor-pointer hover:ring-2 hover:ring-primary flex items-center justify-center text-xs text-gray-400"
                >
                  {String(n).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            저장하기
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
