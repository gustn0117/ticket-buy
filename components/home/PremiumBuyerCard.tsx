import { Phone, MapPin } from 'lucide-react';

interface PremiumBuyerCardProps {
  name: string;
  description: string;
  brands: string[];
  phone: string;
  region: string;
}

export default function PremiumBuyerCard({ name, description, brands, phone, region }: PremiumBuyerCardProps) {
  return (
    <div className="card card-hover flex flex-col p-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-semibold text-zinc-900">{name}</h3>
        <span className="badge bg-zinc-100 text-zinc-500">PRO</span>
      </div>
      <p className="text-[12px] text-zinc-500 line-clamp-2 leading-relaxed mb-3 min-h-[2.4em]">{description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {brands.map((brand) => (
          <span key={brand} className="badge bg-zinc-100 text-zinc-600">{brand}</span>
        ))}
      </div>
      <div className="mt-auto">
        <button className="btn-primary w-full h-[34px] text-[12px] rounded">
          <Phone size={12} />{phone}
        </button>
        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400">
          <span>로그인 시 번호 확인</span>
          <span className="flex items-center gap-0.5"><MapPin size={9} />{region}</span>
        </div>
      </div>
    </div>
  );
}
