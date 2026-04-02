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
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-xl font-bold mb-2">매입 업체 제휴 문의</h1>

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700 mb-6 leading-relaxed">
          <p className="font-bold text-blue-800 mb-1">안내</p>
          <p>상품권 <strong>매입(삽니다)</strong> 업체로 등록하시려면 아래 정보와 <strong>업체 로그인에 사용할 비밀번호</strong>를 입력해 주세요. 승인 시 이 비밀번호로 바로 로그인할 수 있습니다.</p>
          <p className="mt-2 font-medium">담당 연락용 <strong>메신저 종류·아이디</strong>는 필수입니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사업체명 *</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="사업체명을 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사업자 등록번호 *</label>
            <input
              type="text"
              value={form.businessNumber}
              onChange={(e) => handleChange('businessNumber', e.target.value)}
              placeholder="000-00-00000"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
            <p className="text-xs text-gray-400 mt-1">숫자만 입력 · 10자리 (하이픈 자동)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대표자명 *</label>
            <input
              type="text"
              value={form.representative}
              onChange={(e) => handleChange('representative', e.target.value)}
              placeholder="대표자 이름을 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="010-0000-0000"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
            <p className="text-xs text-gray-400 mt-1">숫자만 입력 · 하이픈 자동</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">메신저 종류 *</label>
            <select
              value={form.messenger}
              onChange={(e) => handleChange('messenger', e.target.value)}
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            >
              <option value="">선택하세요</option>
              <option value="kakaotalk">카카오톡</option>
              <option value="line">라인 (LINE)</option>
              <option value="telegram">텔레그램</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">메신저 아이디 *</label>
            <input
              type="text"
              value={form.messengerId}
              onChange={(e) => handleChange('messengerId', e.target.value)}
              placeholder="메신저 아이디를 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">로그인 비밀번호 *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인 *</label>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            제휴 신청하기
          </button>
        </form>
      </div>
    </div>
  );
}
