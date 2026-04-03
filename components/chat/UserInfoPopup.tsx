'use client';

import { X, Flag, User } from 'lucide-react';

interface UserInfoPopupProps {
  user: {
    name: string;
    type: string;
    joinDate: string;
    tradeCompleted: number;
    tradeOngoing: number;
    tradeDelayed: number;
  };
  onClose: () => void;
}

export default function UserInfoPopup({ user, onClose }: UserInfoPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="card w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-100">
          <h3 className="font-medium text-[15px]">유저 정보</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500">
                <User size={20} />
              </div>
              <div>
                <span className="font-medium text-[13px]">{user.name}</span>
                <span className="text-[12px] text-zinc-500 ml-1">({user.type})</span>
              </div>
            </div>
            <button className="btn-secondary h-8 text-[11px] text-red-500 border-red-200 hover:bg-red-50">
              <Flag size={14} /> 신고
            </button>
          </div>

          <p className="text-[12px] text-zinc-500 mb-4">가입일: {user.joinDate}</p>

          <div className="space-y-1">
            <h4 className="text-[12px] font-medium text-zinc-600 mb-2">거래 통계</h4>
            <div className="flex gap-3 text-[13px]">
              <span className="badge bg-zinc-100 text-zinc-900">거래완료 {user.tradeCompleted}건</span>
              <span className="badge bg-blue-50 text-blue-600">거래중 {user.tradeOngoing}건</span>
              <span className="badge bg-red-50 text-red-600">지연중 {user.tradeDelayed}건</span>
            </div>
          </div>

          <div className="mt-4 space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-zinc-100 text-[13px]">
              <span>거래완료 {user.tradeCompleted}건</span>
              <span className="text-zinc-400">{'>'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-100 text-[13px]">
              <span>거래중 {user.tradeOngoing}건</span>
              <span className="text-zinc-400">{'>'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-100 text-[13px]">
              <span>지연중 {user.tradeDelayed}건</span>
              <span className="text-zinc-400">{'>'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
