import Link from 'next/link';
import type { Post } from '@/data/mock';

interface SellPostItemProps {
  post: Post;
}

export default function SellPostItem({ post }: SellPostItemProps) {
  return (
    <Link href={`/board/${post.id}`} className="block group">
      <div className="flex items-center justify-between py-4 px-5 hover:bg-emerald-50/40 border-b border-gray-100/80 transition-all duration-200 last:border-b-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Category badge */}
          <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg shrink-0 font-medium">
            {post.categoryName}
          </span>

          {/* Title + tags */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="text-sm text-gray-800 font-medium truncate group-hover:text-emerald-700 transition-colors">{post.title}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] text-gray-400 shrink-0 hidden md:inline">{tag}</span>
            ))}
            {post.isNew && (
              <span className="text-[9px] bg-emerald-500 text-white w-4 h-4 rounded-full flex items-center justify-center shrink-0 font-bold">N</span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0 ml-4">
          <span className="text-emerald-600 font-bold text-sm">{post.discount}%</span>
          <span className="text-[15px] font-bold text-gray-900 ml-2">{post.price.toLocaleString()}<span className="text-xs font-medium text-gray-500">원</span></span>
        </div>

        {/* Author + date (desktop) */}
        <div className="hidden lg:flex items-center gap-4 ml-6 text-xs text-gray-400 shrink-0">
          <span>{post.author}</span>
          <span>{post.createdAt.split(' ')[0]}</span>
        </div>
      </div>
    </Link>
  );
}
