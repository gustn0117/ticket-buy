'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function StatsPage() {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Monthly Purchase */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">한달간 구매금액</p>
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-gray-900">150,000<span className="text-sm text-gray-400 font-medium ml-1">원</span></p>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">완료 금액</p>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-emerald-600">0<span className="text-sm text-gray-400 font-medium ml-1">원</span></p>
          </div>

          {/* Loss */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">손해 금액</p>
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-red-500">0<span className="text-sm text-gray-400 font-medium ml-1">원</span></p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6">
          <h3 className="font-extrabold text-base tracking-tight mb-5">월별 거래 추이</h3>
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-sm bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
            <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            거래 데이터가 쌓이면 차트가 표시됩니다.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
