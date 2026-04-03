export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 mt-auto hidden md:block">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 h-7 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-[9px] tracking-widest">LOGO</div>
              <span className="text-white font-bold tracking-tight">티켓바이</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              온라인 상품권 매입/매도 중개 플랫폼.<br />
              계약서 기반 안전 거래 시스템을 제공합니다.
            </p>
          </div>
          <div className="text-sm space-y-1.5 text-gray-500">
            <p className="text-gray-400 font-medium mb-2">고객센터</p>
            <p>전화: 1234-5678</p>
            <p>이메일: support@ticketbuy.co.kr</p>
            <p>운영시간: 평일 09:00 - 18:00</p>
          </div>
          <div className="text-sm space-y-1.5 text-gray-500">
            <p className="text-gray-400 font-medium mb-2">바로가기</p>
            <p className="hover:text-gray-300 cursor-pointer transition-colors">이용약관</p>
            <p className="hover:text-gray-300 cursor-pointer transition-colors">개인정보처리방침</p>
            <p className="hover:text-gray-300 cursor-pointer transition-colors">사기예방가이드</p>
          </div>
        </div>
        <div className="border-t border-gray-800/50 mt-8 pt-5 text-xs text-center text-gray-600">
          &copy; 2026 티켓바이. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
