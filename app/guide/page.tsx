import Link from 'next/link';
import { FileText, ShoppingCart, Tag, MessageCircle, Shield, AlertTriangle, CheckCircle2, ArrowRight, CreditCard, Package } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="max-w-[900px] mx-auto px-5 py-8">
      {/* Hero */}
      <div className="rounded-lg p-8 mb-6 text-center" style={{ background: 'linear-gradient(135deg, #1C1D3E 0%, #2A2B55 100%)' }}>
        <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">How to Use</p>
        <h1 className="text-white text-[22px] font-bold mb-2">티켓바이 이용방법</h1>
        <p className="text-zinc-400 text-[13px]">처음이신가요? 간단한 가이드로 안전하게 거래를 시작하세요.</p>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <a href="#buy" className="card p-4 text-center hover:border-zinc-400 transition-colors">
          <ShoppingCart size={18} className="mx-auto mb-2 text-zinc-500" />
          <p className="text-[12px] font-semibold">구매 방법</p>
        </a>
        <a href="#sell" className="card p-4 text-center hover:border-zinc-400 transition-colors">
          <Tag size={18} className="mx-auto mb-2 text-zinc-500" />
          <p className="text-[12px] font-semibold">판매 방법</p>
        </a>
        <a href="#escrow" className="card p-4 text-center hover:border-zinc-400 transition-colors">
          <Shield size={18} className="mx-auto mb-2 text-zinc-500" />
          <p className="text-[12px] font-semibold">중개 거래</p>
        </a>
        <a href="#safety" className="card p-4 text-center hover:border-zinc-400 transition-colors">
          <AlertTriangle size={18} className="mx-auto mb-2 text-zinc-500" />
          <p className="text-[12px] font-semibold">안전 수칙</p>
        </a>
      </div>

      {/* 구매 방법 */}
      <section id="buy" className="mb-10">
        <h2 className="text-[17px] font-bold mb-4 flex items-center gap-2">
          <ShoppingCart size={18} /> 구매 방법
        </h2>
        <div className="space-y-3">
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">1</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">판매글 찾기</p>
              <p className="text-[12px] text-zinc-500">메인 또는 게시판 &quot;팝니다&quot; 탭에서 원하는 상품권을 찾습니다. 가격, 발송일, 판매자 정보를 확인하세요.</p>
            </div>
          </div>
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">2</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">구매하기 클릭</p>
              <p className="text-[12px] text-zinc-500">상세 페이지에서 &quot;구매하기(직접거래)&quot; 또는 &quot;중개거래로 안전하게&quot; 버튼을 선택합니다.</p>
            </div>
          </div>
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">3</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">채팅으로 협의</p>
              <p className="text-[12px] text-zinc-500">우측 하단 채팅 위젯에서 판매자와 수량, 금액, 발송일을 협의합니다.</p>
            </div>
          </div>
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">4</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">계약 → 입금 → 수령</p>
              <p className="text-[12px] text-zinc-500">전자 계약서 작성 후 입금, 상품권을 수령하면 거래가 완료됩니다.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 card p-4 flex gap-3" style={{ background: '#FEF9E7', borderColor: '#FDE68A' }}>
          <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[12px]" style={{ background: 'linear-gradient(135deg, #F04E51 0%, #F26A4B 100%)' }}>TIP</div>
          <div>
            <p className="text-[12px] font-semibold text-zinc-800">구매 전 꼭 확인하세요</p>
            <p className="text-[11px] text-zinc-600 leading-relaxed mt-1">판매자의 거래 이력과 평점을 확인하고, 비정상적으로 높은 할인율은 사기 가능성이 있으니 주의하세요. 계약서 없이는 절대 입금하지 마세요.</p>
          </div>
        </div>
      </section>

      {/* 판매 방법 */}
      <section id="sell" className="mb-10">
        <h2 className="text-[17px] font-bold mb-4 flex items-center gap-2">
          <Tag size={18} /> 판매 방법
        </h2>
        <div className="space-y-3">
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">1</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">회원가입 또는 로그인</p>
              <p className="text-[12px] text-zinc-500">글 작성을 위해 로그인이 필요합니다. 비회원도 구매 문의는 받을 수 있습니다.</p>
            </div>
          </div>
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">2</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">글쓰기 클릭</p>
              <p className="text-[12px] text-zinc-500">메인 또는 게시판 상단의 &quot;글쓰기&quot; 버튼을 눌러 판매글을 작성합니다.</p>
            </div>
          </div>
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">3</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">상세 정보 입력</p>
              <p className="text-[12px] text-zinc-500">상품권 종류, 액면가, 판매가, 발송 방법(모바일/택배/직접)을 입력합니다. 할인율은 자동 계산됩니다.</p>
            </div>
          </div>
          <div className="card p-4 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center shrink-0">4</div>
            <div>
              <p className="text-[13px] font-semibold mb-1">구매자 응대</p>
              <p className="text-[12px] text-zinc-500">채팅으로 구매자와 협의 후 계약 → 입금 확인 → 발송 → 거래완료 순서로 진행합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 중개 거래 */}
      <section id="escrow" className="mb-10">
        <h2 className="text-[17px] font-bold mb-4 flex items-center gap-2">
          <Shield size={18} /> 중개 거래란?
        </h2>
        <div className="card p-5">
          <p className="text-[13px] text-zinc-700 leading-relaxed mb-4">
            직접 거래가 부담스러운 경우 <strong>티켓바이가 중간에서 대행</strong>하는 중개 거래를 이용하실 수 있습니다.
            금전과 상품권이 모두 티켓바이를 거치므로 사기 피해를 원천 차단할 수 있습니다.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border border-zinc-200 rounded">
              <p className="text-[11px] text-zinc-400 mb-1">1단계</p>
              <p className="text-[12px] font-semibold flex items-center gap-1"><CreditCard size={11} /> 구매자 → 중개업체</p>
              <p className="text-[11px] text-zinc-500 mt-1">구매자가 중개 계좌로 송금</p>
            </div>
            <div className="p-3 border border-zinc-200 rounded">
              <p className="text-[11px] text-zinc-400 mb-1">2단계</p>
              <p className="text-[12px] font-semibold flex items-center gap-1"><Package size={11} /> 판매자 → 중개업체</p>
              <p className="text-[11px] text-zinc-500 mt-1">판매자가 상품권을 중개에 전달</p>
            </div>
            <div className="p-3 border border-zinc-200 rounded">
              <p className="text-[11px] text-zinc-400 mb-1">3단계</p>
              <p className="text-[12px] font-semibold flex items-center gap-1"><CreditCard size={11} /> 중개 → 판매자</p>
              <p className="text-[11px] text-zinc-500 mt-1">중개가 판매자에게 송금</p>
            </div>
            <div className="p-3 border border-zinc-200 rounded">
              <p className="text-[11px] text-zinc-400 mb-1">4단계</p>
              <p className="text-[12px] font-semibold flex items-center gap-1"><Package size={11} /> 중개 → 구매자</p>
              <p className="text-[11px] text-zinc-500 mt-1">중개가 구매자에게 상품권 전달</p>
            </div>
          </div>
        </div>
      </section>

      {/* 안전 수칙 */}
      <section id="safety" className="mb-10">
        <h2 className="text-[17px] font-bold mb-4 flex items-center gap-2">
          <AlertTriangle size={18} /> 안전 거래 수칙
        </h2>
        <div className="space-y-2">
          {[
            '선입금을 요구하는 경우 사기를 의심하세요',
            '개인정보(주민등록번호, 계좌비밀번호)는 절대 제공하지 마세요',
            '지나치게 높은 할인율은 사기일 가능성이 높습니다',
            '플랫폼 외부(카톡, 텔레그램 등)에서의 직거래는 보호받을 수 없습니다',
            '계약서 없이는 절대 거래하지 마세요',
            '피해 발생 시 경찰 사이버수사대(182)에 즉시 신고하세요',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2 p-3 card">
              <CheckCircle2 size={14} className="text-zinc-400 shrink-0 mt-0.5" />
              <p className="text-[12px] text-zinc-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="card p-6 text-center" style={{ background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF5F0 100%)' }}>
        <h3 className="text-[15px] font-bold mb-2">더 궁금한 점이 있으신가요?</h3>
        <p className="text-[12px] text-zinc-600 mb-4">자주 묻는 질문(FAQ)이나 고객센터로 문의하세요.</p>
        <div className="flex items-center justify-center gap-2">
          <Link href="/faq" className="btn-secondary h-9 px-4 text-[12px]">
            <MessageCircle size={13} /> 자주 묻는 질문
          </Link>
          <Link href="/fraud" className="btn-primary h-9 px-4 text-[12px]">
            <FileText size={13} /> 사기 방지 가이드 <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
