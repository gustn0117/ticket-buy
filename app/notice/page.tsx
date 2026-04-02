import { notices } from '@/data/mock';

export default function NoticePage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {notices.map((notice, idx) => (
          <div
            key={notice.id}
            className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              idx < notices.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium shrink-0">공지</span>
              <p className="text-sm truncate">{notice.title}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0 ml-4">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
