'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">거래완료</h3>
          <p className="text-3xl font-extrabold text-emerald-600 tracking-tight">0<span className="text-lg font-semibold text-gray-400 ml-0.5">건</span></p>
          <p className="text-xs text-gray-400 mt-2">거래중 1건 / 지연중 0건</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">스케줄 현황</h3>
          <div className="text-sm space-y-1.5 mt-2">
            <div className="flex justify-between"><span className="text-gray-500">총역</span><span className="font-bold text-gray-900">150,000원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">미수</span><span className="font-bold text-red-500">0건 0원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">오늘 도래</span><span className="font-bold text-blue-500">0건 0원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">7일 이내</span><span className="font-bold">3건 150,000원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">완료</span><span className="font-bold text-emerald-500">0건 0원</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">통계</h3>
          <div className="text-sm space-y-1.5 mt-2">
            <div className="flex justify-between"><span className="text-gray-500">총 완료 건수</span><span className="font-bold">0건</span></div>
            <div className="flex justify-between"><span className="text-gray-500">총 완료 금액</span><span className="font-bold">0원</span></div>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
        <h3 className="font-bold text-sm mb-4">거래 내역</h3>
        <div className="flex gap-5 text-sm mb-4">
          <span>거래완료 <span className="text-emerald-600 font-bold">0건</span> (0원)</span>
          <span>거래중 <span className="text-blue-600 font-bold">1건</span></span>
          <span>지연중 <span className="text-red-500 font-bold">0건</span></span>
        </div>
        <div className="text-center text-gray-400 text-sm py-10 bg-gray-50 rounded-xl">
          최근 거래 내역이 표시됩니다.
        </div>
      </div>
    </DashboardLayout>
  );
}
