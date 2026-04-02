import { Shield, AlertTriangle, Phone, FileText, Users } from 'lucide-react';

export default function FraudPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Shield size={48} className="mx-auto text-primary mb-3" />
        <h1 className="text-2xl font-bold mb-2">사기 방지 가이드</h1>
        <p className="text-gray-500">안전한 상품권 거래를 위한 필수 안내사항</p>
      </div>

      <div className="space-y-6">
        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-700 mb-2">주의사항</h3>
              <ul className="text-sm text-red-600 space-y-1.5 leading-relaxed">
                <li>- 플랫폼 외부에서의 직거래는 사기 피해 시 보호받을 수 없습니다.</li>
                <li>- 선입금을 요구하는 경우 사기를 의심하세요.</li>
                <li>- 개인정보(주민등록번호, 계좌비밀번호 등)를 요구하는 경우 절대 제공하지 마세요.</li>
                <li>- 지나치게 높은 할인율은 사기일 가능성이 높습니다.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safe Trading Tips */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">안전 거래 수칙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <FileText size={20} className="text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">계약서 필수 작성</h4>
                <p className="text-xs text-gray-500">거래 전 반드시 전자 계약서를 작성하고 서명을 받으세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Users size={20} className="text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">상대방 정보 확인</h4>
                <p className="text-xs text-gray-500">거래 전 상대방의 거래 이력과 평판을 확인하세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield size={20} className="text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">사업자 조회</h4>
                <p className="text-xs text-gray-500">프리미엄 업체의 사업자등록번호를 반드시 확인하세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone size={20} className="text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">피해 신고</h4>
                <p className="text-xs text-gray-500">사기 피해 시 경찰 사이버수사대(182)에 즉시 신고하세요.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scam Patterns */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-4">주요 사기 유형</h2>
          <div className="space-y-3">
            {[
              { title: '선입금 사기', desc: '상품권을 보내기 전에 먼저 돈을 보내달라고 요구합니다.' },
              { title: '3자 사기', desc: '제3자의 계좌로 입금을 유도하여 중간에서 가로채는 수법입니다.' },
              { title: '위조 상품권', desc: '사용 불가능한 위조/도용 상품권을 전달합니다.' },
              { title: '피싱 링크', desc: '가짜 사이트 링크를 보내 개인정보를 탈취합니다.' },
              { title: '계약서 위변조', desc: '계약 내용을 임의로 변경하여 불리한 조건을 적용합니다.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
                <span className="text-red-500 font-bold text-sm shrink-0">!</span>
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 text-center">
          <p className="text-sm text-gray-700 mb-2">사기 피해 신고 및 상담</p>
          <p className="text-2xl font-bold text-primary">182</p>
          <p className="text-xs text-gray-500 mt-1">경찰청 사이버수사대</p>
        </div>
      </div>
    </div>
  );
}
