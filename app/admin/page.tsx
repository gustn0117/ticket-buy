'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { getMessages, getPremiumBuyers, createNotice as apiCreateNotice, deleteNotice as apiDeleteNotice, deleteUser as apiDeleteUser, updateUser, deletePost as apiDeletePost, deleteChat as apiDeleteChat, createPremiumBuyer, updatePremiumBuyer, deletePremiumBuyer as apiDeletePremiumBuyer } from '@/lib/api';
import ImageUpload from '@/components/ImageUpload';
import type { DBUser, DBPost, DBNotice, DBChat, DBMessage, DBPremiumBuyer } from '@/lib/types';
import type { Ad, AdSlot } from '@/lib/ads';
import { AD_SLOT_LABELS, AD_SLOT_SIZES } from '@/lib/ads';
import { Users, FileText, Bell, MessageCircle, Trash2, Shield, Megaphone, Pencil, Plus, Eye, EyeOff, ArrowLeft, Radio, Crown } from 'lucide-react';
import { getCategoryName } from '@/data/mock';

const ALL_SLOTS = Object.keys(AD_SLOT_LABELS) as AdSlot[];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState<'users' | 'posts' | 'notices' | 'chats' | 'premium' | 'ads'>('users');
  const [users, setUsers] = useState<DBUser[]>([]);
  const [posts, setPosts] = useState<(DBPost & { author?: DBUser })[]>([]);
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [chats, setChats] = useState<DBChat[]>([]);
  const [premiumBuyers, setPremiumBuyers] = useState<DBPremiumBuyer[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [visitors, setVisitors] = useState<{ total: number; today: number; last30: { date: string; count: number }[] }>({ total: 0, today: 0, last30: [] });
  const [loading, setLoading] = useState(false);

  // Chat viewer
  const [viewingChat, setViewingChat] = useState<DBChat | null>(null);
  const [chatMessages, setChatMessages] = useState<DBMessage[]>([]);
  const [chatMsgLoading, setChatMsgLoading] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  // Notice form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticePinned, setNoticePinned] = useState(false);

  // Premium buyer form
  const [showPremiumForm, setShowPremiumForm] = useState(false);
  const [editingPremium, setEditingPremium] = useState<DBPremiumBuyer | null>(null);
  const [premiumForm, setPremiumForm] = useState({ name: '', description: '', phone: '', region: '', brands: '', image_url: '', user_id: '', priority: 0, is_active: true, tier: 'standard' as 'premium' | 'standard' | 'basic' });

  // Ad form
  const [showAdForm, setShowAdForm] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [adForm, setAdForm] = useState({
    slot: 'hero_banner' as AdSlot,
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    advertiser: '',
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    priority: 0,
    is_active: true,
  });

  const [loginError, setLoginError] = useState('');
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (data.ok) setAuthed(true);
      else setLoginError(data.error || '비밀번호가 틀렸습니다.');
    } catch {
      setLoginError('서버 오류가 발생했습니다.');
    }
  };

  const fetchData = async () => {
    setLoading(true);

    // 모든 데이터를 동시에 병렬 요청
    const [u, p, n, c, v, pb, ad] = await Promise.allSettled([
      supabase.from('users').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('posts').select('*, author:users!author_id(id, name, type)').order('created_at', { ascending: false }).limit(200),
      supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('chats').select('id, post_id, buyer_id, seller_id, status, current_step, trade_type, escrow_status, created_at, updated_at').order('updated_at', { ascending: false }).limit(200),
      fetch('/api/visitors').then(r => r.json()),
      getPremiumBuyers(false),
      fetch('/api/ads').then(r => r.json()),
    ]);

    if (u.status === 'fulfilled' && u.value.data) setUsers(u.value.data);
    if (p.status === 'fulfilled' && p.value.data) setPosts(p.value.data);
    if (n.status === 'fulfilled' && n.value.data) setNotices(n.value.data);
    if (c.status === 'fulfilled' && c.value.data) setChats(c.value.data);
    if (v.status === 'fulfilled') setVisitors(v.value);
    if (pb.status === 'fulfilled') setPremiumBuyers(pb.value);
    if (ad.status === 'fulfilled') setAds(ad.value);

    setLoading(false);
  };

  useEffect(() => { if (authed) fetchData(); }, [authed]);

  // CRUD helpers - api.ts 함수 사용
  const deleteUser = async (id: string) => { if (!confirm('정말 삭제하시겠습니까?')) return; await apiDeleteUser(id); fetchData(); };
  const deletePost = async (id: string) => { if (!confirm('게시글을 삭제하시겠습니까?')) return; await apiDeletePost(id); fetchData(); };
  const deleteNotice = async (id: string) => { if (!confirm('공지를 삭제하시겠습니까?')) return; await apiDeleteNotice(id); fetchData(); };
  const addNotice = async (e: React.FormEvent) => { e.preventDefault(); if (!noticeTitle.trim()) return; await apiCreateNotice({ title: noticeTitle, is_pinned: noticePinned }); setNoticeTitle(''); setNoticePinned(false); fetchData(); };
  const toggleUserType = async (id: string, t: string) => { await updateUser(id, { type: t === 'normal' ? 'business' : 'normal' } as any); fetchData(); };
  const deleteChat = async (id: string) => { if (!confirm('채팅을 삭제하시겠습니까?')) return; await apiDeleteChat(id); if (viewingChat?.id === id) setViewingChat(null); fetchData(); };

  // 채팅 실시간 뷰어
  const openChatViewer = async (chat: DBChat) => {
    setViewingChat(chat);
    setChatMsgLoading(true);
    try {
      const msgs = await getMessages(chat.id);
      setChatMessages(msgs);
    } catch { setChatMessages([]); }
    setChatMsgLoading(false);
  };

  useEffect(() => {
    if (!viewingChat) return;
    const channel = supabase
      .channel(`admin-chat-${viewingChat.id}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'ticket_buy', table: 'messages',
        filter: `chat_id=eq.${viewingChat.id}`,
      }, (payload: { new: DBMessage }) => {
        setChatMessages(prev => prev.some(m => m.id === payload.new.id) ? prev : [...prev, payload.new]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [viewingChat]);

  useEffect(() => { msgEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  // Premium Buyer CRUD
  const resetPremiumForm = () => { setPremiumForm({ name: '', description: '', phone: '', region: '', brands: '', image_url: '', user_id: '', priority: 0, is_active: true, tier: 'standard' }); setEditingPremium(null); setShowPremiumForm(false); };
  const startEditPremium = (b: DBPremiumBuyer) => { setPremiumForm({ name: b.name, description: b.description, phone: b.phone, region: b.region, brands: b.brands?.join(', ') || '', image_url: b.image_url, user_id: b.user_id || '', priority: b.priority, is_active: b.is_active, tier: b.tier || 'standard' }); setEditingPremium(b); setShowPremiumForm(true); };
  const savePremium = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: premiumForm.name, description: premiumForm.description, phone: premiumForm.phone, region: premiumForm.region, brands: premiumForm.brands.split(',').map(s => s.trim()).filter(Boolean), image_url: premiumForm.image_url, user_id: premiumForm.user_id || null, priority: premiumForm.priority, is_active: premiumForm.is_active, tier: premiumForm.tier };
    if (editingPremium) {
      await updatePremiumBuyer(editingPremium.id, payload);
    } else {
      await createPremiumBuyer(payload);
    }
    resetPremiumForm();
    fetchData();
  };
  const deletePremium = async (id: string) => { if (!confirm('프리미엄 업체를 삭제하시겠습니까?')) return; await apiDeletePremiumBuyer(id); fetchData(); };
  const togglePremiumActive = async (b: DBPremiumBuyer) => { await updatePremiumBuyer(b.id, { is_active: !b.is_active }); fetchData(); };

  // Ad CRUD
  const resetAdForm = () => {
    setAdForm({ slot: 'hero_banner', title: '', description: '', image_url: '', link_url: '', advertiser: '', start_date: new Date().toISOString().slice(0, 10), end_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10), priority: 0, is_active: true });
    setEditingAd(null);
    setShowAdForm(false);
  };

  const startEditAd = (ad: Ad) => {
    setAdForm({ slot: ad.slot, title: ad.title, description: ad.description, image_url: ad.image_url, link_url: ad.link_url, advertiser: ad.advertiser, start_date: ad.start_date.slice(0, 10), end_date: ad.end_date.slice(0, 10), priority: ad.priority, is_active: ad.is_active });
    setEditingAd(ad);
    setShowAdForm(true);
  };

  const saveAd = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...adForm, start_date: adForm.start_date + 'T00:00:00Z', end_date: adForm.end_date + 'T23:59:59Z' };
    if (editingAd) {
      await fetch('/api/ads', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, id: editingAd.id }) });
    } else {
      await fetch('/api/ads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    resetAdForm();
    fetchData();
  };

  const deleteAd = async (id: string) => {
    if (!confirm('광고를 삭제하시겠습니까?')) return;
    await fetch(`/api/ads?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const toggleAdActive = async (ad: Ad) => {
    await fetch('/api/ads', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: ad.id, is_active: !ad.is_active }) });
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
            {loginError && <p className="text-[12px] text-red-500">{loginError}</p>}
            <button type="submit" className="btn-primary w-full h-10">로그인</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'users' as const, label: '회원', icon: Users, count: users.length },
    { key: 'posts' as const, label: '게시글', icon: FileText, count: posts.length },
    { key: 'notices' as const, label: '공지', icon: Bell, count: notices.length },
    { key: 'chats' as const, label: '거래', icon: MessageCircle, count: chats.length },
    { key: 'premium' as const, label: '프리미엄', icon: Crown, count: premiumBuyers.length },
    { key: 'ads' as const, label: '광고', icon: Megaphone, count: ads.length },
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="section-title mb-0">관리자 패널</h1>
        <button onClick={() => setAuthed(false)} className="btn-secondary text-[12px] h-8">로그아웃</button>
      </div>

      <div className="grid grid-cols-6 gap-3 mb-5">
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

      {/* 방문자 통계 */}
      {!loading && (
        <div className="card p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold">방문자 현황</h3>
            <div className="flex items-center gap-4 text-[12px]">
              <span className="text-zinc-500">오늘 <span className="font-semibold text-zinc-900">{visitors.today}</span></span>
              <span className="text-zinc-500">누적 <span className="font-semibold text-zinc-900">{visitors.total.toLocaleString()}</span></span>
            </div>
          </div>
          <div className="flex items-end gap-[3px] h-[80px]">
            {visitors.last30.map((d, i) => {
              const max = Math.max(...visitors.last30.map(v => v.count), 1);
              const h = Math.max((d.count / max) * 100, 2);
              const isToday = i === visitors.last30.length - 1;
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5" title={`${d.date}: ${d.count}명`}>
                  <div className={`w-full rounded-sm transition-all ${isToday ? 'bg-zinc-900' : 'bg-zinc-200 hover:bg-zinc-300'}`} style={{ height: `${h}%` }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] text-zinc-400">
            <span>{visitors.last30[0]?.date.slice(5)}</span>
            <span>최근 30일</span>
            <span>{visitors.last30[visitors.last30.length - 1]?.date.slice(5)}</span>
          </div>
        </div>
      )}

      {loading && <div className="py-8 text-center text-zinc-400 text-[13px]">불러오는 중...</div>}

      {/* ─── Users ─── */}
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
                  <td className="py-2.5 px-4 text-center"><button onClick={() => toggleUserType(u.id, u.type)} className={`badge cursor-pointer ${u.type === 'business' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-500'}`}>{u.type === 'business' ? '업체' : '일반'}</button></td>
                  <td className="py-2.5 px-4 text-zinc-400 text-[11px]">{new Date(u.created_at).toLocaleDateString('ko-KR')}</td>
                  <td className="py-2.5 px-4 text-center"><button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-zinc-400">회원이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Posts ─── */}
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
                  <td className="py-2.5 px-4 text-center"><button onClick={() => deletePost(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={8} className="py-8 text-center text-zinc-400">게시글이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Notices ─── */}
      {!loading && tab === 'notices' && (
        <div className="space-y-4">
          <form onSubmit={addNotice} className="card p-4 flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-[12px] font-medium text-zinc-600 mb-1">새 공지사항</label>
              <input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="공지 제목을 입력하세요" className="input" required />
            </div>
            <label className="flex items-center gap-1.5 text-[12px] text-zinc-600 whitespace-nowrap shrink-0 mb-1">
              <input type="checkbox" checked={noticePinned} onChange={(e) => setNoticePinned(e.target.checked)} className="w-3.5 h-3.5" /> 고정
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
                    <td className="py-2.5 px-4 text-center"><button onClick={() => deleteNotice(n.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button></td>
                  </tr>
                ))}
                {notices.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-zinc-400">공지가 없습니다.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Chats ─── */}
      {!loading && tab === 'chats' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* 채팅 목록 */}
          <div className={`card overflow-hidden ${viewingChat ? 'lg:col-span-2' : 'lg:col-span-5'}`}>
            <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-200 text-[12px] font-medium text-zinc-600">
              채팅 목록 ({chats.length})
            </div>
            <div className="divide-y divide-zinc-100 max-h-[600px] overflow-y-auto">
              {chats.map(c => {
                const buyerName = users.find(u => u.id === c.buyer_id)?.name || '-';
                const sellerName = users.find(u => u.id === c.seller_id)?.name || '-';
                const postTitle = posts.find(p => p.id === c.post_id)?.title || '삭제됨';
                const isViewing = viewingChat?.id === c.id;
                return (
                  <div key={c.id} onClick={() => openChatViewer(c)}
                    className={`px-4 py-3 cursor-pointer hover:bg-zinc-50 transition-colors ${isViewing ? 'bg-zinc-100' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-zinc-800 truncate">{postTitle}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="badge bg-zinc-100 text-zinc-500">{c.current_step}/{c.trade_type === 'escrow' ? 8 : 6}</span>
                        {c.trade_type === 'escrow' && <span className="badge bg-blue-50 text-blue-500">중개</span>}
                        <button onClick={(e) => { e.stopPropagation(); deleteChat(c.id); }} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <span>{buyerName}</span>
                      <span className="text-zinc-300">&harr;</span>
                      <span>{sellerName}</span>
                      <span className="ml-auto">{new Date(c.updated_at).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                );
              })}
              {chats.length === 0 && <div className="py-12 text-center text-zinc-400 text-[13px]">채팅이 없습니다.</div>}
            </div>
          </div>

          {/* 실시간 메시지 뷰어 */}
          {viewingChat && (
            <div className="card lg:col-span-3 flex flex-col overflow-hidden">
              <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewingChat(null)} className="text-zinc-400 hover:text-zinc-700 lg:hidden"><ArrowLeft size={16} /></button>
                  <Radio size={12} className="text-green-500 animate-pulse" />
                  <span className="text-[12px] font-medium text-zinc-700">실시간 조회</span>
                  <span className="text-[11px] text-zinc-400">| {users.find(u => u.id === viewingChat.buyer_id)?.name || '?'} &harr; {users.find(u => u.id === viewingChat.seller_id)?.name || '?'}</span>
                </div>
                <span className="text-[11px] text-zinc-400">{chatMessages.length}건</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50 max-h-[520px] min-h-[300px]">
                {chatMsgLoading ? (
                  <div className="py-8 text-center text-zinc-400 text-[13px]">불러오는 중...</div>
                ) : chatMessages.length === 0 ? (
                  <div className="py-8 text-center text-zinc-400 text-[13px]">메시지가 없습니다.</div>
                ) : chatMessages.map(msg => {
                  const isBuyer = msg.sender_id === viewingChat.buyer_id;
                  const isSeller = msg.sender_id === viewingChat.seller_id;
                  const senderName = isBuyer ? users.find(u => u.id === viewingChat.buyer_id)?.name : isSeller ? users.find(u => u.id === viewingChat.seller_id)?.name : '시스템';
                  const time = new Date(msg.created_at);
                  const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;

                  if (msg.type === 'notice' || msg.type === 'system-action') {
                    return (
                      <div key={msg.id} className="text-center">
                        <span className="inline-block bg-white border border-zinc-200 rounded px-3 py-1.5 text-[11px] text-zinc-500 max-w-[90%]">
                          {msg.content.length > 80 ? msg.content.slice(0, 80) + '...' : msg.content}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className={`flex gap-2 ${isBuyer ? '' : 'flex-row-reverse'}`}>
                      <div className={`max-w-[70%] ${isBuyer ? '' : 'text-right'}`}>
                        <p className="text-[10px] text-zinc-400 mb-0.5">{senderName} <span className="text-zinc-300">{timeStr}</span></p>
                        <div className={`inline-block px-3 py-2 rounded-lg text-[13px] ${
                          isBuyer ? 'bg-white border border-zinc-200 text-zinc-800' : 'bg-zinc-900 text-white'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={msgEndRef} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Premium Buyers ─── */}
      {!loading && tab === 'premium' && (
        <div className="space-y-4">
          {showPremiumForm && (
            <form onSubmit={savePremium} className="card p-5 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[14px] font-semibold">{editingPremium ? '프리미엄 업체 수정' : '프리미엄 업체 등록'}</h3>
                <button type="button" onClick={resetPremiumForm} className="text-zinc-400 hover:text-zinc-700 text-[12px]">취소</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">업체명 *</label>
                  <input value={premiumForm.name} onChange={e => setPremiumForm(p => ({ ...p, name: e.target.value }))} className="input h-9" required />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">연락처</label>
                  <input value={premiumForm.phone} onChange={e => setPremiumForm(p => ({ ...p, phone: e.target.value }))} className="input h-9" placeholder="010-0000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">업체 소개 (2~3줄)</label>
                <textarea value={premiumForm.description} onChange={e => setPremiumForm(p => ({ ...p, description: e.target.value }))}
                  className="input" rows={2} placeholder="예: 간편한 비대면 상품권 매입 / 당일 입금 OK"
                  style={{ height: 'auto', minHeight: '60px', padding: '8px 12px' }} />
                <p className="text-[10px] text-zinc-400 mt-1">카드에 간략히 표시됩니다. 핵심 혜택만 짧게 작성하세요.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">지역</label>
                  <input value={premiumForm.region} onChange={e => setPremiumForm(p => ({ ...p, region: e.target.value }))} className="input h-9" placeholder="서울 강남구" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">취급 브랜드 (쉼표 구분)</label>
                  <input value={premiumForm.brands} onChange={e => setPremiumForm(p => ({ ...p, brands: e.target.value }))} className="input h-9" placeholder="신세계, 롯데" />
                </div>
              </div>
              <div>
                <ImageUpload label="업체 이미지" value={premiumForm.image_url} onChange={(url) => setPremiumForm(p => ({ ...p, image_url: url }))} />
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">연결 회원 (선택)</label>
                  <select value={premiumForm.user_id} onChange={e => setPremiumForm(p => ({ ...p, user_id: e.target.value }))} className="input h-9">
                    <option value="">미연결</option>
                    {users.filter(u => u.type === 'business').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">광고 등급</label>
                  <select value={premiumForm.tier} onChange={e => setPremiumForm(p => ({ ...p, tier: e.target.value as 'premium' | 'standard' | 'basic' }))} className="input h-9">
                    <option value="premium">프리미엄</option>
                    <option value="standard">스탠다드</option>
                    <option value="basic">베이직</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">우선순위</label>
                  <input type="number" value={premiumForm.priority} onChange={e => setPremiumForm(p => ({ ...p, priority: Number(e.target.value) }))} className="input h-9" />
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-1.5 text-[12px] text-zinc-600">
                    <input type="checkbox" checked={premiumForm.is_active} onChange={e => setPremiumForm(p => ({ ...p, is_active: e.target.checked }))} className="w-3.5 h-3.5" /> 활성화
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={resetPremiumForm} className="btn-secondary flex-1 h-9 text-[12px]">취소</button>
                <button type="submit" className="btn-primary flex-1 h-9 text-[12px]">{editingPremium ? '수정' : '등록'}</button>
              </div>
            </form>
          )}

          {!showPremiumForm && (
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-zinc-500">{premiumBuyers.filter(b => b.is_active).length}개 활성</span>
              <button onClick={() => setShowPremiumForm(true)} className="btn-primary h-9"><Plus size={14} /> 새 업체</button>
            </div>
          )}

          <div className="card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead><tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="table-header text-left py-2.5 px-4">업체명</th>
                <th className="table-header text-left py-2.5 px-4">소개</th>
                <th className="table-header text-left py-2.5 px-4">브랜드</th>
                <th className="table-header text-left py-2.5 px-4">연락처</th>
                <th className="table-header text-left py-2.5 px-4">지역</th>
                <th className="table-header text-center py-2.5 px-4">등급</th>
                <th className="table-header text-center py-2.5 px-4">순위</th>
                <th className="table-header text-center py-2.5 px-4">상태</th>
                <th className="table-header text-center py-2.5 px-4">관리</th>
              </tr></thead>
              <tbody>
                {premiumBuyers.map(b => (
                  <tr key={b.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                    <td className="py-2.5 px-4 font-medium">{b.name}</td>
                    <td className="py-2.5 px-4 text-zinc-500 max-w-[200px] truncate">{b.description || '-'}</td>
                    <td className="py-2.5 px-4">{b.brands?.map(br => <span key={br} className="badge bg-zinc-100 text-zinc-600 mr-1">{br}</span>)}</td>
                    <td className="py-2.5 px-4 text-zinc-500">{b.phone || '-'}</td>
                    <td className="py-2.5 px-4 text-zinc-500">{b.region || '-'}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`badge ${b.tier === 'premium' ? 'bg-yellow-50 text-yellow-600' : b.tier === 'basic' ? 'bg-zinc-100 text-zinc-400' : 'bg-blue-50 text-blue-600'}`}>
                        {b.tier === 'premium' ? '프리미엄' : b.tier === 'basic' ? '베이직' : '스탠다드'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-center">{b.priority}</td>
                    <td className="py-2.5 px-4 text-center">
                      <button onClick={() => togglePremiumActive(b)} className={`badge cursor-pointer ${b.is_active ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-400'}`}>
                        {b.is_active ? '활성' : '비활성'}
                      </button>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => startEditPremium(b)} className="text-zinc-400 hover:text-zinc-600"><Pencil size={13} /></button>
                        <button onClick={() => deletePremium(b.id)} className="text-red-400 hover:text-red-600"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {premiumBuyers.length === 0 && <tr><td colSpan={9} className="py-8 text-center text-zinc-400">프리미엄 업체가 없습니다.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Ads ─── */}
      {!loading && tab === 'ads' && (
        <div className="space-y-4">
          {/* Ad Form */}
          {showAdForm && (
            <form onSubmit={saveAd} className="card p-5 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[15px] font-semibold">{editingAd ? '광고 수정' : '새 광고 등록'}</h3>
                <button type="button" onClick={resetAdForm} className="text-zinc-400 hover:text-zinc-700 text-[12px]">취소</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">슬롯 위치 *</label>
                  <select value={adForm.slot} onChange={e => setAdForm(p => ({ ...p, slot: e.target.value as AdSlot }))} className="input">
                    {ALL_SLOTS.map(s => (
                      <option key={s} value={s}>{AD_SLOT_LABELS[s]} ({AD_SLOT_SIZES[s]})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">광고주</label>
                  <input value={adForm.advertiser} onChange={e => setAdForm(p => ({ ...p, advertiser: e.target.value }))} className="input" placeholder="광고주명" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-zinc-600 mb-1">광고 제목 *</label>
                <input value={adForm.title} onChange={e => setAdForm(p => ({ ...p, title: e.target.value }))} className="input" required placeholder="배너에 표시될 제목" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-zinc-600 mb-1">설명</label>
                <input value={adForm.description} onChange={e => setAdForm(p => ({ ...p, description: e.target.value }))} className="input" placeholder="짧은 설명" />
              </div>
              <div>
                <ImageUpload label="광고 이미지" value={adForm.image_url} onChange={(url) => setAdForm(p => ({ ...p, image_url: url }))} />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">클릭 시 이동 URL</label>
                  <input value={adForm.link_url} onChange={e => setAdForm(p => ({ ...p, link_url: e.target.value }))} className="input" placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">시작일</label>
                  <input type="date" value={adForm.start_date} onChange={e => setAdForm(p => ({ ...p, start_date: e.target.value }))} className="input" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">종료일</label>
                  <input type="date" value={adForm.end_date} onChange={e => setAdForm(p => ({ ...p, end_date: e.target.value }))} className="input" />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-zinc-600 mb-1">우선순위</label>
                  <input type="number" value={adForm.priority} onChange={e => setAdForm(p => ({ ...p, priority: Number(e.target.value) }))} className="input" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-[12px] text-zinc-600">
                  <input type="checkbox" checked={adForm.is_active} onChange={e => setAdForm(p => ({ ...p, is_active: e.target.checked }))} className="w-3.5 h-3.5" /> 활성화
                </label>
                <div className="ml-auto flex gap-2">
                  <button type="button" onClick={resetAdForm} className="btn-secondary h-9">취소</button>
                  <button type="submit" className="btn-primary h-9">{editingAd ? '수정' : '등록'}</button>
                </div>
              </div>
            </form>
          )}

          {/* Slot overview */}
          {!showAdForm && (
            <div className="flex items-center justify-between">
              <div className="text-[13px] text-zinc-500">
                {ALL_SLOTS.length}개 슬롯 / {ads.filter(a => a.is_active).length}개 활성 광고
              </div>
              <button onClick={() => setShowAdForm(true)} className="btn-primary h-9">
                <Plus size={14} /> 새 광고
              </button>
            </div>
          )}

          {/* Grouped by slot */}
          {!showAdForm && ALL_SLOTS.map(slot => {
            const slotAds = ads.filter(a => a.slot === slot);
            if (slotAds.length === 0) return (
              <div key={slot} className="card p-3 flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-medium text-zinc-700">{AD_SLOT_LABELS[slot]}</span>
                  <span className="text-[11px] text-zinc-400 ml-2">{AD_SLOT_SIZES[slot]}</span>
                </div>
                <span className="text-[11px] text-zinc-400">비어있음</span>
              </div>
            );
            return (
              <div key={slot} className="card overflow-hidden">
                <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="text-[13px] font-medium text-zinc-700">{AD_SLOT_LABELS[slot]}</span>
                    <span className="text-[11px] text-zinc-400 ml-2">{AD_SLOT_SIZES[slot]}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500">{slotAds.length}개</span>
                </div>
                {slotAds.map(a => (
                  <div key={a.id} className="px-4 py-3 border-b border-zinc-100 last:border-b-0 flex items-center gap-3 hover:bg-zinc-50">
                    {a.image_url ? (
                      <div className="w-16 h-10 rounded bg-zinc-100 overflow-hidden shrink-0">
                        <img src={a.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-10 rounded bg-zinc-100 flex items-center justify-center text-[9px] text-zinc-400 shrink-0">미리보기</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-zinc-800 truncate">{a.title || '(제목 없음)'}</p>
                      <p className="text-[11px] text-zinc-400">{a.advertiser || '광고주 미지정'} / {a.start_date.slice(0, 10)} ~ {a.end_date.slice(0, 10)}</p>
                    </div>
                    <span className={`badge ${a.is_active ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-400'}`}>
                      {a.is_active ? '활성' : '비활성'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => toggleAdActive(a)} className="text-zinc-400 hover:text-zinc-600" title={a.is_active ? '비활성화' : '활성화'}>
                        {a.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => startEditAd(a)} className="text-zinc-400 hover:text-zinc-600"><Pencil size={14} /></button>
                      <button onClick={() => deleteAd(a.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
