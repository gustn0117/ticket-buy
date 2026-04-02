'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/data/mock';

export default function WritePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: '',
    title: '',
    faceValue: '',
    price: '',
    delivery: '7일 이내 발송',
    deliveryMethod: 'mobile',
    description: '',
    region: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const faceValue = Number(form.faceValue) || 0;
  const price = Number(form.price) || 0;
  const discount = faceValue > 0 ? Math.round((1 - price / faceValue) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('게시글이 등록되었습니다!');
    router.push('/board');
  };

  return (
    <div className="max-w-[640px] mx-auto px-4 py-6">
      <Link href="/board" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-4">
        <ArrowLeft size={16} /> 목록으로
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-xl font-bold mb-6">글쓰기</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상품권 종류 *</label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            >
              <option value="">선택하세요</option>
              {categories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="예: 신세계 10만원권 판매"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">개당 상품권 금액 (원) *</label>
              <input
                type="number"
                value={form.faceValue}
                onChange={(e) => handleChange('faceValue', e.target.value)}
                placeholder="100000"
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">개당 구매금액 (원) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="70000"
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          {faceValue > 0 && price > 0 && (
            <div className="text-sm text-gray-500">
              할인율: <span className="text-red-500 font-bold">{discount}%</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">발송 예정</label>
            <div className="flex items-center gap-4">
              <select
                value={form.delivery}
                onChange={(e) => handleChange('delivery', e.target.value)}
                className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              >
                <option value="즉시발송">즉시발송</option>
                <option value="3일 이내 발송">3일 이내 발송</option>
                <option value="5일 이내 발송">5일 이내 발송</option>
                <option value="7일 이내 발송">7일 이내 발송</option>
                <option value="14일 이내 발송">14일 이내 발송</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">배송 방법</label>
            <div className="flex gap-3">
              {[
                { value: 'mobile', label: '모바일' },
                { value: 'parcel', label: '택배' },
                { value: 'direct', label: '직접만남' },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={opt.value}
                    checked={form.deliveryMethod === opt.value}
                    onChange={(e) => handleChange('deliveryMethod', e.target.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">지역</label>
            <input
              type="text"
              value={form.region}
              onChange={(e) => handleChange('region', e.target.value)}
              placeholder="예: 서울, 전국"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="추가 설명을 입력하세요"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
