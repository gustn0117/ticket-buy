'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, PenSquare, ShoppingCart, Tag, Megaphone, Lightbulb, ShieldCheck } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import SellPostItem from '@/components/home/SellPostItem';
import MainCompaniesSection from '@/components/home/MainCompaniesSection';
import { BrandLogo } from '@/components/BrandLogo';
import { getPosts, getPremiumBuyers, getNotices } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer, DBNotice } from '@/lib/types';

type PostWithAuthor = DBPost & { author: DBUser };

const BRANDS = ['전체', '롯데', '신세계', '문화상품권', '컬쳐랜드', '스타벅스', '온캐시', '구글플레이', '해피머니'];

const TIPS = [
  { title: '계약서 없이 입금 금지', desc: '모든 거래는 반드시 전자 계약서 작성 후 진행하세요.' },
  { title: '너무 높은 할인율은 의심', desc: '시세보다 비정상적으로 높은 할인율은 사기 신호일 수 있어요.' },
  { title: '신원 확인은 필수', desc: '거래 전 상대방의 거래 이력과 평점을 꼭 확인하세요.' },
];

export default function Home() {
  const [sellPosts, setSellPosts] = useState<PostWithAuthor[]>([]);
  const [buyPosts, setBuyPosts] = useState<PostWithAuthor[]>([]);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>([]);
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    Promise.allSettled([
      getPosts('sell', { limit: 30 }),
      getPosts('buy', { limit: 30 }),
      getPremiumBuyers(),
      getNotices(),
    ]).then(([s, b, pb, n]) => {
      if (s.status === 'fulfilled') setSellPosts(s.value);
      if (b.status === 'fulfilled') setBuyPosts(b.value);
      if (pb.status === 'fulfilled') setBuyers(pb.value);
      if (n.status === 'fulfilled') setNotices(n.value.slice(0, 5));
    }).finally(() => setLoading(false));

    const timer = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <HeroBanner />

      <div className="container-main py-6">
        <div className="flex gap-4">
          <LeftSidebar />

          <div className="flex-1 min-w-0">
            {/* 빠른 액션 배너 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <Link href="/board/write?type=sell" className="flex items-center gap-4 p-5 bg-gradient-to-r from-accent to-accent-light text-white hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Tag size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold">상품권 팝니다</p>
                  <p className="text-[12px] opacity-90">남는 상품권을 빠르게 판매하세요</p>
                </div>
                <PenSquare size={18} />
              </Link>
              <Link href="/board/write?type=buy" className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <ShoppingCart size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold">상품권 삽니다</p>
                  <p className="text-[12px] opacity-80">원하는 상품권을 직접 구매하세요</p>
                </div>
                <PenSquare size={18} />
              </Link>
            </div>

            {/* 브랜드 바로가기 */}
            <div className="bg-white border border-gray-200 mb-5">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="text-[14px] font-bold text-gray-800">브랜드별 바로가기</h3>
                <Link href="/category/product" className="text-[11px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                  전체 브랜드 <ChevronRight size={11} />
                </Link>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-9 gap-0 p-2">
                {BRANDS.map(b => (
                  <Link key={b} href={`/category/product?type=${b}`} className="flex flex-col items-center gap-1 py-2 hover:bg-accent/5 rounded transition-colors">
                    <BrandLogo name={b} size="sm" />
                    <span className="text-[10px] text-gray-600 truncate max-w-full">{b}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 공지 + TIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              {/* 공지사항 */}
              <div className="bg-white border border-gray-200">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-1.5">
                    <Megaphone size={13} className="text-gray-500" />
                    <span className="text-[12px] font-bold">공지사항</span>
                  </div>
                  <Link href="/notice" className="text-[11px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                    더보기 <ChevronRight size={11} />
                  </Link>
                </div>
                <div>
                  {notices.length === 0 ? (
                    <p className="py-6 text-center text-[12px] text-gray-400">등록된 공지가 없습니다.</p>
                  ) : notices.map(n => (
                    <Link key={n.id} href="/notice" className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        {n.is_pinned && <ShieldCheck size={11} className="text-accent shrink-0" />}
                        <span className="text-[12px] text-gray-700 truncate">{n.title}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-3">
                        {new Date(n.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* TIP */}
              <div className="bg-white border border-gray-200 flex items-stretch overflow-hidden">
                <div className="shrink-0 flex items-center justify-center w-[90px]" style={{ background: 'linear-gradient(135deg, #E63946 0%, #F26A4B 100%)' }}>
                  <div className="text-center">
                    <Lightbulb size={18} className="text-white mx-auto mb-0.5" />
                    <p className="text-white text-[10px] font-bold tracking-wider">TIP</p>
                  </div>
                </div>
                <div className="flex-1 p-4 min-w-0">
                  <p className="text-[13px] font-bold text-gray-800 mb-0.5">{TIPS[tipIdx].title}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{TIPS[tipIdx].desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-1">
                      {TIPS.map((_, i) => (
                        <button key={i} onClick={() => setTipIdx(i)}
                          className={`h-1 rounded-full transition-all ${i === tipIdx ? 'bg-accent w-4' : 'bg-gray-300 w-1.5'}`} />
                      ))}
                    </div>
                    <Link href="/guide" className="text-[10px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                      이용방법 <ChevronRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 메인 등록업체 (5열 그리드) */}
            <MainCompaniesSection buyers={buyers} loading={loading} />

            {/* 상품권 팝니다 (최신 판매글) */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-gray-800 flex items-center gap-2">
                  <Tag size={15} className="text-accent" />
                  상품권 팝니다
                  {!loading && <span className="text-[12px] text-gray-400 font-normal">{sellPosts.length}건</span>}
                </h2>
                <div className="flex items-center gap-2">
                  <Link href="/board?tab=sell" className="text-[12px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                    전체보기 <ChevronRight size={11} />
                  </Link>
                  <Link href="/board/write?type=sell" className="btn-accent h-8 px-3 text-[12px]">
                    <PenSquare size={12} /> 판매글 작성
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="py-10 text-center text-gray-400 text-[13px]">불러오는 중...</div>
              ) : sellPosts.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-[13px] text-gray-500 mb-2">아직 등록된 판매글이 없습니다.</p>
                  <Link href="/board/write?type=sell" className="text-[12px] text-accent font-bold hover:underline">
                    첫 판매글 작성하기 →
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 overflow-hidden">
                  {sellPosts.slice(0, 10).map((post, idx) => (
                    <SellPostItem key={post.id} post={post} num={idx + 1} showStatus />
                  ))}
                  {sellPosts.length > 10 && (
                    <Link href="/board?tab=sell" className="block py-3 text-center text-[12px] text-gray-500 hover:text-accent hover:bg-gray-50 border-t border-gray-100 transition-colors">
                      + {sellPosts.length - 10}건 더보기
                    </Link>
                  )}
                </div>
              )}
            </section>

            {/* 상품권 삽니다 (최신 구매글) */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingCart size={15} className="text-accent" />
                  상품권 삽니다
                  {!loading && <span className="text-[12px] text-gray-400 font-normal">{buyPosts.length}건</span>}
                </h2>
                <div className="flex items-center gap-2">
                  <Link href="/board?tab=buy" className="text-[12px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                    전체보기 <ChevronRight size={11} />
                  </Link>
                  <Link href="/board/write?type=buy" className="btn-primary h-8 px-3 text-[12px]">
                    <PenSquare size={12} /> 구매글 작성
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="py-10 text-center text-gray-400 text-[13px]">불러오는 중...</div>
              ) : buyPosts.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 py-10 text-center">
                  <p className="text-[13px] text-gray-500 mb-2">아직 등록된 구매글이 없습니다.</p>
                  <Link href="/board/write?type=buy" className="text-[12px] text-accent font-bold hover:underline">
                    첫 구매글 작성하기 →
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 overflow-hidden">
                  {buyPosts.slice(0, 10).map((post, idx) => (
                    <SellPostItem key={post.id} post={post} num={idx + 1} />
                  ))}
                  {buyPosts.length > 10 && (
                    <Link href="/board?tab=buy" className="block py-3 text-center text-[12px] text-gray-500 hover:text-accent hover:bg-gray-50 border-t border-gray-100 transition-colors">
                      + {buyPosts.length - 10}건 더보기
                    </Link>
                  )}
                </div>
              )}
            </section>

          </div>

          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
