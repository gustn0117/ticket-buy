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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-base mb-4">스케줄 현황</h3>
          <div className="text-center mb-3">
            <span className="font-medium">March {year}</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
            {daysOfWeek.map(d => (
              <div key={d} className="py-1 text-gray-500 font-medium">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-center">
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className={`py-1.5 rounded ${
                  day === today
                    ? 'bg-primary text-white font-bold'
                    : day === 19
                    ? 'bg-red-100 text-red-600'
                    : day ? 'hover:bg-gray-100 cursor-pointer' : ''
                }`}
              >
                {day || ''}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2 text-[10px] text-gray-400 flex-wrap">
            <span>전체보기</span>
            <span className="text-green-500">초록: 완료</span>
            <span className="text-blue-500">파랑: 진행중</span>
            <span className="text-red-500">빨강: 미수</span>
          </div>

          {/* Reminder toggles */}
          <div className="mt-4 text-sm space-y-2">
            <p className="text-xs text-gray-500 font-medium">예약 리마인드 문자 (보류)</p>
            <label className="flex items-center justify-between">
              <span className="text-xs">3일 전</span>
              <button
                onClick={() => setReminder3Days(!reminder3Days)}
                className={`w-10 h-5 rounded-full transition-colors ${reminder3Days ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${reminder3Days ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-xs">1일 전 (당일 아침)</span>
              <button
                onClick={() => setReminderMorning(!reminderMorning)}
                className={`w-10 h-5 rounded-full transition-colors ${reminderMorning ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${reminderMorning ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
          </div>
        </div>

        {/* Stats + Table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Amount Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">총역</p>
              <p className="text-xl font-bold">150,000<span className="text-sm">원</span></p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">미수</p>
              <p className="text-xl font-bold text-red-500">0<span className="text-sm">원</span></p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">완료</p>
              <p className="text-xl font-bold text-green-600">0<span className="text-sm">원</span></p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {['전체', '완료', '미수', '진행중'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded text-xs font-medium ${
                  filterTab === tab ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">날짜</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">남은 일수</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">상대방</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">상품</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">금역</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">구분</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4 text-blue-500 font-medium">{item.dDay}</td>
                    <td className="py-3 px-4">{item.partner} ▶</td>
                    <td className="py-3 px-4">{item.product}</td>
                    <td className="py-3 px-4 text-right">{item.amount.toLocaleString()}원</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">진행중</span>
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
