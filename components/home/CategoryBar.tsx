'use client';

import { useState } from 'react';
import { categories } from '@/data/mock';
import { categoryIconMap } from '@/components/icons/SvgIcons';

interface CategoryBarProps {
  onSelect?: (categoryId: string) => void;
}

export default function CategoryBar({ onSelect }: CategoryBarProps) {
  const [selected, setSelected] = useState('all');

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <div className="flex overflow-x-auto gap-2 md:gap-4 py-4 px-1 scrollbar-hide">
      {categories.map((cat) => {
        const Icon = categoryIconMap[cat.id];
        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex flex-col items-center min-w-[64px] md:min-w-[72px] py-2 px-2 rounded-lg transition-colors ${
              selected === cat.id
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mb-1">{Icon ? <Icon size={28} /> : null}</span>
            <span className="text-xs font-medium whitespace-nowrap">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
