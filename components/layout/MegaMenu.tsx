'use client';

import Link from 'next/link';
import { useState, useRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface MegaMenuItem {
  label: string;
  href: string;
  highlight?: boolean;
}

interface MegaMenuProps {
  trigger: ReactNode;
  items: MegaMenuItem[];
  /** 트리거 클릭 시 이동할 경로 (옵션) */
  href?: string;
  className?: string;
  /** 펼침 메뉴 너비 (기본 180px) */
  panelWidth?: number;
}

/**
 * 헤더 호버 드롭다운.
 * 트리거 위에 마우스 올리면 아래로 패널 펼침.
 * 마우스 빠지면 150ms 디바운스 후 닫힘 → 잠깐 빠져도 메뉴 항목 클릭 가능.
 */
export default function MegaMenu({ trigger, items, href, className = '', panelWidth = 180 }: MegaMenuProps) {
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
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const TriggerEl = href ? Link : 'div';

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
      onFocus={() => { cancelClose(); setOpen(true); }}
      onBlur={scheduleClose}
    >
      <TriggerEl
        // @ts-expect-error - Link uses href, div ignores it
        href={href}
        className="flex items-center gap-1 cursor-pointer select-none"
      >
        {trigger}
      </TriggerEl>

      {open && (
        <div
          className="absolute left-0 top-full z-50 pt-1"
          style={{ width: panelWidth }}
        >
          <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 text-[12.5px] border-b border-gray-100 last:border-b-0 transition-colors ${
                  item.highlight
                    ? 'text-accent font-bold hover:bg-accent-bg'
                    : 'text-gray-700 hover:text-accent hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
