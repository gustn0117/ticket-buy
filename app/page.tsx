'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroBanner from '@/components/home/HeroBanner';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import MainCompaniesSection from '@/components/home/MainCompaniesSection';
import BuyerFinder from '@/components/home/BuyerFinder';
import RealtimeSellPosts from '@/components/home/RealtimeSellPosts';
import SiteMenu from '@/components/home/SiteMenu';
import { getPosts, getPremiumBuyers } from '@/lib/api';
import type { DBPost, DBUser, DBPremiumBuyer } from '@/lib/types';
import { getCache, setCache } from '@/lib/cache';

type PostWithAuthor = DBPost & { author: DBUser };

export default function Home() {
  // 캐시가 있으면 즉시 초기화 (첫 렌더부터 데이터 표시)
  const [sellPosts, setSellPosts] = useState<PostWithAuthor[]>(() => getCache<PostWithAuthor[]>('home_sell') ?? []);
  const [buyers, setBuyers] = useState<DBPremiumBuyer[]>(() => getCache<DBPremiumBuyer[]>('home_buyers') ?? []);
  const [loading, setLoading] = useState(() => !getCache('home_sell'));

  useEffect(() => {
    Promise.allSettled([
      getPosts('sell', { limit: 30 }),
      getPremiumBuyers(),
    ]).then(([s, pb]) => {
      if (s.status === 'fulfilled') { setSellPosts(s.value); setCache('home_sell', s.value, 60000); }
      if (pb.status === 'fulfilled') { setBuyers(pb.value); setCache('home_buyers', pb.value, 120000); }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <HeroBanner />

      <div className="container-main py-6">
        <div className="flex gap-4">
          <LeftSidebar />

          <div className="flex-1 min-w-0">
            {/* 지역으로 / 상품으로 업체찾기 */}
            <BuyerFinder />

            {/* 매입업체 + 실시간 판매문의 (좌우 2단) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mb-6 items-start">
              <MainCompaniesSection buyers={buyers} loading={loading} compact maxCount={12} />
              <RealtimeSellPosts posts={sellPosts} loading={loading} sidebar />
            </div>

            {/* 사이트 메뉴 (공지/TIP 카드 대체) */}
            <SiteMenu />
          </div>

          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
