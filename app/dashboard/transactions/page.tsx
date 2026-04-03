'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const mockTransactions = [
  { id: 1, date: '2026.03.25', partner: '김철수', product: '롯데 7만원권', amount: 50000, status: '진행중', type: '매입' },
  { id: 2, date: '2026.03.25', partner: '김철수', product: '롯데 7만원권', amount: 50000, status: '진행중', type: '매입' },
  { id: 3, date: '2026.03.25', partner: '김철수', product: '롯데 7만원권', amount: 50000, status: '진행중', type: '매입' },
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState('전체');

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden animate-fade-in">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-extrabold text-base tracking-tight mb-4">거래 내역</h3>
          {/* Segmented Control */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['전체', '진행중', '완료', '취소', '지연'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filter === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-[13px]">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs">날짜</th>
              <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs">상대방</th>
              <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs">상품</th>
              <th className="text-right py-3.5 px-5 font-semibold text-gray-500 text-xs">금액</th>
              <th className="text-center py-3.5 px-5 font-semibold text-gray-500 text-xs">유형</th>
              <th className="text-center py-3.5 px-5 font-semibold text-gray-500 text-xs">상태</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                <td className="py-3.5 px-5 text-gray-600">{tx.date}</td>
                <td className="py-3.5 px-5 text-gray-700 font-medium">{tx.partner}</td>
                <td className="py-3.5 px-5 text-gray-700">{tx.product}</td>
                <td className="py-3.5 px-5 text-right font-semibold text-gray-900">{tx.amount.toLocaleString()}원</td>
                <td className="py-3.5 px-5 text-center">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">{tx.type}</span>
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                    tx.status === '완료' ? 'bg-gray-50 text-gray-900' :
                    tx.status === '진행중' ? 'bg-blue-50 text-blue-600' :
                    tx.status === '취소' ? 'bg-red-50 text-red-600' :
                    tx.status === '지연' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mockTransactions.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-sm">
            거래 내역이 없습니다.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
