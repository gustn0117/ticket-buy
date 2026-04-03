'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

const mockCustomers = [
  { id: 1, name: '김철수', trades: 3, totalAmount: 150000, completed: 0, ongoing: 3, delayed: 0 },
  { id: 2, name: '박영희', trades: 1, totalAmount: 50000, completed: 1, ongoing: 0, delayed: 0 },
  { id: 3, name: '이지현', trades: 2, totalAmount: 100000, completed: 1, ongoing: 1, delayed: 0 },
];

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden animate-fade-in">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-extrabold text-base tracking-tight">고객별 집계</h3>
        </div>

        <table className="w-full text-[13px]">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs">고객명</th>
              <th className="text-center py-3.5 px-5 font-semibold text-gray-500 text-xs">총 거래건수</th>
              <th className="text-right py-3.5 px-5 font-semibold text-gray-500 text-xs">총 거래금액</th>
              <th className="text-center py-3.5 px-5 font-semibold text-gray-500 text-xs">완료</th>
              <th className="text-center py-3.5 px-5 font-semibold text-gray-500 text-xs">진행중</th>
              <th className="text-center py-3.5 px-5 font-semibold text-gray-500 text-xs">지연</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-[11px] text-gray-500 font-bold">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 text-center text-gray-700">{c.trades}건</td>
                <td className="py-3.5 px-5 text-right font-semibold text-gray-900">{c.totalAmount.toLocaleString()}원</td>
                <td className="py-3.5 px-5 text-center">
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg font-medium">{c.completed}건</span>
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-medium">{c.ongoing}건</span>
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-lg font-medium">{c.delayed}건</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
