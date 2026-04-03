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
    <div className="bg-white border border-gray-200 rounded-lg p-5 card-hover cursor-pointer group">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-900">{name}</h3>
        <span className="text-[10px] font-semibold text-gray-400 border border-gray-200 px-2 py-0.5 rounded">PRO</span>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {brands.map((brand) => (
          <span key={brand} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {brand}
          </span>
        ))}
      </div>

      <div className="bg-gray-900 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium group-hover:bg-gray-800 transition-colors">
        <Phone size={13} />
        <span>{phone}</span>
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400">
        <span>로그인 시 번호 확인</span>
        <span className="flex items-center gap-1"><MapPin size={10} />{region}</span>
      </div>
    </div>
  );
}
