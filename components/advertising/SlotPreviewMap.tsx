'use client';

import { useState, useEffect } from 'react';
import { MousePointerClick } from 'lucide-react';

const SLOTS: { key: string; label: string; box: { top: string; left: string; width: string; height: string } }[] = [
  { key: 'hero_banner',    label: '메인 히어로 배너',    box: { top: '6%',  left: '6%',  width: '88%', height: '14%' } },
  { key: 'main_top',       label: '메인 상단 배너',      box: { top: '24%', left: '6%',  width: '88%', height: '6%' } },
  { key: 'main_middle',    label: '메인 중간 배너',      box: { top: '48%', left: '6%',  width: '88%', height: '6%' } },
  { key: 'sidebar_top',    label: '사이드바 상단',       box: { top: '24%', left: '78%', width: '16%', height: '14%' } },
  { key: 'sidebar_bottom', label: '사이드바 하단',       box: { top: '64%', left: '78%', width: '16%', height: '14%' } },
  { key: 'board_top',      label: '게시판 상단',         box: { top: '36%', left: '6%',  width: '88%', height: '6%' } },
  { key: 'board_between',  label: '게시판 목록 사이',    box: { top: '56%', left: '6%',  width: '88%', height: '4%' } },
  { key: 'detail_bottom',  label: '게시글 상세 하단',    box: { top: '70%', left: '6%',  width: '88%', height: '6%' } },
  { key: 'chat_top',       label: '채팅 상단',           box: { top: '32%', left: '24%', width: '50%', height: '4%' } },
  { key: 'footer_banner',  label: '푸터 상단 배너',      box: { top: '88%', left: '6%',  width: '88%', height: '6%' } },
  { key: 'popup',          label: '팝업 광고',           box: { top: '32%', left: '32%', width: '36%', height: '36%' } },
];

/**
 * 광고 슬롯 위치를 시각화하는 인터랙티브 미니 페이지 미리보기.
 * GIF 대신 hover/auto-rotate 로 해당 슬롯 위치에 빨강 깜빡임 효과를 줘서 어디 노출되는지 보여줌.
 */
export default function SlotPreviewMap() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // 자동 순환 (hover 시 정지)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % SLOTS.length), 1800);
    return () => clearInterval(t);
  }, [paused]);

  const current = SLOTS[active];

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-zinc-50">
        <div>
          <h3 className="text-[14px] font-bold text-zinc-800 flex items-center gap-1.5">
            <MousePointerClick size={14} className="text-accent" />
            광고 노출 위치 미리보기
          </h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">슬롯명을 클릭하면 페이지 내 노출 위치가 표시됩니다.</p>
        </div>
        <span className="text-[11px] text-zinc-400">PC / 모바일 동일하게 노출</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-0 md:gap-3 p-4">
        {/* 좌: 페이지 미니어처 */}
        <div
          className="relative bg-zinc-100 border border-zinc-200 overflow-hidden"
          style={{ aspectRatio: '4 / 5', maxWidth: '100%' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 페이지 와이어프레임 (헤더, 콘텐츠 더미) */}
          <div className="absolute inset-x-0 top-0 h-[5%] bg-zinc-300" />
          <div className="absolute left-[6%] top-[24%] w-[68%] h-[10%] bg-white border border-zinc-200" />
          <div className="absolute left-[6%] top-[36%] w-[68%] h-[10%] bg-white border border-zinc-200" />
          <div className="absolute left-[6%] top-[48%] w-[68%] h-[14%] bg-white border border-zinc-200" />
          <div className="absolute left-[6%] top-[64%] w-[68%] h-[14%] bg-white border border-zinc-200" />

          {/* 슬롯 영역들 — 비활성 회색, 활성은 빨강 깜빡임 */}
          {SLOTS.map((slot, i) => {
            const isActive = i === active;
            return (
              <div
                key={slot.key}
                className={`absolute border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-accent bg-accent/30 animate-pulse z-10 shadow-lg'
                    : 'border-zinc-300 bg-white/40'
                }`}
                style={slot.box}
                title={slot.label}
              >
                {isActive && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-bold text-white bg-accent whitespace-nowrap">
                    {slot.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 우: 슬롯 목록 */}
        <ul className="grid grid-cols-2 md:grid-cols-1 gap-1 mt-3 md:mt-0 max-h-[420px] overflow-y-auto">
          {SLOTS.map((slot, i) => {
            const isActive = i === active;
            return (
              <li key={slot.key}>
                <button
                  type="button"
                  onClick={() => { setActive(i); setPaused(true); }}
                  onMouseEnter={() => { setActive(i); setPaused(true); }}
                  onMouseLeave={() => setPaused(false)}
                  className={`w-full text-left px-3 py-2 text-[12.5px] border transition-colors ${
                    isActive
                      ? 'border-accent bg-accent-bg text-accent font-bold'
                      : 'border-zinc-200 text-zinc-600 hover:border-accent hover:text-accent'
                  }`}
                >
                  {slot.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-4 py-2.5 border-t border-zinc-100 bg-zinc-50 text-[11px] text-zinc-500 text-center">
        💡 슬롯 위에 마우스를 올리면 해당 위치가 빨갛게 표시됩니다. 자동으로 1.8초마다 순환됩니다.
      </div>
    </div>
  );
}
