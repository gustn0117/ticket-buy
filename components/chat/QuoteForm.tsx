'use client';

import { useState } from 'react';

interface QuoteFormProps {
  onSubmit: (data: QuoteData) => void;
  onClose: () => void;
}

export interface QuoteData {
  quantity: number;
  pricePerUnit: number;
  faceValuePerUnit: number;
  discount: number;
  deliveryDate: string;
}

export default function QuoteForm({ onSubmit, onClose }: QuoteFormProps) {
  const [form, setForm] = useState({
    quantity: '1',
    pricePerUnit: '70000',
    faceValuePerUnit: '100000',
    deliveryDate: '2026-03-25',
    instantDelivery: false,
  });

  const quantity = Number(form.quantity) || 0;
  const price = Number(form.pricePerUnit) || 0;
  const faceValue = Number(form.faceValuePerUnit) || 0;
  const discount = faceValue > 0 ? Math.round((1 - price / faceValue) * -100) : 0;
  const totalFaceValue = faceValue * quantity;
  const totalPrice = price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      quantity,
      pricePerUnit: price,
      faceValuePerUnit: faceValue,
      discount,
      deliveryDate: form.deliveryDate,
    });
  };

  return (
    <div className="card p-5">
      <h3 className="section-title">견적 제안</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[12px] font-medium text-zinc-600 mb-1">수량 *</label>
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm(prev => ({ ...prev, quantity: e.target.value }))}
            min="1"
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-zinc-600 mb-1">개당 구매금액 (원) *</label>
          <input
            type="number"
            value={form.pricePerUnit}
            onChange={(e) => setForm(prev => ({ ...prev, pricePerUnit: e.target.value }))}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-zinc-600 mb-1">개당 상품권 금액 (원) *</label>
          <input
            type="number"
            value={form.faceValuePerUnit}
            onChange={(e) => setForm(prev => ({ ...prev, faceValuePerUnit: e.target.value }))}
            className="input"
            required
          />
        </div>

        <div className="text-[13px] text-zinc-500">
          할인율: <span className="font-semibold text-red-500">{discount}%</span>
        </div>

        <div>
          <label className="block text-[12px] font-medium text-zinc-600 mb-1">발송 예정일 (선택)</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-[13px]">
              <input
                type="checkbox"
                checked={form.instantDelivery}
                onChange={(e) => setForm(prev => ({ ...prev, instantDelivery: e.target.checked }))}
              />
              즉시발송
            </label>
          </div>
          {!form.instantDelivery && (
            <input
              type="date"
              value={form.deliveryDate}
              onChange={(e) => setForm(prev => ({ ...prev, deliveryDate: e.target.value }))}
              className="input mt-2"
            />
          )}
        </div>

        {/* Summary */}
        <div className="bg-zinc-50 rounded-lg p-4 text-[13px] space-y-1">
          <h4 className="font-medium mb-2">거래 요약</h4>
          <div className="flex justify-between"><span>수량</span><span>{quantity}건</span></div>
          <div className="flex justify-between"><span>개당 구매금액</span><span>{price.toLocaleString()}원</span></div>
          <div className="flex justify-between"><span>개당 상품권 금액</span><span>{faceValue.toLocaleString()}원</span></div>
          <div className="flex justify-between"><span>구매 금액</span><span>{totalPrice.toLocaleString()}원</span></div>
          <div className="flex justify-between"><span>상품권 총액</span><span>{totalFaceValue.toLocaleString()}원</span></div>
          <div className="flex justify-between"><span>할인율</span><span className="text-red-500">{discount}%</span></div>
          <div className="flex justify-between"><span>발송</span><span>{form.instantDelivery ? '즉시' : form.deliveryDate}</span></div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 h-10">
            취소
          </button>
          <button type="submit" className="btn-primary flex-1 h-10">
            견적 제안
          </button>
        </div>
      </form>
    </div>
  );
}
