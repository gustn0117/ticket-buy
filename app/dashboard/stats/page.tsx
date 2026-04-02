'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function StatsPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">한달간 구매금액</p>
          <p className="text-3xl font-bold">150,000<span className="text-base text-gray-400">원</span></p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">완료 금액</p>
          <p className="text-3xl font-bold text-green-600">0<span className="text-base text-gray-400">원</span></p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">손해 금액</p>
          <p className="text-3xl font-bold text-red-500">0<span className="text-base text-gray-400">원</span></p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-base mb-4">월별 거래 추이</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          거래 데이터가 쌓이면 차트가 표시됩니다.
        </div>
      </div>
    </DashboardLayout>
  );
}
