import { ShieldAlert, Building2, ShieldCheck, type LucideIcon } from 'lucide-react';

export interface TrustLink {
  label: string;
  desc: string;
  href: string;
  Icon: LucideIcon;
}

/**
 * 사기 예방 / 사업자 검증을 위한 외부 신뢰기관 바로가기.
 * PC 히어로 우측, 모바일 전체메뉴 하단 두 곳에서 동일하게 사용.
 */
export const TRUST_LINKS: TrustLink[] = [
  {
    label: '더치트',
    desc: '사기 계좌·번호 조회',
    href: 'https://thecheat.co.kr/',
    Icon: ShieldAlert,
  },
  {
    label: '사업자 조회',
    desc: '국세청 홈택스',
    href: 'https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml',
    Icon: Building2,
  },
  {
    label: '사이버수사대',
    desc: '경찰청 사이버범죄 신고',
    href: 'https://ecrm.police.go.kr/minwon/main',
    Icon: ShieldCheck,
  },
];
