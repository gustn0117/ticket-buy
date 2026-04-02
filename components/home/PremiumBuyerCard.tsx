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
    <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 text-white group hover:shadow-lg transition-shadow cursor-pointer">
      {/* Premium badge */}
      <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
        프리미엄
      </div>

      <div className="p-4 md:p-5">
        {/* Company name */}
        <h3 className="text-xl md:text-2xl font-bold mb-2">{name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-300 line-clamp-2 mb-3 leading-relaxed">{description}</p>

        {/* Brand tags */}
        <div className="flex gap-1.5 mb-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-xs bg-white/20 px-2 py-0.5 rounded"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Phone */}
        <div className="bg-primary rounded-lg py-2.5 px-4 flex items-center gap-2 mb-2">
          <Phone size={14} />
          <span className="font-bold tracking-wide">{phone}</span>
        </div>
        <p className="text-[10px] text-gray-400 text-center mb-2">로그인 시 전체 번호 · 전화 연결</p>

        {/* Region */}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin size={12} />
          <span>{region}</span>
        </div>
      </div>
    </div>
  );
}
