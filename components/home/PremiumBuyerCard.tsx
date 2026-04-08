import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import type { DBPremiumBuyer } from '@/lib/types';
// 판매자는 비회원도 구매자 번호를 볼 수 있음

const TIER_BADGE: Record<string, string> = {
  premium: 'bg-yellow-50 text-yellow-600',
  standard: 'bg-blue-50 text-blue-600',
  basic: 'bg-zinc-100 text-zinc-500',
};
const TIER_LABEL: Record<string, string> = { premium: 'PREMIUM', standard: 'PRO', basic: 'BASIC' };

export default function PremiumBuyerCard({ id, name, description, brands, phone, region, tier }: DBPremiumBuyer) {
  return (
    <Link href={`/buyer/${id}`} className="card card-hover flex flex-col p-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-semibold text-zinc-900">{name}</h3>
        <span className={`badge ${TIER_BADGE[tier] || TIER_BADGE.standard}`}>{TIER_LABEL[tier] || 'PRO'}</span>
      </div>
      <p className="text-[12px] text-zinc-500 line-clamp-2 leading-relaxed mb-3 min-h-[2.4em]">{description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {brands?.map((brand) => (
          <span key={brand} className="badge bg-zinc-100 text-zinc-600">{brand}</span>
        ))}
      </div>
      <div className="mt-auto">
        <div className="btn-primary w-full h-[34px] text-[12px] rounded">
          <Phone size={12} />{phone || '연락처 비공개'}
        </div>
        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400">
          <span>클릭하여 상세 보기</span>
          {region && <span className="flex items-center gap-0.5"><MapPin size={9} />{region}</span>}
        </div>
      </div>
    </Link>
  );
}
