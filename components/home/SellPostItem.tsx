import Link from 'next/link';
import type { Post } from '@/data/mock';

interface SellPostItemProps {
  post: Post;
}

export default function SellPostItem({ post }: SellPostItemProps) {
  return (
    <Link href={`/board/${post.id}`} className="block">
      <div className="flex items-center justify-between py-3 px-5 hover:bg-gray-50 border-b border-gray-100 transition-colors last:border-b-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded shrink-0">{post.categoryName}</span>
          <span className="text-[13px] text-gray-800 truncate">{post.title}</span>
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-gray-400 shrink-0 hidden md:inline">{tag}</span>
          ))}
          {post.isNew && (
            <span className="text-[10px] bg-gray-900 text-white px-1.5 py-px rounded shrink-0 font-medium">N</span>
          )}
        </div>
        <div className="text-right shrink-0 ml-4 flex items-baseline gap-1.5">
          <span className="text-[13px] font-bold text-red-500">{post.discount}%</span>
          <span className="text-[13px] font-bold text-gray-900">{post.price.toLocaleString()}원</span>
        </div>
        <div className="hidden lg:flex items-center gap-4 ml-6 text-xs text-gray-400 shrink-0">
          <span>{post.author}</span>
          <span>{post.createdAt.split(' ')[0]}</span>
        </div>
      </div>
    </Link>
  );
}
