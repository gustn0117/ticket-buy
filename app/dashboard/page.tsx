'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm text-gray-500 mb-1">거래완료</h3>
          <p className="text-2xl font-bold text-green-600">0건</p>
          <p className="text-xs text-gray-400 mt-1">거래중 1건 · 지연중 0건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm text-gray-500 mb-1">스케줄 현황 (예약 도래)</h3>
          <div className="text-sm space-y-1 mt-2">
            <p>총역 <span className="font-bold">150,000원</span></p>
            <p>미수 <span className="text-red-500 font-bold">0건 0원</span></p>
            <p>오늘 도래 <span className="text-blue-500 font-bold">0건 0원</span></p>
            <p>3일 이내 <span className="font-bold">0건 0원</span></p>
            <p>7일 이내 <span className="font-bold">3건 150,000원</span></p>
            <p>14일 이내 <span className="font-bold">0건 0원</span></p>
            <p>14일 초과 <span className="font-bold">0건 0원</span></p>
            <p>완료 <span className="text-green-500 font-bold">0건 0원</span></p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm text-gray-500 mb-1">통계</h3>
          <div className="text-sm space-y-1 mt-2">
            <p>총 완료 건수 <span className="font-bold">0건</span></p>
            <p>총 완료 금액 <span className="font-bold">0원</span></p>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-base mb-4">거래 내역</h3>
        <div className="flex gap-4 text-sm mb-4">
          <span>거래완료 <span className="text-green-600 font-bold">0건</span> (0원)</span>
          <span>거래중 <span className="text-blue-600 font-bold">1건</span></span>
          <span>지연중 <span className="text-red-600 font-bold">0건</span></span>
        </div>
        <div className="text-center text-gray-400 text-sm py-8">
          최근 거래 내역이 표시됩니다.
        </div>
      </div>
    </DashboardLayout>
  );
}
