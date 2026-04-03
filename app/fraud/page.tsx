import { Shield, AlertTriangle, Phone, FileText, Users } from 'lucide-react';

export default function FraudPage() {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white mb-8 shadow-lg shadow-black/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">사기 방지 가이드</h1>
          <p className="text-emerald-100 text-sm md:text-base">안전한 상품권 거래를 위한 필수 안내사항</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Warning */}
        <div className="bg-red-50 border border-red-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-red-700 mb-3 tracking-tight">주의사항</h3>
              <ul className="text-sm text-red-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                  플랫폼 외부에서의 직거래는 사기 피해 시 보호받을 수 없습니다.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                  선입금을 요구하는 경우 사기를 의심하세요.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                  개인정보(주민등록번호, 계좌비밀번호 등)를 요구하는 경우 절대 제공하지 마세요.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                  지나치게 높은 할인율은 사기일 가능성이 높습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safe Trading Tips */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
          <h2 className="font-extrabold text-lg tracking-tight mb-5">안전 거래 수칙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: FileText, title: '계약서 필수 작성', desc: '거래 전 반드시 전자 계약서를 작성하고 서명을 받으세요.', color: 'emerald' },
              { icon: Users, title: '상대방 정보 확인', desc: '거래 전 상대방의 거래 이력과 평판을 확인하세요.', color: 'blue' },
              { icon: Shield, title: '사업자 조회', desc: '프리미엄 업체의 사업자등록번호를 반드시 확인하세요.', color: 'violet' },
              { icon: Phone, title: '피해 신고', desc: '사기 피해 시 경찰 사이버수사대(182)에 즉시 신고하세요.', color: 'amber' },
            ].map((item) => (
              <div key={item.title} className={`flex items-start gap-4 p-4 rounded-xl border border-gray-100 card-hover bg-gradient-to-br ${
                item.color === 'emerald' ? 'from-gray-800/50 to-white' :
                item.color === 'blue' ? 'from-blue-50/50 to-white' :
                item.color === 'violet' ? 'from-violet-50/50 to-white' :
                'from-amber-50/50 to-white'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.color === 'emerald' ? 'bg-gray-100 text-gray-900' :
                  item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  item.color === 'violet' ? 'bg-violet-100 text-violet-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scam Patterns */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
          <h2 className="font-extrabold text-lg tracking-tight mb-5">주요 사기 유형</h2>
          <div className="space-y-3">
            {[
              { title: '선입금 사기', desc: '상품권을 보내기 전에 먼저 돈을 보내달라고 요구합니다.' },
              { title: '3자 사기', desc: '제3자의 계좌로 입금을 유도하여 중간에서 가로채는 수법입니다.' },
              { title: '위조 상품권', desc: '사용 불가능한 위조/도용 상품권을 전달합니다.' },
              { title: '피싱 링크', desc: '가짜 사이트 링크를 보내 개인정보를 탈취합니다.' },
              { title: '계약서 위변조', desc: '계약 내용을 임의로 변경하여 불리한 조건을 적용합니다.' },
            ].map((item, idx) => (
              <div key={item.title} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-red-500 font-extrabold text-sm">{idx + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900/50 border border-gray-200/60 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Phone size={20} className="text-gray-900" />
          </div>
          <p className="text-sm text-gray-600 mb-2 font-medium">사기 피해 신고 및 상담</p>
          <p className="text-3xl font-extrabold tracking-tight text-gray-900">182</p>
          <p className="text-xs text-gray-500 mt-1.5">경찰청 사이버수사대</p>
        </div>
      </div>
    </div>
  );
}
