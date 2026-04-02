import Link from 'next/link';
import type { Post } from '@/data/mock';

interface SellPostItemProps {
  post: Post;
}

export default function SellPostItem({ post }: SellPostItemProps) {
  return (
    <Link href={`/board/${post.id}`} className="block">
      <div className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 border-b border-gray-100 transition-colors">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Category badge */}
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded shrink-0">
            {post.categoryName}
          </span>

          {/* Title + tags */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-sm truncate">{post.title}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] text-gray-400 shrink-0 hidden md:inline">{tag}</span>
            ))}
            {post.isNew && (
              <span className="text-[10px] bg-red-500 text-white px-1 rounded shrink-0">N</span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0 ml-4">
          <span className="text-red-500 font-bold text-sm">{post.discount}%</span>
          <span className="text-sm font-bold ml-1">{post.price.toLocaleString()}원</span>
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
