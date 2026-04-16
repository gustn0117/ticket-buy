import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import type { DBPremiumBuyer } from '@/lib/types';

interface CompanyCardProps {
  company: DBPremiumBuyer;
  isNew?: boolean;
}

export default function CompanyCard({ company, isNew }: CompanyCardProps) {
  return (
    <Link href={`/buyer/${company.id}`} className="block company-card card-hover">
      {/* Image header */}
      <div className="company-card-image">
        {company.image_url ? (
          <img src={company.image_url} alt={company.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center px-3">
            <h3 className="text-white text-[14px] font-bold text-center leading-tight">{company.name}</h3>
          </div>
        )}
        {isNew && (
          <span className="absolute top-2 right-2 text-[9px] text-white bg-red-500 px-1.5 py-0.5 rounded-sm font-bold">NEW</span>
        )}
        {company.tier === 'premium' && (
          <span className="absolute top-2 left-2 text-[9px] text-white bg-accent px-1.5 py-0.5 rounded-sm font-bold">BEST</span>
        )}
      </div>

      {/* Body */}
      <div className="company-card-body">
        <p className="text-[12px] text-gray-600 leading-relaxed text-center line-clamp-2 min-h-[36px]">
          {company.description}
        </p>
        <div className="company-card-phone">
          <Phone size={13} className="text-gray-500" />
          <span>{company.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="company-card-footer">
        <span className="text-accent font-bold flex items-center gap-1">
          <MapPin size={10} />
          {company.name}
        </span>
        <span className="text-gray-500">{company.region}</span>
      </div>
    </Link>
  );
}
