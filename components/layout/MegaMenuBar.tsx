'use client';

import Link from 'next/link';
import { useRef, useState, ReactNode } from 'react';

export interface MegaMenuLink {
  label: string;
  href: string;
  highlight?: boolean;
  badge?: string;
  badgeCls?: string;
}

export interface MegaMenuColumn {
  /** 트리거 라벨 (헤더 바에 표시) */
  title: string;
  /** 트리거 자체 클릭 시 이동할 경로. 없으면 트리거는 클릭 비활성 */
  href?: string;
  /** 트리거 옆에 붙는 작은 뱃지 (예: HOT, N) */
  badge?: ReactNode;
  /** 드롭다운 하위 항목들. 빈 배열이면 트리거만 노출되고 드롭다운 컬럼이 비어 보임 */
  items: MegaMenuLink[];
}

interface MegaMenuBarProps {
  columns: MegaMenuColumn[];
  /** 우측에 추가로 붙을 보조 메뉴 (드롭다운 없는 단일 링크 등) */
  rightExtra?: ReactNode;
}

/**
 * 헤더 메가메뉴 바.
 * 어떤 컬럼 트리거든 hover 진입 시 → 모든 컬럼의 하위 항목이 한 번에 펼쳐짐.
 * 마우스가 trigger row + panel 영역 모두에서 빠지면 200ms 디바운스 후 닫힘.
 */
export default function MegaMenuBar({ columns, rightExtra }: MegaMenuBarProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  const handleEnter = () => {
    cancelClose();
    setOpen(true);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {columns.map((col) => {
            const TriggerEl = col.href ? Link : 'span';
            return (
              <TriggerEl
                key={col.title}
                // @ts-expect-error - Link uses href, span ignores
                href={col.href}
                className="flex items-center gap-1 px-4 py-3 text-[13px] font-bold text-gray-800 hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent cursor-pointer"
              >
                {col.title}
                {col.badge}
              </TriggerEl>
            );
          })}
        </div>
        {rightExtra && <div className="flex items-center gap-1">{rightExtra}</div>}
      </div>

      {/* Unified dropdown panel */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 pt-px"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="bg-white border-t border-b border-gray-200 shadow-lg">
            <div className="container-main">
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
              >
                {columns.map((col) => (
                  <div key={col.title} className="border-r border-gray-100 last:border-r-0 px-4 py-4">
                    <p className="text-[12px] font-bold text-gray-400 mb-2 tracking-wide">
                      {col.title}
                    </p>
                    <ul className="space-y-1.5">
                      {col.items.map((item) => (
                        <li key={item.href + item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block text-[12.5px] hover:underline ${
                              item.highlight
                                ? 'text-accent font-semibold'
                                : 'text-gray-700 hover:text-accent'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      {col.items.length === 0 && (
                        <li className="text-[11px] text-gray-300">하위 메뉴 없음</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
