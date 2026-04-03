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
    <div className="max-w-[640px] mx-auto px-4 py-6 animate-fade-in">
      <Link href="/board" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 mb-5 transition-colors font-medium">
        <ArrowLeft size={16} /> 목록으로
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-7">
        <h1 className="text-xl font-extrabold tracking-tight mb-6 text-gray-900">글쓰기</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">상품권 종류 *</label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            >
              <option value="">선택하세요</option>
              {categories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">제목 *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="예: 신세계 10만원권 판매"
              className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">개당 상품권 금액 (원) *</label>
              <input
                type="number"
                value={form.faceValue}
                onChange={(e) => handleChange('faceValue', e.target.value)}
                placeholder="100000"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">개당 구매금액 (원) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="70000"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {faceValue > 0 && price > 0 && (
            <div className="bg-emerald-50 rounded-xl px-4 py-3 text-sm border border-emerald-100">
              할인율: <span className="text-emerald-600 font-extrabold">{discount}%</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">발송 예정</label>
            <div className="flex items-center gap-4">
              <select
                value={form.delivery}
                onChange={(e) => handleChange('delivery', e.target.value)}
                className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">배송 방법</label>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                { value: 'mobile', label: '모바일' },
                { value: 'parcel', label: '택배' },
                { value: 'direct', label: '직접만남' },
              ].map(opt => (
                <label key={opt.value} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                  form.deliveryMethod === opt.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={opt.value}
                    checked={form.deliveryMethod === opt.value}
                    onChange={(e) => handleChange('deliveryMethod', e.target.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">지역</label>
            <input
              type="text"
              value={form.region}
              onChange={(e) => handleChange('region', e.target.value)}
              placeholder="예: 서울, 전국"
              className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">상세 설명</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="추가 설명을 입력하세요"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-sm"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
