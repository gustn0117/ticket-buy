'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { scheduleData } from '@/data/mock';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function SchedulePage() {
  const [currentMonth] = useState(new Date(2026, 2)); // March 2026
  const [reminder3Days, setReminder3Days] = useState(false);
  const [reminderMorning, setReminderMorning] = useState(false);
  const [filterTab, setFilterTab] = useState('전체');

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const today = 25; // mock

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6">
          <h3 className="font-extrabold text-base tracking-tight mb-5">스케줄 현황</h3>
          <div className="text-center mb-4">
            <span className="font-semibold text-gray-900">March {year}</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
            {daysOfWeek.map(d => (
              <div key={d} className="py-1.5 text-gray-400 font-semibold uppercase text-[11px]">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-center">
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className={`py-2 rounded-lg font-medium transition-all ${
                  day === today
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold shadow-sm shadow-emerald-500/20'
                    : day === 19
                    ? 'bg-red-50 text-red-600 font-semibold'
                    : day ? 'hover:bg-gray-100 cursor-pointer text-gray-700' : ''
                }`}
              >
                {day || ''}
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3 text-[11px] text-gray-400 flex-wrap">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-400 rounded-full" />완료</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full" />진행중</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full" />미수</span>
          </div>

          {/* Reminder toggles */}
          <div className="mt-5 pt-5 border-t border-gray-100 text-sm space-y-3">
            <p className="text-xs text-gray-500 font-semibold">예약 리마인드 문자 (보류)</p>
            <label className="flex items-center justify-between">
              <span className="text-xs text-gray-600">3일 전</span>
              <button
                onClick={() => setReminder3Days(!reminder3Days)}
                className={`w-11 h-6 rounded-full transition-colors ${reminder3Days ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${reminder3Days ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-xs text-gray-600">1일 전 (당일 아침)</span>
              <button
                onClick={() => setReminderMorning(!reminderMorning)}
                className={`w-11 h-6 rounded-full transition-colors ${reminderMorning ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${reminderMorning ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
          </div>
        </div>

        {/* Stats + Table */}
        <div className="lg:col-span-2 space-y-5">
          {/* Amount Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-5 text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-gray-500 text-sm font-bold">T</span>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-1">총역</p>
              <p className="text-xl font-extrabold tracking-tight text-gray-900">150,000<span className="text-xs text-gray-400 font-medium ml-0.5">원</span></p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-5 text-center">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-red-500 text-sm font-bold">!</span>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-1">미수</p>
              <p className="text-xl font-extrabold tracking-tight text-red-500">0<span className="text-xs text-gray-400 font-medium ml-0.5">원</span></p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-5 text-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-emerald-500 text-sm font-bold">V</span>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-1">완료</p>
              <p className="text-xl font-extrabold tracking-tight text-emerald-600">0<span className="text-xs text-gray-400 font-medium ml-0.5">원</span></p>
            </div>
          </div>

          {/* Filter Tabs - Segmented Control */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['전체', '완료', '미수', '진행중'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filterTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs">날짜</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs">남은 일수</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs">상대방</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs">상품</th>
                  <th className="text-right py-3.5 px-4 font-semibold text-gray-500 text-xs">금역</th>
                  <th className="text-center py-3.5 px-4 font-semibold text-gray-500 text-xs">구분</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-gray-700">{item.date}</td>
                    <td className="py-3.5 px-4 text-blue-500 font-semibold">{item.dDay}</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.partner} ▶</td>
                    <td className="py-3.5 px-4 text-gray-700">{item.product}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-gray-900">{item.amount.toLocaleString()}원</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg font-medium">진행중</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
