'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { getNotices } from '@/lib/api';
import type { DBNotice } from '@/lib/types';

export default function SideNotices() {
  const [notices, setNotices] = useState<DBNotice[]>([]);

  useEffect(() => {
    getNotices()
      .then((data) => setNotices(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-zinc-600" />
          <h3 className="text-[13px] font-semibold text-zinc-800">공지사항</h3>
        </div>
        <Link href="/notice" className="text-[10px] text-zinc-400 hover:text-zinc-600">전체보기</Link>
      </div>
      {notices.length === 0 ? (
        <p className="text-[12px] text-zinc-400 py-2 text-center">공지사항이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {notices.map((notice) => (
            <div key={notice.id} className="border-b border-zinc-50 pb-2 last:border-0 last:pb-0">
              <p className="text-[12px] text-zinc-700 truncate">{notice.title}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {new Date(notice.created_at).toLocaleDateString('ko-KR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
