import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10 mt-auto hidden md:block">
      <div className="max-w-[1140px] mx-auto px-5">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 px-1.5 bg-zinc-900 rounded text-white text-[8px] font-black tracking-[0.12em] flex items-center">LOGO</div>
              <span className="text-sm font-semibold text-zinc-900">티켓바이</span>
            </div>
            <p className="text-[12px] leading-relaxed text-zinc-400 max-w-[280px]">
              온라인 상품권 매입/매도 중개 플랫폼. 계약서 기반 안전 거래 시스템을 제공합니다.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 mb-3 uppercase tracking-wide">고객센터</p>
            <div className="text-[12px] text-zinc-400 space-y-1.5">
              <p>1234-5678</p>
              <p>support@ticketbuy.co.kr</p>
              <p>평일 09:00 - 18:00</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-zinc-900 mb-3 uppercase tracking-wide">Links</p>
            <div className="text-[12px] text-zinc-400 space-y-1.5">
              <Link href="/notice" className="block hover:text-zinc-600">이용약관</Link>
              <Link href="/notice" className="block hover:text-zinc-600">개인정보처리방침</Link>
              <Link href="/fraud" className="block hover:text-zinc-600">사기예방가이드</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-100 mt-8 pt-4 text-[11px] text-zinc-400">
          &copy; 2026 티켓바이. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
