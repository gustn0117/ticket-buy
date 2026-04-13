import Link from 'next/link';
import Image from 'next/image';
import AdBanner from '@/components/ads/AdBanner';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white mt-auto hidden md:block">
      <AdBanner slot="footer_banner" className="h-20 max-w-[1140px] mx-auto mt-8 mb-0 rounded-none" />
      <div className="py-10">
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="mb-3 inline-block px-3 py-2 rounded" style={{ background: '#1C1D3E' }}>
              <Image src="/logo.png" alt="티켓바이" width={120} height={26} className="h-6 w-auto object-contain" />
            </div>
            <p className="text-[12px] leading-relaxed text-zinc-400 max-w-[220px]">
              안전하고 빠른 상품권 거래 플랫폼.
              믿을 수 있는 상품권 거래소.
            </p>
            <p className="text-[11px] text-zinc-400 mt-2">운영 티켓바이</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 mb-3">고객센터</p>
            <div className="text-[12px] text-zinc-400 space-y-1.5">
              <Link href="/faq" className="block hover:text-zinc-600">자주 묻는 질문</Link>
              <p>support@ticketbuy.co.kr</p>
              <p>1234-5678</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 mb-3">이용안내</p>
            <div className="text-[12px] text-zinc-400 space-y-1.5">
              <Link href="/guide" className="block hover:text-zinc-600">이용방법</Link>
              <Link href="/board?tab=sell" className="block hover:text-zinc-600">상품권 팝니다</Link>
              <Link href="/advertising" className="block hover:text-zinc-600">광고 안내</Link>
              <Link href="/register-business" className="block hover:text-zinc-600">업체 회원가입</Link>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 mb-3">약관 및 정책</p>
            <div className="text-[12px] text-zinc-400 space-y-1.5">
              <Link href="/terms" className="block hover:text-zinc-600">이용약관</Link>
              <Link href="/privacy" className="block hover:text-zinc-600">개인정보처리방침</Link>
              <Link href="/fraud" className="block hover:text-zinc-600">사기예방가이드</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-100 mt-8 pt-4 flex justify-between items-center">
          <p className="text-[11px] text-zinc-400">
            &copy; 2026 티켓바이. All rights reserved. | 사업자등록번호: 255-62-00840
          </p>
          <p className="text-[11px] text-zinc-300">금전거래 금지 · 상품권을 이용한 금융행위 금지 · 반복 시 제재 · 비정상 거래 감지 시 이용 제한</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
