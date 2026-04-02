export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-500 py-8 mt-auto hidden md:block">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-base mb-2 tracking-tight">티켓바이</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              온라인 상품권 매입/매도 중개 플랫폼<br />
              안전하고 빠른 상품권 거래를 제공합니다.
            </p>
          </div>
          <div className="text-sm space-y-1">
            <p>고객센터: 1234-5678</p>
            <p>이메일: support@ticketbuy.co.kr</p>
            <p>운영시간: 평일 09:00 - 18:00</p>
          </div>
          <div className="text-sm space-y-1 text-gray-600">
            <p>이용약관 | 개인정보처리방침 | 사기예방가이드</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-4 text-xs text-center text-gray-600">
          &copy; 2026 티켓바이. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
