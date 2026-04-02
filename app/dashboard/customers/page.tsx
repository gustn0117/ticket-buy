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
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-base">고객별 집계</h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500">고객명</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">총 거래건수</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">총 거래금액</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">완료</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">진행중</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">지연</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4 font-medium">{c.name}</td>
                <td className="py-3 px-4 text-center">{c.trades}건</td>
                <td className="py-3 px-4 text-right font-medium">{c.totalAmount.toLocaleString()}원</td>
                <td className="py-3 px-4 text-center text-green-600">{c.completed}건</td>
                <td className="py-3 px-4 text-center text-blue-600">{c.ongoing}건</td>
                <td className="py-3 px-4 text-center text-red-600">{c.delayed}건</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
