import { notices } from '@/data/mock';

export default function NoticePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <h1 className="text-lg font-bold mb-5">공지사항</h1>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {notices.map((notice, idx) => (
          <div
            key={notice.id}
            className={`flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 cursor-pointer transition-colors ${
              idx < notices.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-[10px] text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded shrink-0">공지</span>
              <p className="text-[13px] text-gray-800 truncate">{notice.title}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0 ml-4">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
