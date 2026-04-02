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
    <div className="relative rounded-xl overflow-hidden bg-gray-900 text-white group hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
      {/* Premium badge */}
      <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
        PRO
      </div>

      <div className="p-5">
        {/* Company name */}
        <h3 className="text-lg font-bold mb-1.5 tracking-tight">{name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">{description}</p>

        {/* Brand tags */}
        <div className="flex gap-1.5 mb-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-gray-300"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Phone */}
        <div className="bg-primary/90 rounded-lg py-2 px-4 flex items-center justify-center gap-2 mb-2.5">
          <Phone size={13} />
          <span className="font-semibold text-sm tracking-wide">{phone}</span>
        </div>
        <p className="text-[10px] text-gray-500 text-center mb-2.5">로그인 시 전체 번호 확인</p>

        {/* Region */}
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <MapPin size={11} />
          <span>{region}</span>
        </div>
      </div>
    </div>
  );
}
