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
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-base mb-3">거래 내역</h3>
          <div className="flex gap-2">
            {['전체', '진행중', '완료', '취소', '지연'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded text-xs font-medium ${
                  filter === tab ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500">날짜</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">상대방</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">상품</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">금액</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">유형</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">상태</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4">{tx.date}</td>
                <td className="py-3 px-4">{tx.partner}</td>
                <td className="py-3 px-4">{tx.product}</td>
                <td className="py-3 px-4 text-right font-medium">{tx.amount.toLocaleString()}원</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tx.type}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    tx.status === '완료' ? 'bg-green-100 text-green-600' :
                    tx.status === '진행중' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mockTransactions.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">거래 내역이 없습니다.</div>
        )}
      </div>
    </DashboardLayout>
  );
}
