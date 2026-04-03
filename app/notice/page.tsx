import { notices } from '@/data/mock';

export default function NoticePage() {
  return (
    <div className="max-w-[740px] mx-auto px-5 py-6">
      <h1 className="section-title">공지사항</h1>

      <div className="card overflow-hidden">
        {notices.map((notice, idx) => (
          <div
            key={notice.id}
            className={`flex items-center justify-between px-4 py-3 hover:bg-zinc-50 cursor-pointer transition-colors ${
              idx < notices.length - 1 ? 'border-b border-zinc-100' : ''
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="badge bg-zinc-100 text-zinc-500">공지</span>
              <p className="text-[13px] text-zinc-800 truncate">{notice.title}</p>
            </div>
            <span className="text-[11px] text-zinc-400 shrink-0 ml-4">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
