'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // 일자별로 1회 기록 (날짜가 바뀌면 다시 기록)
    const today = new Date().toISOString().slice(0, 10);
    const key = 'visited_date';
    if (sessionStorage.getItem(key) === today) return;
    sessionStorage.setItem(key, today);
    fetch('/api/visitors', { method: 'POST', cache: 'no-store' }).catch(() => {});
  }, []);

  return null;
}
