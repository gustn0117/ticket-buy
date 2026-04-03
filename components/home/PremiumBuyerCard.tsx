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
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl overflow-hidden card-hover cursor-pointer group">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_70%)]" />

      {/* PRO badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] font-bold bg-white text-gray-900 px-2.5 py-1 rounded-full shadow-lg shadow-black/10">
          PRO
        </span>
      </div>

      <div className="relative z-10 p-5">
        <h3 className="text-lg font-bold mb-1 tracking-tight">{name}</h3>
        <p className="text-[13px] text-gray-400 line-clamp-2 mb-3 leading-relaxed">{description}</p>

        {/* Brand tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {brands.map((brand) => (
            <span key={brand} className="text-[11px] bg-white/8 border border-white/10 px-2.5 py-0.5 rounded-full text-gray-300">
              {brand}
            </span>
          ))}
        </div>

        {/* Phone */}
        <div className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 transition-colors">
          <Phone size={13} strokeWidth={2.5} />
          <span className="font-bold text-sm tracking-wide">{phone}</span>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-2">로그인 시 전체 번호 확인</p>

        {/* Region */}
        <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 mt-2">
          <MapPin size={10} />
          <span>{region}</span>
        </div>
      </div>
    </div>
  );
}
