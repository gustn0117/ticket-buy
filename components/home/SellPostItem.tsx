import Link from 'next/link';
import type { DBPost, DBUser } from '@/lib/types';
import { getCategoryName } from '@/data/mock';

interface SellPostItemProps {
  post: DBPost & { author?: DBUser };
  num?: number;
}

export default function SellPostItem({ post, num }: SellPostItemProps) {
  return (
    <Link href={`/board/${post.id}`} className="block">
      <div className="flex items-center py-3 px-4 hover:bg-zinc-50 border-b border-zinc-100 transition-colors last:border-b-0 gap-3">
        {num !== undefined && (
          <span className="text-[12px] text-zinc-400 w-6 text-center shrink-0 tabular-nums">{num}</span>
        )}
        <span className="badge bg-zinc-100 text-zinc-500 shrink-0">{getCategoryName(post.category)}</span>
        <span className="text-[13px] text-zinc-800 truncate flex-1">{post.title}</span>
        {post.tags?.map((tag) => (
          <span key={tag} className="text-[10px] text-zinc-400 shrink-0 hidden md:inline">{tag}</span>
        ))}
        {(Date.now() - new Date(post.created_at).getTime() < 3 * 86400000) && <span className="badge bg-zinc-900 text-white shrink-0">N</span>}
        <div className="shrink-0 ml-auto flex items-baseline gap-1.5 pl-4">
          <span className="text-[13px] font-semibold text-red-500">{post.discount}%</span>
          <span className="text-[13px] font-semibold text-zinc-900">{post.price.toLocaleString()}원</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 ml-4 text-[11px] text-zinc-400 shrink-0">
          <span>{post.author?.name ?? '-'}</span>
          <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
        </div>
      </div>
    </Link>
  );
}
