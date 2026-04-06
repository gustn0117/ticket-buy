'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { DBUser, DBPost, DBNotice, DBChat } from '@/lib/types';
import { Users, FileText, Bell, MessageCircle, Trash2, Shield } from 'lucide-react';
import { getCategoryName } from '@/data/mock';

const ADMIN_PASSWORD = '1234';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState<'users' | 'posts' | 'notices' | 'chats'>('users');
  const [users, setUsers] = useState<DBUser[]>([]);
  const [posts, setPosts] = useState<(DBPost & { author?: DBUser })[]>([]);
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [chats, setChats] = useState<DBChat[]>([]);
  const [loading, setLoading] = useState(false);

  // Notice form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticePinned, setNoticePinned] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) setAuthed(true);
    else alert('비밀번호가 틀렸습니다.');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [u, p, n, c] = await Promise.all([
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        supabase.from('posts').select('*, author:users!author_id(id, name, type)').order('created_at', { ascending: false }),
        supabase.from('notices').select('*').order('created_at', { ascending: false }),
        supabase.from('chats').select('*, post:posts(title), buyer:users!buyer_id(id, name), seller:users!seller_id(id, name)').order('updated_at', { ascending: false }),
      ]);
      if (u.data) setUsers(u.data);
      if (p.data) setPosts(p.data);
      if (n.data) setNotices(n.data);
      if (c.data) setChats(c.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { if (authed) fetchData(); }, [authed]);

  const deleteUser = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까? 관련 게시글/채팅도 영향받을 수 있습니다.')) return;
    await supabase.from('users').delete().eq('id', id);
    fetchData();
  };

  const deletePost = async (id: string) => {
    if (!confirm('게시글을 삭제하시겠습니까?')) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchData();
  };

  const deleteNotice = async (id: string) => {
    if (!confirm('공지를 삭제하시겠습니까?')) return;
    await supabase.from('notices').delete().eq('id', id);
    fetchData();
  };

  const addNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;
    await supabase.from('notices').insert({ title: noticeTitle, is_pinned: noticePinned });
    setNoticeTitle('');
    setNoticePinned(false);
    fetchData();
  };

  const toggleUserType = async (id: string, currentType: string) => {
    const newType = currentType === 'normal' ? 'business' : 'normal';
    await supabase.from('users').update({ type: newType }).eq('id', id);
    fetchData();
  };

  const deleteChat = async (id: string) => {
    if (!confirm('채팅을 삭제하시겠습니까? 관련 메시지도 삭제됩니다.')) return;
    await supabase.from('messages').delete().eq('chat_id', id);
    await supabase.from('chats').delete().eq('id', id);
    fetchData();
  };

  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-5">
        <div className="w-full max-w-[320px]">
          <div className="text-center mb-6">
            <Shield size={32} className="mx-auto mb-2 text-zinc-400" />
            <h1 className="text-[15px] font-semibold">관리자 로그인</h1>
          </div>
          <form onSubmit={login} className="card p-5 space-y-4">
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호" className="input" autoFocus />
            <button type="submit" className="btn-primary w-full h-10">로그인</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'users', label: '회원관리', icon: Users, count: users.length },
    { key: 'posts', label: '게시글관리', icon: FileText, count: posts.length },
    { key: 'notices', label: '공지관리', icon: Bell, count: notices.length },
    { key: 'chats', label: '채팅/거래', icon: MessageCircle, count: chats.length },
  ] as const;

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="section-title mb-0">관리자 패널</h1>
        <button onClick={() => setAuthed(false)} className="btn-secondary text-[12px] h-8">로그아웃</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`card card-hover p-3 text-left ${tab === t.key ? 'border-zinc-900' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <t.icon size={14} className="text-zinc-400" />
              <span className="text-[11px] text-zinc-500">{t.label}</span>
            </div>
            <p className="text-xl font-semibold">{t.count}</p>
          </button>
        ))}
      </div>

      {loading && <div className="py-8 text-center text-zinc-400 text-[13px]">불러오는 중...</div>}

      {/* Users Tab */}
      {!loading && tab === 'users' && (
        <div className="card overflow-hidden">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="table-header text-left py-2.5 px-4">이름</th>
              <th className="table-header text-left py-2.5 px-4">이메일</th>
              <th className="table-header text-left py-2.5 px-4">연락처</th>
              <th className="table-header text-center py-2.5 px-4">유형</th>
              <th className="table-header text-left py-2.5 px-4">가입일</th>
              <th className="table-header text-center py-2.5 px-4">관리</th>
            </tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-2.5 px-4 font-medium">{u.name}</td>
                  <td className="py-2.5 px-4 text-zinc-500">{u.email}</td>
                  <td className="py-2.5 px-4 text-zinc-500">{u.phone || '-'}</td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => toggleUserType(u.id, u.type)}
                      className={`badge cursor-pointer ${u.type === 'business' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-500'}`}>
                      {u.type === 'business' ? '업체' : '일반'}
                    </button>
                  </td>
                  <td className="py-2.5 px-4 text-zinc-400 text-[11px]">{new Date(u.created_at).toLocaleDateString('ko-KR')}</td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-zinc-400">회원이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Posts Tab */}
      {!loading && tab === 'posts' && (
        <div className="card overflow-hidden">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="table-header text-left py-2.5 px-4">유형</th>
              <th className="table-header text-left py-2.5 px-4">제목</th>
              <th className="table-header text-left py-2.5 px-4">카테고리</th>
              <th className="table-header text-right py-2.5 px-4">가격</th>
              <th className="table-header text-left py-2.5 px-4">작성자</th>
              <th className="table-header text-center py-2.5 px-4">조회</th>
              <th className="table-header text-left py-2.5 px-4">등록일</th>
              <th className="table-header text-center py-2.5 px-4">관리</th>
            </tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-2.5 px-4"><span className={`badge ${p.type === 'sell' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-500'}`}>{p.type === 'sell' ? '판매' : '구매'}</span></td>
                  <td className="py-2.5 px-4 font-medium">{p.title}</td>
                  <td className="py-2.5 px-4 text-zinc-500">{getCategoryName(p.category)}</td>
                  <td className="py-2.5 px-4 text-right font-medium">{p.price.toLocaleString()}원</td>
                  <td className="py-2.5 px-4 text-zinc-500">{p.author?.name || '-'}</td>
                  <td className="py-2.5 px-4 text-center text-zinc-400">{p.views}</td>
                  <td className="py-2.5 px-4 text-zinc-400 text-[11px]">{new Date(p.created_at).toLocaleDateString('ko-KR')}</td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => deletePost(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={8} className="py-8 text-center text-zinc-400">게시글이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Notices Tab */}
      {!loading && tab === 'notices' && (
        <div className="space-y-4">
          <form onSubmit={addNotice} className="card p-4 flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">새 공지사항</label>
              <input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="공지 제목을 입력하세요" className="input" required />
            </div>
            <label className="flex items-center gap-1.5 text-[12px] text-zinc-600 whitespace-nowrap shrink-0 mb-1">
              <input type="checkbox" checked={noticePinned} onChange={(e) => setNoticePinned(e.target.checked)} className="w-3.5 h-3.5" />
              고정
            </label>
            <button type="submit" className="btn-primary h-10 shrink-0">등록</button>
          </form>

          <div className="card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead><tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="table-header text-center py-2.5 px-4 w-16">고정</th>
                <th className="table-header text-left py-2.5 px-4">제목</th>
                <th className="table-header text-left py-2.5 px-4 w-28">등록일</th>
                <th className="table-header text-center py-2.5 px-4 w-16">관리</th>
              </tr></thead>
              <tbody>
                {notices.map(n => (
                  <tr key={n.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                    <td className="py-2.5 px-4 text-center">{n.is_pinned ? <span className="badge bg-zinc-900 text-white">고정</span> : '-'}</td>
                    <td className="py-2.5 px-4">{n.title}</td>
                    <td className="py-2.5 px-4 text-zinc-400 text-[11px]">{new Date(n.created_at).toLocaleDateString('ko-KR')}</td>
                    <td className="py-2.5 px-4 text-center">
                      <button onClick={() => deleteNotice(n.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
                {notices.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-zinc-400">공지가 없습니다.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chats Tab */}
      {!loading && tab === 'chats' && (
        <div className="card overflow-hidden">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="table-header text-left py-2.5 px-4">게시글</th>
              <th className="table-header text-left py-2.5 px-4">구매자</th>
              <th className="table-header text-left py-2.5 px-4">판매자</th>
              <th className="table-header text-center py-2.5 px-4">단계</th>
              <th className="table-header text-center py-2.5 px-4">상태</th>
              <th className="table-header text-left py-2.5 px-4">최근 활동</th>
              <th className="table-header text-center py-2.5 px-4">관리</th>
            </tr></thead>
            <tbody>
              {chats.map(c => (
                <tr key={c.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="py-2.5 px-4 font-medium">{(c.post as { title?: string })?.title || '삭제됨'}</td>
                  <td className="py-2.5 px-4 text-zinc-500">{(c.buyer as { name?: string })?.name || '-'}</td>
                  <td className="py-2.5 px-4 text-zinc-500">{(c.seller as { name?: string })?.name || '-'}</td>
                  <td className="py-2.5 px-4 text-center">{c.current_step}/6</td>
                  <td className="py-2.5 px-4 text-center"><span className="badge bg-zinc-100 text-zinc-600">{c.status}</span></td>
                  <td className="py-2.5 px-4 text-zinc-400 text-[11px]">{new Date(c.updated_at).toLocaleDateString('ko-KR')}</td>
                  <td className="py-2.5 px-4 text-center">
                    <button onClick={() => deleteChat(c.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {chats.length === 0 && <tr><td colSpan={7} className="py-8 text-center text-zinc-400">채팅이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
