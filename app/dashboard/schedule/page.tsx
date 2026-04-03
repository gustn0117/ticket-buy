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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in">
        {/* Calendar */}
        <div className="card p-5">
          <h3 className="section-title">스케줄 현황</h3>
          <div className="text-center mb-4">
            <span className="font-medium text-[13px] text-zinc-900">March {year}</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-[11px] text-center mb-2">
            {daysOfWeek.map(d => (
              <div key={d} className="py-1.5 text-zinc-400 font-medium uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className={`py-2 rounded-md font-medium transition-colors ${
                  day === today
                    ? 'bg-zinc-900 text-white font-semibold'
                    : day === 19
                    ? 'bg-red-50 text-red-600 font-medium'
                    : day ? 'hover:bg-zinc-100 cursor-pointer text-zinc-700' : ''
                }`}
              >
                {day || ''}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3 text-[11px] text-zinc-400 flex-wrap">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-zinc-700 rounded-full" />완료</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full" />진행중</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full" />미수</span>
          </div>

          {/* Reminder toggles */}
          <div className="mt-4 pt-4 border-t border-zinc-100 space-y-3">
            <p className="text-[11px] text-zinc-500 font-medium">예약 리마인드 문자 (보류)</p>
            <label className="flex items-center justify-between">
              <span className="text-[12px] text-zinc-600">3일 전</span>
              <button
                onClick={() => setReminder3Days(!reminder3Days)}
                className={`w-11 h-6 rounded-full transition-colors ${reminder3Days ? 'bg-zinc-900' : 'bg-zinc-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${reminder3Days ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-[12px] text-zinc-600">1일 전 (당일 아침)</span>
              <button
                onClick={() => setReminderMorning(!reminderMorning)}
                className={`w-11 h-6 rounded-full transition-colors ${reminderMorning ? 'bg-zinc-900' : 'bg-zinc-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${reminderMorning ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
          </div>
        </div>

        {/* Stats + Table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Amount Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <p className="text-[11px] text-zinc-500 font-medium mb-1">총역</p>
              <p className="text-lg font-semibold text-zinc-900">150,000<span className="text-[11px] text-zinc-400 font-normal ml-0.5">원</span></p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[11px] text-zinc-500 font-medium mb-1">미수</p>
              <p className="text-lg font-semibold text-red-500">0<span className="text-[11px] text-zinc-400 font-normal ml-0.5">원</span></p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[11px] text-zinc-500 font-medium mb-1">완료</p>
              <p className="text-lg font-semibold text-zinc-900">0<span className="text-[11px] text-zinc-400 font-normal ml-0.5">원</span></p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-zinc-200">
            {['전체', '완료', '미수', '진행중'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`tab-underline ${filterTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Schedule Table */}
          <div className="card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="table-header">
                <tr>
                  <th className="text-left py-3 px-4">날짜</th>
                  <th className="text-left py-3 px-4">남은 일수</th>
                  <th className="text-left py-3 px-4">상대방</th>
                  <th className="text-left py-3 px-4">상품</th>
                  <th className="text-right py-3 px-4">금역</th>
                  <th className="text-center py-3 px-4">구분</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, idx) => (
                  <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-4 text-zinc-700">{item.date}</td>
                    <td className="py-3 px-4 text-blue-500 font-medium">{item.dDay}</td>
                    <td className="py-3 px-4 text-zinc-700">{item.partner} ▶</td>
                    <td className="py-3 px-4 text-zinc-700">{item.product}</td>
                    <td className="py-3 px-4 text-right font-medium text-zinc-900">{item.amount.toLocaleString()}원</td>
                    <td className="py-3 px-4 text-center">
                      <span className="badge bg-blue-50 text-blue-600">진행중</span>
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
