import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

// 시간이 지나야 카운트가 바뀌는 캐시 문제 차단
// Next.js / Cloudflare / 브라우저 모든 레이어에서 캐시되지 않도록 강제
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
};

function jsonNoStore(body: unknown, init?: { status?: number }) {
  return NextResponse.json(body, { status: init?.status, headers: NO_CACHE_HEADERS });
}

const DATA_FILE = path.join(process.cwd(), 'data', 'visitors.json');

// ─── JSON 파일 폴백 ───
interface VisitorData { daily: Record<string, number>; total: number; }

function readData(): VisitorData {
  try {
    if (!fs.existsSync(DATA_FILE)) return { daily: {}, total: 0 };
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch { return { daily: {}, total: 0 }; }
}
function writeData(data: VisitorData) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST: 방문 기록
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const today = new Date().toISOString().slice(0, 10);

  // Supabase 시도
  try {
    const supabase = createServiceClient();
    // visitors 테이블에 upsert 시도
    const { error } = await supabase.from('visitors').upsert(
      { date: today, ip, visited_at: new Date().toISOString() },
      { onConflict: 'date,ip' }
    );
    if (!error) return jsonNoStore({ ok: true });
  } catch {
    // 테이블 없으면 폴백
  }

  // JSON 파일 폴백
  const data = readData();
  const ipKey = `_ips_${today}`;
  const ips: string[] = (data as unknown as Record<string, unknown>)[ipKey] as string[] || [];
  if (!ips.includes(ip)) {
    ips.push(ip);
    (data as unknown as Record<string, unknown>)[ipKey] = ips;
    data.daily[today] = (data.daily[today] || 0) + 1;
    data.total = (data.total || 0) + 1;
    writeData(data);
  }
  return jsonNoStore({ ok: true });
}

// 방문자 수 인플레이션 (마케팅 표시용 베이스라인)
// 실제 방문자에 더해 자연스럽게 큰 숫자가 노출되도록 시간 가중치를 더한다.
const LAUNCH_DATE = new Date('2026-03-15T00:00:00+09:00').getTime();
const BASE_TODAY = 380;
const BASE_TOTAL = 95000;
const TODAY_PER_HOUR = 55;
const TOTAL_PER_DAY = 320;

function inflateToday(real: number): number {
  const now = new Date();
  const hourOfDay = now.getHours() + now.getMinutes() / 60;
  const minute = now.getMinutes();
  const jitter = (minute % 7) * 4; // 0~24 사이 변동
  return Math.round(BASE_TODAY + hourOfDay * TODAY_PER_HOUR + jitter + real);
}

function inflateTotal(real: number): number {
  const daysSinceLaunch = Math.max(0, Math.floor((Date.now() - LAUNCH_DATE) / 86400000));
  // 분 단위로도 누적이 미세하게 증가
  const intraDay = Math.floor(((Date.now() - LAUNCH_DATE) % 86400000) / 60000) * 0.2;
  return Math.round(BASE_TOTAL + daysSinceLaunch * TOTAL_PER_DAY + intraDay + real);
}

async function fetchSellCount(): Promise<number> {
  try {
    const supabase = createServiceClient();
    const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'sell');
    return count || 0;
  } catch {
    return 0;
  }
}

// GET: 방문자 통계 조회
export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const sellCount = await fetchSellCount();

  // Supabase 시도 - 테이블이 있는 경우만 빠르게 처리
  try {
    const supabase = createServiceClient();
    // 1) 첫 쿼리로 테이블 존재 확인 — 실패하면 즉시 폴백 (30번의 실패한 호출 방지)
    const totalRes = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true });
    if (totalRes.error || totalRes.count === null) {
      throw new Error('visitors-table-missing');
    }

    // 2) 30일 데이터를 단일 호출로: created_at 또는 date 컬럼 모두 fetch 후 클라에서 group
    const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const [todayRes, daysRes] = await Promise.all([
      supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })
        .eq('date', today),
      supabase
        .from('visitors')
        .select('date')
        .gte('date', since),
    ]);

    const dailyMap: Record<string, number> = {};
    (daysRes.data || []).forEach((row: { date: string }) => {
      dailyMap[row.date] = (dailyMap[row.date] || 0) + 1;
    });
    const last30: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      last30.push({ date: d, count: dailyMap[d] || 0 });
    }

    return jsonNoStore({
      total: inflateTotal(totalRes.count),
      today: inflateToday(todayRes.count || 0),
      sellCount,
      last30,
    });
  } catch {
    // 테이블 없음 → JSON 폴백
  }

  // JSON 파일 폴백
  const data = readData();
  const todayCount = data.daily[today] || 0;
  const last30: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    last30.push({ date: d, count: data.daily[d] || 0 });
  }
  // 인플레이션 항상 적용 (관리자 수동 override는 더 이상 노출 값에 반영 안함 — 마케팅 표시 일관성)
  return jsonNoStore({
    total: inflateTotal(data.total || 0),
    today: inflateToday(todayCount),
    trades: 0,
    sellCount,
    last30,
  });
}

// PUT: 수치 수동 설정 (관리자용)
export async function PUT(req: NextRequest) {
  const { today, total, trades } = await req.json();
  const data = readData();
  const override = { today, total, trades };
  (data as unknown as Record<string, unknown>)._override = override;
  writeData(data);
  return jsonNoStore({ ok: true, override });
}
