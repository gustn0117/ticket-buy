/**
 * 브랜드 로고 배지 컴포넌트
 *
 * 상품권 브랜드를 시각적으로 구분하는 스타일드 배지.
 * 저작권 문제를 피하기 위해 실제 브랜드 로고 이미지를 사용하지 않고,
 * 각 브랜드의 공식 색상 팔레트로 디자인된 텍스트 배지를 렌더링합니다.
 *
 * (추후 라이선스 받은 실제 로고 SVG가 있으면 여기에 교체 가능)
 */

type BrandStyle = {
  bg: string;          // 배경색
  fg: string;          // 전경(글자)색
  label: string;       // 짧은 라벨 (4~5자 이내)
  subLabel?: string;   // 하단 보조 라벨
  pattern?: 'gradient' | 'solid' | 'stripe';
};

// 각 브랜드의 공식/대표 색상을 참고한 디자인 팔레트
// (브랜드 공식 로고가 아닌, 식별용 스타일드 표시)
export const BRAND_STYLES: Record<string, BrandStyle> = {
  '롯데': {
    bg: 'linear-gradient(135deg, #ED1C24 0%, #C8102E 100%)',
    fg: '#FFFFFF',
    label: '롯데',
    subLabel: 'LOTTE',
    pattern: 'gradient',
  },
  '신세계': {
    bg: 'linear-gradient(135deg, #111 0%, #333 100%)',
    fg: '#FFD700',
    label: '신세계',
    subLabel: 'SHINSEGAE',
    pattern: 'gradient',
  },
  '문화상품권': {
    bg: 'linear-gradient(135deg, #FF6B00 0%, #F59000 100%)',
    fg: '#FFFFFF',
    label: '문화',
    subLabel: '상품권',
    pattern: 'gradient',
  },
  '컬쳐랜드': {
    bg: 'linear-gradient(135deg, #5B2C8B 0%, #9B4D9F 100%)',
    fg: '#FFFFFF',
    label: 'Culture',
    subLabel: 'LAND',
    pattern: 'gradient',
  },
  '스타벅스': {
    bg: '#006241',
    fg: '#FFFFFF',
    label: 'Starbucks',
    pattern: 'solid',
  },
  '온캐시': {
    bg: 'linear-gradient(135deg, #003DA5 0%, #0057D9 100%)',
    fg: '#FFFFFF',
    label: 'OnCash',
    subLabel: '온캐시',
    pattern: 'gradient',
  },
  '구글플레이': {
    bg: '#FFFFFF',
    fg: '#202124',
    label: 'Google Play',
    subLabel: '기프트카드',
    pattern: 'stripe',
  },
  '틴캐시': {
    bg: 'linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)',
    fg: '#FFFFFF',
    label: 'Teen',
    subLabel: 'CASH',
    pattern: 'gradient',
  },
  '배민상품권': {
    bg: 'linear-gradient(135deg, #2AC1BC 0%, #4CB8C4 100%)',
    fg: '#FFFFFF',
    label: '배민',
    subLabel: '상품권',
    pattern: 'gradient',
  },
  '해피머니': {
    bg: 'linear-gradient(135deg, #F7CA00 0%, #FFB300 100%)',
    fg: '#5D3A00',
    label: 'Happy',
    subLabel: 'MONEY',
    pattern: 'gradient',
  },
  '기타': {
    bg: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
    fg: '#FFFFFF',
    label: 'Gift',
    subLabel: 'CARD',
    pattern: 'gradient',
  },
  '전체': {
    bg: '#F3F4F6',
    fg: '#374151',
    label: '전체',
    pattern: 'solid',
  },
};

function normalizeBrandKey(name: string): string {
  if (BRAND_STYLES[name]) return name;
  // 일부 변형 매칭
  if (name.includes('롯데')) return '롯데';
  if (name.includes('신세계')) return '신세계';
  if (name.includes('문화')) return '문화상품권';
  if (name.includes('컬쳐') || name.includes('컬처')) return '컬쳐랜드';
  if (name.toLowerCase().includes('starbucks') || name.includes('스타벅스')) return '스타벅스';
  if (name.toLowerCase().includes('oncash') || name.includes('온캐시')) return '온캐시';
  if (name.toLowerCase().includes('google') || name.includes('구글')) return '구글플레이';
  if (name.toLowerCase().includes('teen') || name.includes('틴캐시')) return '틴캐시';
  if (name.includes('배민')) return '배민상품권';
  if (name.includes('해피머니') || name.toLowerCase().includes('happy')) return '해피머니';
  return '기타';
}

interface BrandLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** 정사각형 브랜드 로고 (카테고리 아이콘 등에 사용) */
export function BrandLogo({ name, size = 'md', className = '' }: BrandLogoProps) {
  const key = normalizeBrandKey(name);
  const style = BRAND_STYLES[key];

  const dimensions = {
    sm: { w: 36, h: 36, mainFz: 10, subFz: 7 },
    md: { w: 48, h: 48, mainFz: 12, subFz: 8 },
    lg: { w: 64, h: 64, mainFz: 14, subFz: 9 },
  }[size];

  const stripePattern = style.pattern === 'stripe'
    ? 'repeating-linear-gradient(45deg, rgba(66,133,244,0.08), rgba(66,133,244,0.08) 4px, rgba(52,168,83,0.08) 4px, rgba(52,168,83,0.08) 8px, rgba(251,188,5,0.08) 8px, rgba(251,188,5,0.08) 12px, rgba(234,67,53,0.08) 12px, rgba(234,67,53,0.08) 16px)'
    : undefined;

  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-md shadow-sm overflow-hidden ${className}`}
      style={{
        width: dimensions.w,
        height: dimensions.h,
        background: style.bg,
        color: style.fg,
        backgroundImage: stripePattern,
        border: key === '전체' || key === '구글플레이' ? '1px solid rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <span
        style={{
          fontSize: dimensions.mainFz,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          padding: '0 2px',
        }}
      >
        {style.label}
      </span>
      {style.subLabel && (
        <span
          style={{
            fontSize: dimensions.subFz,
            fontWeight: 600,
            opacity: 0.85,
            letterSpacing: '0.05em',
            marginTop: 1,
          }}
        >
          {style.subLabel}
        </span>
      )}
    </div>
  );
}

/** 가로로 긴 브랜드 배지 (라벨/리스트 뱃지용) */
export function BrandBadge({ name, className = '' }: { name: string; className?: string }) {
  const key = normalizeBrandKey(name);
  const style = BRAND_STYLES[key];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm font-bold text-[10px] ${className}`}
      style={{
        background: style.bg,
        color: style.fg,
      }}
    >
      {style.label}
      {style.subLabel && <span className="opacity-75 text-[9px]">{style.subLabel}</span>}
    </span>
  );
}

export { normalizeBrandKey };
