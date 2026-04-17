'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Phone, MapPin, Lightbulb } from 'lucide-react';
import HeroBanner from '@/components/home/HeroBanner';
import CategorySearch from '@/components/home/CategorySearch';
import CompanyCard from '@/components/home/CompanyCard';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import BottomSections from '@/components/home/BottomSections';
import MainAdsSection from '@/components/home/MainAdsSection';
import { getPosts, getPremiumBuyers, getNotices } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer, DBNotice } from '@/lib/types';

type PostWithAuthor = DBPost & { author: DBUser };

export default function Home() {
  const [sellPosts, setSellPosts] = useState<PostWithAuthor[]>([]);
  const [buyPosts, setBuyPosts] = useState<PostWithAuthor[]>([]);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>([]);
  const [notices, setNotices] = useState<DBNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getPosts('sell'),
      getPosts('buy'),
      getPremiumBuyers(),
      getNotices(),
    ]).then(([s, b, pb, n]) => {
      if (s.status === 'fulfilled') setSellPosts(s.value);
      if (b.status === 'fulfilled') setBuyPosts(b.value);
      if (pb.status === 'fulfilled') setBuyers(pb.value);
      if (n.status === 'fulfilled') setNotices(n.value.slice(0, 10));
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Content - 3 column layout */}
      <div className="container-main py-6">
        <div className="flex gap-4">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Center Content */}
          <div className="flex-1 min-w-0">
            {/* Premium Banner + Category Search */}
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              {/* Premium Banner Slider */}
              <div className="w-full md:w-[300px] shrink-0">
                <div className="bg-white border border-gray-200 h-full flex flex-col min-h-[180px]">
                  <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                    <span className="text-[12px] font-bold text-accent">Premium Banner</span>
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-center">
                    {buyers.length > 0 ? (
                      <div className="w-full">
                        <p className="text-[13px] font-bold text-gray-800 truncate">{buyers[0]?.name}</p>
                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{buyers[0]?.description}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          {buyers[0]?.region && <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm font-bold">{buyers[0]?.region}</span>}
                        </div>
                        <Link href={`/buyer/${buyers[0]?.id}`} className="flex items-center gap-1 mt-2 text-[11px] text-gray-600 hover:text-accent">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                          상세보기
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-[12px] text-gray-400">프리미엄 업체 모집 중</p>
                        <Link href="/register-business" className="text-[11px] text-accent font-bold mt-1 inline-block">문의하기</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Search */}
              <div className="flex-1">
                <CategorySearch />
              </div>
            </div>

            {/* Scrolling notice text */}
            <div className="bg-white border border-gray-200 px-4 py-2 mb-5 text-[11px] text-gray-500 overflow-hidden">
              <span className="text-gray-400">* 배너위치는 실시간으로 랜덤 배치됩니다.</span>
            </div>

            {/* 메인 등록업체 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[17px] font-bold text-gray-800">
                  메인 등록업체
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">광고문의</span>
                  <Link href="/register-business" className="text-[11px] text-accent hover:underline">스폰서링크</Link>
                </div>
              </div>

              {loading ? (
                <div className="py-16 text-center text-gray-400 text-[13px]">불러오는 중...</div>
              ) : buyers.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {buyers.map((company, i) => (
                    <CompanyCard key={company.id} company={company} isNew={i < 3} />
                  ))}
                </div>
              ) : (
                /* 업체가 없을 때 데모 카드 */
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="company-card">
                      <div className="company-card-image">
                        <h3>상품권 매입 업체 {i + 1}</h3>
                      </div>
                      <div className="company-card-body">
                        <p>빠르고 안전한 상품권 매입<br />신속한 입금 처리</p>
                        <div className="company-card-phone">
                          <Phone size={13} className="text-gray-500" />
                          <span>010-{String(1000 + i * 111).slice(0, 4)}-{String(5000 + i * 222).slice(0, 4)}</span>
                        </div>
                      </div>
                      <div className="company-card-footer">
                        <span className="text-accent font-bold flex items-center gap-1">
                          <MapPin size={10} />
                          매입업체{i + 1}
                        </span>
                        <span className="text-gray-500">전국</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 추가 등록업체 rows (2차) */}
            {buyers.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
                {buyers.slice(0, Math.min(5, buyers.length)).map((company) => (
                  <CompanyCard key={`second-${company.id}`} company={company} />
                ))}
              </div>
            )}

            {/* 인기 클릭 통계 바 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="bg-gradient-to-r from-accent to-accent-light text-white p-4">
                <p className="text-[13px] font-bold">
                  지역별 업체찾기에서 <span className="text-[18px]">경기지역</span>이 가장 클릭수가 많았어요!
                </p>
                <div className="flex items-center gap-4 mt-3">
                  {['경남 2,337', '인천 2,418', '부산 3,260', '서울 3,745', '경기 4,323'].map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="text-[10px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-accent-light to-accent text-white p-4">
                <p className="text-[13px] font-bold">
                  상품별 업체찾기에서 <span className="text-[18px]">모바일상품권</span>이 가장 클릭수가 많았어요!
                </p>
                <div className="flex items-center gap-4 mt-3">
                  {['비상금 2,002', '소액 2,701', '당일 3,168', '직장인 4,055', '무직자 4,412'].map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="text-[10px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 전국 업체 등록현황 + 오늘의 추천업체 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="bg-white border border-gray-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <h3 className="text-[14px] font-bold">
                    전국 상품권업체 등록현황
                    <span className="text-[12px] text-accent ml-2">257개</span>
                  </h3>
                  <Link href="/board" className="text-[11px] text-gray-500 hover:text-accent flex items-center gap-0.5">
                    더보기 <ChevronRight size={10} />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="grid grid-cols-3 gap-0 px-4 py-2 text-[11px] text-gray-500 bg-gray-50">
                    <span>지역</span>
                    <span>제목</span>
                    <span className="text-right">업체명</span>
                  </div>
                  {(sellPosts.length > 0 ? sellPosts.slice(0, 8) : Array.from({ length: 8 })).map((post, i) => (
                    <Link key={i} href={post ? `/board/${(post as PostWithAuthor).id}` : '/board'} className="grid grid-cols-3 gap-0 px-4 py-2 text-[11px] hover:bg-gray-50 transition-colors">
                      <span className="text-accent font-bold">{post ? ((post as PostWithAuthor).region || '전국') : '전국'}</span>
                      <span className="text-gray-600 truncate flex items-center gap-1">
                        {post ? (post as PostWithAuthor).title : `상품권 매입 업체 등록 ${i + 1}`}
                        <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>
                      </span>
                      <span className="text-right text-gray-500">{post ? ((post as PostWithAuthor).author?.name || '-') : `업체${i + 1}`}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <h3 className="text-[14px] font-bold">오늘의 추천업체</h3>
                  <Link href="/board" className="text-[11px] text-accent hover:underline flex items-center gap-0.5">
                    추천업체 더보기 <ChevronRight size={10} />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="grid grid-cols-3 gap-0 px-4 py-2 text-[11px] text-gray-500 bg-gray-50">
                    <span>지역</span>
                    <span>제목</span>
                    <span className="text-right">업체명</span>
                  </div>
                  {(buyPosts.length > 0 ? buyPosts.slice(0, 8) : Array.from({ length: 8 })).map((post, i) => (
                    <Link key={i} href={post ? `/board/${(post as PostWithAuthor).id}` : '/board'} className="grid grid-cols-3 gap-0 px-4 py-2 text-[11px] hover:bg-gray-50 transition-colors">
                      <span className="text-accent font-bold">{post ? ((post as PostWithAuthor).region || '전국') : '전국'}</span>
                      <span className="text-gray-600 truncate flex items-center gap-1">
                        {post ? (post as PostWithAuthor).title : `추천 업체 ${i + 1}`}
                        <span className="text-[9px] text-white bg-red-500 px-1 rounded-sm shrink-0">N</span>
                      </span>
                      <span className="text-right text-gray-500">{post ? ((post as PostWithAuthor).author?.name || '-') : `업체${i + 1}`}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom sections */}
            <BottomSections notices={notices} />
          </div>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
