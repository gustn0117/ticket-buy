'use client';

import { useState } from 'react';

export default function RegisterBusinessPage() {
  const [form, setForm] = useState({
    businessName: '',
    businessNumber: '',
    representative: '',
    phone: '',
    messenger: '',
    messengerId: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('업체 제휴 신청이 완료되었습니다. 승인 후 안내드리겠습니다.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="px-4 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl inline-flex items-center justify-center text-white font-black text-sm tracking-widest mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            LOGO
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">매입 업체 제휴 문의</h1>
          <p className="text-sm text-gray-500 mt-1">상품권 매입 업체 등록 신청</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-900/[0.04] p-7 animate-fade-in">
          {/* Info Box */}
          <div className="bg-emerald-50 rounded-xl p-4 text-sm text-emerald-700 mb-6 leading-relaxed border border-emerald-100">
            <p className="font-bold text-emerald-800 mb-1">안내</p>
            <p>상품권 <strong>매입(삽니다)</strong> 업체로 등록하시려면 아래 정보와 <strong>업체 로그인에 사용할 비밀번호</strong>를 입력해 주세요. 승인 시 이 비밀번호로 바로 로그인할 수 있습니다.</p>
            <p className="mt-2 font-medium">담당 연락용 <strong>메신저 종류·아이디</strong>는 필수입니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">사업체명 *</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                placeholder="사업체명을 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">사업자 등록번호 *</label>
              <input
                type="text"
                value={form.businessNumber}
                onChange={(e) => handleChange('businessNumber', e.target.value)}
                placeholder="000-00-00000"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5">숫자만 입력 · 10자리 (하이픈 자동)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">대표자명 *</label>
              <input
                type="text"
                value={form.representative}
                onChange={(e) => handleChange('representative', e.target.value)}
                placeholder="대표자 이름을 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">연락처 *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5">숫자만 입력 · 하이픈 자동</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">메신저 종류 *</label>
                <select
                  value={form.messenger}
                  onChange={(e) => handleChange('messenger', e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="kakaotalk">카카오톡</option>
                  <option value="line">라인 (LINE)</option>
                  <option value="telegram">텔레그램</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">메신저 아이디 *</label>
                <input
                  type="text"
                  value={form.messengerId}
                  onChange={(e) => handleChange('messengerId', e.target.value)}
                  placeholder="메신저 아이디"
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">로그인 비밀번호 *</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호 확인 *</label>
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 text-sm mt-2"
            >
              제휴 신청하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
