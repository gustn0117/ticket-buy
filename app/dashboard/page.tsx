'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs text-gray-400 mb-1">거래완료</p>
          <p className="text-2xl font-bold">0<span className="text-sm font-normal text-gray-400 ml-0.5">건</span></p>
          <p className="text-xs text-gray-400 mt-2">거래중 1건 / 지연중 0건</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs text-gray-400 mb-1">스케줄 현황</p>
          <div className="text-sm space-y-1 mt-2">
            <div className="flex justify-between"><span className="text-gray-500">총역</span><span className="font-medium">150,000원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">미수</span><span className="font-medium text-red-500">0건 0원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">오늘 도래</span><span className="font-medium text-blue-600">0건 0원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">7일 이내</span><span className="font-medium">3건 150,000원</span></div>
            <div className="flex justify-between"><span className="text-gray-500">완료</span><span className="font-medium">0건 0원</span></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs text-gray-400 mb-1">통계</p>
          <div className="text-sm space-y-1 mt-2">
            <div className="flex justify-between"><span className="text-gray-500">총 완료 건수</span><span className="font-medium">0건</span></div>
            <div className="flex justify-between"><span className="text-gray-500">총 완료 금액</span><span className="font-medium">0원</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-sm font-bold mb-3">거래 내역</h3>
        <div className="flex gap-4 text-sm mb-4">
          <span>거래완료 <span className="font-medium">0건</span> (0원)</span>
          <span>거래중 <span className="font-medium text-blue-600">1건</span></span>
          <span>지연중 <span className="font-medium text-red-500">0건</span></span>
        </div>
        <div className="text-center text-gray-400 text-sm py-10 bg-gray-50 rounded-md">
          최근 거래 내역이 표시됩니다.
        </div>
      </div>
    </DashboardLayout>
  );
}
