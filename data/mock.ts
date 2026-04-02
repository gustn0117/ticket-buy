// 상품권 카테고리
export const categories = [
  { id: 'all', name: '전체', icon: '🎫' },
  { id: 'lotte', name: '롯데', icon: '🔴' },
  { id: 'shinsegae', name: '신세계', icon: '⭐' },
  { id: 'culture', name: '문화상품권', icon: '🎭' },
  { id: 'cultureland', name: '컬쳐랜드', icon: '🎪' },
  { id: 'starbucks', name: '스타벅스', icon: '☕' },
  { id: 'oncash', name: '온캐시', icon: '💚' },
  { id: 'googleplay', name: '구글플레이', icon: '▶️' },
  { id: 'teencash', name: '틴캐시', icon: '🎮' },
  { id: 'baemin', name: '배민상품권', icon: '🛵' },
  { id: 'happymoney', name: '해피머니', icon: '😊' },
  { id: 'etc', name: '기타', icon: '⊞' },
];

// 프리미엄 구매 업체
export const premiumBuyers = [
  {
    id: 1,
    name: '하나티켓',
    description: '신세계 / 롯데 / 해피머니 등 각종 상품권 매입합니다 🔥 사장이 직접 친절하게 답변드려요 👍',
    brands: ['신세계', '롯데'],
    phone: '010-5613-68**',
    region: '서울특별시 강남구 역삼동',
    isPremium: true,
    bgImage: '/images/premium-bg-1.jpg',
  },
  {
    id: 2,
    name: '시그널티켓',
    description: '안녕하세요 😊 시그널티켓입니다. 신세계 / 롯데 상품권 매입하고 있습니다.',
    brands: ['롯데', '신세계'],
    phone: '010-5537-22**',
    region: '경기 성남시',
    isPremium: true,
    bgImage: '/images/premium-bg-2.jpg',
  },
  {
    id: 3,
    name: '불꽃티켓',
    description: '신세계 / 롯데 / 문화상품권 등 모든 상품권 매입합니다 🔥 라인 아이디 ★ firetkt888',
    brands: ['신세계', '롯데'],
    phone: '010-5329-55**',
    region: '대구광역시',
    isPremium: true,
    bgImage: '/images/premium-bg-3.jpg',
  },
  {
    id: 4,
    name: '마포상품권',
    description: '✅ 정식 등록 업체🔥 상품권 매입 안내 안녕하세요! 상품권을 정중하게 매입하고 있습니다.',
    brands: ['롯데', '신세계'],
    phone: '010-5929-55**',
    region: '서울 마포구',
    isPremium: true,
    bgImage: '/images/premium-bg-4.jpg',
  },
  {
    id: 5,
    name: '온티켓',
    description: '안녕하세요 👋 온티켓입니다. 선물 받으시고 사용하지 않은 상품권 매입합니다!',
    brands: ['신세계', '문화상품권'],
    phone: '010-3447-72**',
    region: '서울 강서구',
    isPremium: true,
    bgImage: '/images/premium-bg-5.jpg',
  },
  {
    id: 6,
    name: '행운상품권',
    description: '"행운" 을 드리는 "행운" 상품권 구매합니다 🍀 라인아이디:good9949',
    brands: ['신세계'],
    phone: '010-8131-99**',
    region: '부산광역시',
    isPremium: true,
    bgImage: '/images/premium-bg-6.jpg',
  },
];

// 판매글 목록
export const sellPosts = [
  {
    id: 1,
    category: 'shinsegae',
    categoryName: '신세계',
    title: '신세계 10만원권 판매',
    faceValue: 100000,
    price: 70000,
    discount: 30,
    tags: ['7일 이내 발송', '#모바일'],
    isNew: true,
    author: '김철수',
    authorId: 'user1',
    createdAt: '2026.03.19 18:20',
    views: 0,
    delivery: '판매일로부터 7일 이내 발송',
  },
  {
    id: 2,
    category: 'lotte',
    categoryName: '롯데',
    title: '롯데 7만원권 판매',
    faceValue: 70000,
    price: 50000,
    discount: 29,
    tags: ['7일 이내 발송', '#전국'],
    isNew: true,
    author: '김철수',
    authorId: 'user1',
    createdAt: '2026.03.19 17:50',
    views: 3,
    delivery: '판매일로부터 7일 이내 발송',
  },
  {
    id: 3,
    category: 'lotte',
    categoryName: '롯데',
    title: '롯데 5.5만원권 판매',
    faceValue: 55000,
    price: 50000,
    discount: 9,
    tags: ['7일 이내 발송', '#전국', '#택배 가능'],
    isNew: false,
    author: '박영희',
    authorId: 'user2',
    createdAt: '2026.03.18 14:30',
    views: 12,
    delivery: '택배 발송',
  },
  {
    id: 4,
    category: 'lotte',
    categoryName: '롯데',
    title: '롯데 5.5만원권 판매',
    faceValue: 55000,
    price: 50000,
    discount: 9,
    tags: ['5일 이내 발송', '#전국'],
    isNew: true,
    author: '이지현',
    authorId: 'user3',
    createdAt: '2026.03.18 10:20',
    views: 8,
    delivery: '5일 이내 발송',
  },
  {
    id: 5,
    category: 'shinsegae',
    categoryName: '신세계',
    title: '신세계 11만원권 판매',
    faceValue: 110000,
    price: 105000,
    discount: 5,
    tags: ['14일 이내 발송', '#서울', '#경기'],
    isNew: false,
    author: '최민수',
    authorId: 'user4',
    createdAt: '2026.03.17 09:00',
    views: 25,
    delivery: '14일 이내 발송',
  },
  {
    id: 6,
    category: 'lotte',
    categoryName: '롯데',
    title: '롯데 5.5만원권 판매',
    faceValue: 55000,
    price: 50000,
    discount: 9,
    tags: ['14일 이내 발송', '#서울', '#경기'],
    isNew: false,
    author: '정수진',
    authorId: 'user5',
    createdAt: '2026.03.16 15:40',
    views: 18,
    delivery: '14일 이내 발송',
  },
];

// 구매글 목록
export const buyPosts = [
  {
    id: 101,
    category: 'shinsegae',
    categoryName: '신세계',
    title: '신세계 상품권 삽니다',
    faceValue: 100000,
    price: 85000,
    discount: 15,
    tags: ['즉시 거래', '#전국'],
    isNew: true,
    author: '하나티켓',
    authorId: 'biz1',
    createdAt: '2026.03.20 09:00',
    views: 42,
    isBusiness: true,
  },
  {
    id: 102,
    category: 'lotte',
    categoryName: '롯데',
    title: '롯데 상품권 매입합니다',
    faceValue: 50000,
    price: 43000,
    discount: 14,
    tags: ['즉시 거래', '#전국'],
    isNew: true,
    author: '시그널티켓',
    authorId: 'biz2',
    createdAt: '2026.03.20 08:30',
    views: 38,
    isBusiness: true,
  },
  {
    id: 103,
    category: 'culture',
    categoryName: '문화상품권',
    title: '문화상품권 5만원권 삽니다',
    faceValue: 50000,
    price: 45000,
    discount: 10,
    tags: ['즉시 거래'],
    isNew: false,
    author: '온티켓',
    authorId: 'biz5',
    createdAt: '2026.03.19 16:00',
    views: 20,
    isBusiness: true,
  },
];

// 공지사항
export const notices = [
  {
    id: 1,
    title: '🤝 티켓바이와 함께할 공식 제휴 업체(광고주)를 모집합니다!',
    date: '2026.03.31 18:28',
  },
  {
    id: 2,
    title: '[필독] 🚨 3자 사기 및 보이스피싱 예방을 위한 안전 거래 수칙',
    date: '2026.03.31 18:26',
  },
  {
    id: 3,
    title: '쉽고 빠른 상품권 거래의 시작, \'티켓바이\' 정식 오픈 안내 🎉',
    date: '2026.03.31 18:23',
  },
  {
    id: 4,
    title: '광고 문의 및 모집',
    date: '2026.03.27 14:18',
  },
  {
    id: 5,
    title: '프리미엄 업체(구매) 모집',
    date: '2026.03.25 10:00',
  },
];

// 채팅 목록
export const chatList = [
  {
    id: 1,
    partner: '김철수',
    partnerType: '판매',
    title: '신세계 10만원권 판매',
    status: '거래중',
    step: 2,
    stepName: '기본정보',
    lastMessage: '네 맞습니다',
    lastMessageTime: '2026.03.19 18:28',
    tradeCompleted: 0,
    tradeOngoing: 1,
    tradeDelayed: 0,
    unread: 2,
  },
  {
    id: 2,
    partner: '박영희',
    partnerType: '판매',
    title: '롯데 5.5만원권 판매',
    status: '견적대기',
    step: 1,
    stepName: '견적',
    lastMessage: '안녕하세요 저 제목으로 판매하시는건가요?',
    lastMessageTime: '2026.03.18 15:20',
    tradeCompleted: 0,
    tradeOngoing: 1,
    tradeDelayed: 0,
    unread: 0,
  },
  {
    id: 3,
    partner: '최민수',
    partnerType: '판매',
    title: '신세계 11만원권 판매',
    status: '거래완료',
    step: 6,
    stepName: '완료',
    lastMessage: '감사합니다. 좋은 거래였습니다.',
    lastMessageTime: '2026.03.17 11:00',
    tradeCompleted: 1,
    tradeOngoing: 0,
    tradeDelayed: 0,
    unread: 0,
  },
];

// 채팅 메시지
export const chatMessages: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, sender: 'system', type: 'notice', content: '본 플랫폼은 중개 서비스만을 제공하며, 거래 당사자 간 발생하는 법적 분쟁에 대해 책임을 지지 않습니다. 거래 대금의 지급 및 상품권 전달은 판매자와 구매자 간 직접 이루어지며, 사기 피해 시 경찰 사이버수사대(182)에 신고하시기 바랍니다.', time: '2026.03.19 18:20' },
    { id: 2, sender: 'user1', type: 'message', content: '안녕하세요 저 제목으로 판매하시는건가요?', time: '2026.03.19 18:20' },
    { id: 3, sender: 'me', type: 'message', content: '네 맞습니다', time: '2026.03.19 18:28' },
    { id: 4, sender: 'me', type: 'message', content: '잠시만요 다시한번 확인하겠습니다', time: '2026.03.19 18:30' },
    { id: 5, sender: 'system', type: 'product', content: '신세계 10만원권 판매', price: 70000, originalPrice: 100000, discount: 30, time: '2026.03.19 18:20' },
  ],
};

// 거래 프로세스 단계
export const tradeSteps = [
  { step: 1, name: '견적', label: '견적' },
  { step: 2, name: '기본정보', label: '기본정보' },
  { step: 3, name: '계약서', label: '계약서' },
  { step: 4, name: '입금', label: '입금' },
  { step: 5, name: '배송', label: '배송' },
  { step: 6, name: '완료', label: '완료' },
];

// 대시보드 스케줄 데이터
export const scheduleData = [
  {
    date: '2026.03.25',
    dDay: 'D-6',
    partner: '김철수',
    product: '롯데 7만원권 판매',
    amount: 50000,
    status: '진행중',
  },
  {
    date: '2026.03.25',
    dDay: 'D-6',
    partner: '김철수',
    product: '롯데 7만원권 판매',
    amount: 50000,
    status: '진행중',
  },
  {
    date: '2026.03.25',
    dDay: 'D-6',
    partner: '김철수',
    product: '롯데 7만원권 판매',
    amount: 50000,
    status: '진행중',
  },
];

// 유저 데이터
export const users = {
  user1: {
    id: 'user1',
    name: '김철수',
    type: '일반 회원',
    joinDate: '2026년 3월 19일',
    tradeCompleted: 0,
    tradeOngoing: 1,
    tradeDelayed: 0,
  },
  biz1: {
    id: 'biz1',
    name: '하나티켓',
    type: '프리미엄 업체',
    joinDate: '2026년 3월 1일',
    tradeCompleted: 45,
    tradeOngoing: 3,
    tradeDelayed: 0,
    businessNumber: '123-45-67890',
    representative: '홍길동',
    phone: '010-5613-6800',
  },
};

// Types
export interface ChatMessage {
  id: number;
  sender: string;
  type: 'message' | 'notice' | 'product' | 'system-action' | 'quote' | 'info-request' | 'contract' | 'payment' | 'delivery' | 'complete';
  content: string;
  time: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  data?: Record<string, unknown>;
}

export interface Post {
  id: number;
  category: string;
  categoryName: string;
  title: string;
  faceValue: number;
  price: number;
  discount: number;
  tags: string[];
  isNew: boolean;
  author: string;
  authorId: string;
  createdAt: string;
  views: number;
  delivery?: string;
  isBusiness?: boolean;
}
