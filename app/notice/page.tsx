import { notices } from '@/data/mock';

export default function NoticePage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-8">
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">공지사항</h1>

      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {notices.map((notice, idx) => (
          <div
            key={notice.id}
            className={`flex items-center justify-between px-5 py-4.5 hover:bg-emerald-50/30 cursor-pointer transition-colors ${
              idx < notices.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg font-semibold shrink-0">공지</span>
              <p className="text-sm text-gray-800 truncate font-medium">{notice.title}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0 ml-4">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
