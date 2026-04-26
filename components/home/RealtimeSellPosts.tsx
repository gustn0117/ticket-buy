import Link from 'next/link';
import { ChevronRight, Tag } from 'lucide-react';
import type { DBPost, DBUser } from '@/lib/types';
import { getCategoryName } from '@/data/mock';

interface Props {
  posts: (DBPost & { author?: DBUser })[];
  loading?: boolean;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}일 전`;
  const date = new Date(iso);
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

export default function RealtimeSellPosts({ posts, loading }: Props) {
  return (
    <section className="bg-white border border-gray-200 mb-5">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-[14px] font-bold text-gray-800 flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <Tag size={13} className="text-accent" />
          실시간 판매문의
          {!loading && (
            <span className="text-[11px] text-gray-400 font-normal ml-1">{posts.length}건</span>
          )}
        </h3>
        <Link
          href="/board?tab=sell"
          className="text-[12px] text-gray-500 hover:text-accent flex items-center gap-0.5"
        >
          전체보기 <ChevronRight size={11} />
        </Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-[13px] text-gray-400">불러오는 중...</div>
      ) : posts.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-[13px] text-gray-500 mb-2">아직 등록된 판매 문의가 없습니다.</p>
          <Link href="/board/write?type=sell" className="text-[12px] text-accent font-bold hover:underline">
            첫 판매글 작성하기 →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0">
          {posts.slice(0, 12).map((post) => {
            const isNew = Date.now() - new Date(post.created_at).getTime() < 86400000;
            return (
              <Link
                key={post.id}
                href={`/board/${post.id}`}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 transition-colors"
              >
                <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded bg-gray-100 text-gray-600">
                  {getCategoryName(post.category)}
                </span>
                <span className="text-[12.5px] text-gray-700 truncate flex-1 min-w-0">
                  {post.title}
                </span>
                {isNew && (
                  <span className="shrink-0 text-[9px] text-white bg-red-500 px-1 py-px rounded-sm font-bold">N</span>
                )}
                <span className="shrink-0 text-[12px] font-bold text-gray-900 tabular-nums whitespace-nowrap">
                  {post.price > 0 ? `${post.price.toLocaleString()}원` : '협의'}
                </span>
                <span className="shrink-0 hidden md:inline-block text-[10px] text-gray-400 tabular-nums w-[52px] text-right">
                  {timeAgo(post.created_at)}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && posts.length > 0 && (
        <Link
          href="/board?tab=sell"
          className="block py-2.5 text-center text-[12px] text-gray-500 hover:text-accent hover:bg-gray-50 border-t border-gray-100 transition-colors"
        >
          판매 문의 전체보기 (줄광고형) →
        </Link>
      )}
    </section>
  );
}
