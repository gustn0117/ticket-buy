import Link from 'next/link';
import { FileText, ShoppingCart, Tag, MessageCircle, Shield, AlertTriangle, CheckCircle2, ArrowRight, CreditCard, Package, ChevronRight } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="container-main py-4">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-gray-800">이용안내</h1>
        <div className="breadcrumb">
          <Link href="/">HOME</Link> &gt; 이용안내
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <Link href="/guide" className="flex-1 py-3 text-center text-[13px] font-bold text-accent border-b-2 border-accent bg-accent/5">고객 이용안내</Link>
          <Link href="/guide" className="flex-1 py-3 text-center text-[13px] text-gray-500 hover:text-accent">업체 이용안내</Link>
          <Link href="/guide" className="flex-1 py-3 text-center text-[13px] text-gray-500 hover:text-accent">회사소개</Link>
        </div>

        {/* Hero section */}
        <div className="p-8 text-center bg-gradient-to-b from-gray-50 to-white">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="w-[120px] h-[120px] rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-[16px] font-bold text-accent">티켓바이</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-[13px] font-bold text-gray-600">이용고객</span>
              </div>
              <div className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-[13px] font-bold text-gray-600">등록업체</span>
              </div>
            </div>
          </div>
          <h2 className="text-[22px] font-bold text-gray-800 mb-3">전국 상품권 업체 찾아주는 검색 사이트</h2>
          <p className="text-[13px] text-gray-500 max-w-[600px] mx-auto">
            고객이 직접 상품권 업체를 비교하고, 검색하고, 선택할 수 있도록 서비스를 제공하며
            상담부터 거래까지 한 번에 쉽고 빠르게 진행할 수 있습니다.
          </p>
          <div className="mt-4 inline-block bg-accent/10 border border-accent/20 px-4 py-2 text-[12px] text-gray-700">
            <span className="text-accent font-bold mr-1">TIP</span>
            티켓바이에 광고 중인 등록업체마다 기준과 상품, 할인율이 모두 다르기 때문에 여러 업체와 상담해보시는게 유리합니다.
          </div>
        </div>

        {/* Category search preview */}
        <div className="p-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-4">
              <h3 className="text-[14px] font-bold mb-3 flex items-center gap-2">
                <Tag size={14} className="text-accent" /> 지역별 업체찾기
              </h3>
              <div className="flex flex-wrap gap-2">
                {['전체', '서울', '경기', '인천', '대전', '대구', '부산', '광주'].map(r => (
                  <Link key={r} href={`/category/area?region=${r}`} className="px-3 py-1.5 text-[11px] border border-gray-200 text-gray-600 hover:text-accent hover:border-accent transition-colors">
                    {r}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border border-gray-200 p-4">
              <h3 className="text-[14px] font-bold mb-3 flex items-center gap-2">
                <ShoppingCart size={14} className="text-accent" /> 상품별 업체찾기
              </h3>
              <div className="flex flex-wrap gap-2">
                {['전체', '직장인', '무직자', '여성', '비상금', '모바일', '소액', '당일'].map(t => (
                  <Link key={t} href={`/category/product?type=${t}`} className="px-3 py-1.5 text-[11px] border border-gray-200 text-gray-600 hover:text-accent hover:border-accent transition-colors">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 구매/판매 방법 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <section id="buy">
          <h2 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <ShoppingCart size={16} className="text-accent" /> 구매 방법
          </h2>
          <div className="space-y-2">
            {[
              { step: 1, title: '판매글 찾기', desc: '메인 또는 게시판에서 원하는 상품권을 찾습니다.' },
              { step: 2, title: '구매하기 클릭', desc: '상세 페이지에서 구매 버튼을 선택합니다.' },
              { step: 3, title: '채팅으로 협의', desc: '판매자와 수량, 금액, 발송일을 협의합니다.' },
              { step: 4, title: '계약 → 입금 → 수령', desc: '전자 계약서 작성 후 입금, 상품권 수령하면 완료.' },
            ].map(item => (
              <div key={item.step} className="bg-white border border-gray-200 p-3 flex gap-3">
                <div className="w-6 h-6 rounded-full bg-accent text-white text-[11px] font-bold flex items-center justify-center shrink-0">{item.step}</div>
                <div>
                  <p className="text-[12px] font-bold text-gray-800">{item.title}</p>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="sell">
          <h2 className="text-[15px] font-bold mb-3 flex items-center gap-2">
            <Tag size={16} className="text-accent" /> 판매 방법
          </h2>
          <div className="space-y-2">
            {[
              { step: 1, title: '회원가입 또는 로그인', desc: '글 작성을 위해 로그인이 필요합니다.' },
              { step: 2, title: '글쓰기 클릭', desc: '게시판 상단의 글쓰기 버튼을 눌러 작성합니다.' },
              { step: 3, title: '상세 정보 입력', desc: '상품권 종류, 액면가, 판매가, 발송 방법을 입력합니다.' },
              { step: 4, title: '구매자 응대', desc: '채팅으로 구매자와 협의 후 거래를 진행합니다.' },
            ].map(item => (
              <div key={item.step} className="bg-white border border-gray-200 p-3 flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0">{item.step}</div>
                <div>
                  <p className="text-[12px] font-bold text-gray-800">{item.title}</p>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 안전 수칙 */}
      <section id="safety" className="mb-6">
        <h2 className="text-[15px] font-bold mb-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-accent" /> 안전 거래 수칙
        </h2>
        <div className="bg-white border border-gray-200 p-4 space-y-2">
          {[
            '선입금을 요구하는 경우 사기를 의심하세요',
            '개인정보(주민등록번호, 계좌비밀번호)는 절대 제공하지 마세요',
            '지나치게 높은 할인율은 사기일 가능성이 높습니다',
            '플랫폼 외부(카톡, 텔레그램 등)에서의 직거래는 보호받을 수 없습니다',
            '계약서 없이는 절대 거래하지 마세요',
            '피해 발생 시 경찰 사이버수사대(182)에 즉시 신고하세요',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
              <p className="text-[12px] text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-accent/5 border border-accent/20 p-6 text-center">
        <h3 className="text-[15px] font-bold mb-2">더 궁금한 점이 있으신가요?</h3>
        <p className="text-[12px] text-gray-600 mb-4">자주 묻는 질문(FAQ)이나 고객센터로 문의하세요.</p>
        <div className="flex items-center justify-center gap-2">
          <Link href="/faq" className="btn-secondary h-9 px-4 text-[12px]">
            <MessageCircle size={13} /> 자주 묻는 질문
          </Link>
          <Link href="/fraud" className="btn-accent h-9 px-4 text-[12px]">
            <FileText size={13} /> 사기 방지 가이드 <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
