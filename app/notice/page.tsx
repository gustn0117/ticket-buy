'use client';

import { useState, useEffect } from 'react';
import { getNotices } from '@/lib/api';
import type { DBNotice } from '@/lib/types';

export default function NoticePage() {
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNotices()
      .then((data) => setNotices(data))
      .catch((err) => setError(err.message || '공지사항을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-[740px] mx-auto px-5 py-6">
      <h1 className="section-title">공지사항</h1>

      {loading ? (
        <div className="py-16 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
      ) : error ? (
        <div className="py-16 text-center text-red-400 text-[13px]">{error}</div>
      ) : notices.length === 0 ? (
        <div className="py-16 text-center text-zinc-400 text-[13px]">공지사항이 없습니다.</div>
      ) : (
        <div className="card overflow-hidden">
          {notices.map((notice, idx) => (
            <div
              key={notice.id}
              className={`flex items-center justify-between px-4 py-3 hover:bg-zinc-50 cursor-pointer transition-colors ${
                idx < notices.length - 1 ? 'border-b border-zinc-100' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {notice.is_pinned && <span className="badge bg-zinc-900 text-white">고정</span>}
                <span className="badge bg-zinc-100 text-zinc-500">공지</span>
                <p className="text-[13px] text-zinc-800 truncate">{notice.title}</p>
              </div>
              <span className="text-[11px] text-zinc-400 shrink-0 ml-4">
                {new Date(notice.created_at).toLocaleDateString('ko-KR')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
