import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'visitors.json');

interface VisitorData {
  daily: Record<string, number>; // "2026-04-08": 42
  total: number;
}

function readData(): VisitorData {
  try {
    if (!fs.existsSync(DATA_FILE)) return { daily: {}, total: 0 };
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return { daily: {}, total: 0 };
  }
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
  const data = readData();

  // 같은 IP의 일일 중복 방지를 위한 간단 처리
  const ipKey = `_ips_${today}`;
  const ips: string[] = (data as unknown as Record<string, unknown>)[ipKey] as string[] || [];
  if (!ips.includes(ip)) {
    ips.push(ip);
    (data as unknown as Record<string, unknown>)[ipKey] = ips;
    data.daily[today] = (data.daily[today] || 0) + 1;
    data.total = (data.total || 0) + 1;
    writeData(data);
  }

  return NextResponse.json({ ok: true });
}

// GET: 방문자 통계 조회
export async function GET() {
  const data = readData();
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = data.daily[today] || 0;

  // 최근 30일 데이터
  const last30: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    last30.push({ date: d, count: data.daily[d] || 0 });
  }

  return NextResponse.json({
    total: data.total,
    today: todayCount,
    last30,
  });
}
