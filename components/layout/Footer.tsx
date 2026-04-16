import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white mt-auto hidden md:block">
      {/* Footer links bar */}
      <div className="border-b border-gray-200">
        <div className="container-main flex items-center justify-between py-3">
          <div className="flex items-center gap-4 text-[12px] text-gray-600">
            <Link href="/guide" className="hover:text-accent">회사소개</Link>
            <Link href="/guide" className="hover:text-accent">이용안내</Link>
            <Link href="/terms" className="hover:text-accent">이용약관</Link>
            <Link href="/privacy" className="hover:text-accent font-bold">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-accent">책임의한계와법적고지</Link>
            <Link href="/privacy" className="hover:text-accent">이메일무단수집거부</Link>
            <Link href="/faq" className="hover:text-accent">오류신고</Link>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span>불법추심으로피해발생시</span>
            <span>채무자대리인 신청하세요</span>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-8">
        <div className="container-main">
          <div className="grid grid-cols-4 gap-8">
            {/* 고객센터 */}
            <div>
              <h4 className="text-[13px] font-bold text-gray-800 mb-3">고객센터</h4>
              <p className="text-[22px] font-bold text-accent mb-2">1599-9687</p>
              <div className="text-[11px] text-gray-500 space-y-1">
                <p>평일 10:00 - 17:00 / 점심시간 12:30 - 13:30</p>
                <p>(주말 및 공휴일 휴무)</p>
              </div>
            </div>

            {/* 안내 */}
            <div>
              <h4 className="text-[13px] font-bold text-gray-800 mb-3">상품권 매입 중개 플랫폼, 티켓바이</h4>
              <div className="flex items-center gap-2 mb-2">
                <Link href="/fraud" className="flex items-center gap-1 text-[11px] text-gray-600 hover:text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  주의사항
                </Link>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                티켓바이는 광고 플랫폼만 제공할 뿐 직접적인 상품권 매입 및 중개를 하지 않으며,
                등록 업체만 광고 등을 합니다. 티켓바이에 기재된 광고 내용은 등록 업체가 제공하는 정보로서
                이를 신뢰하여 취한 조치에 대하여 어떠한 책임을 지지 않습니다.
              </p>
            </div>

            {/* 금리 안내 */}
            <div>
              <h4 className="text-[13px] font-bold text-gray-800 mb-3">거래 및 수수료 안내</h4>
              <div className="flex items-center gap-2 mb-2">
                <Link href="/guide" className="flex items-center gap-1 text-[11px] text-accent hover:underline">
                  이자계산기
                </Link>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                상품권 매입률은 업체마다 상이하며 거래 조건에 따라 달라질 수 있습니다.
                중개수수료 없음, 추가비용 없음. 상품권 종류, 금액에 따라 매입률이 달라집니다.
              </p>
            </div>

            {/* Logo */}
            <div className="flex flex-col items-end">
              <div className="mb-3 inline-block px-3 py-2 rounded bg-gray-800">
                <Image src="/logo.png" alt="티켓바이" width={120} height={26} className="h-6 w-auto object-contain" />
              </div>
              <Link href="/guide" className="text-[11px] text-gray-500 hover:text-accent border border-gray-300 px-3 py-1.5 flex items-center gap-1">
                티켓바이 이용안내 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </Link>
            </div>
          </div>

          {/* Bottom info */}
          <div className="border-t border-gray-200 mt-6 pt-4">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              사이트명 : 티켓바이 | 대표자 : 운영팀 | 팩스번호: 02-543-4569<br />
              주소 : 서울특별시 강남구 | 사업자등록번호: 255-62-00840 | 통신판매업신고번호 : 제2025-서울강남-03876호
            </p>
            <p className="text-[10px] text-gray-400 mt-2">
              COPYRIGHT &copy; 2026. 티켓바이 ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
