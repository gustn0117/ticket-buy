import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { Ad } from '@/lib/ads';

const DATA_FILE = path.join(process.cwd(), 'data', 'ads.json');

function readAds(): Ad[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeAds(ads: Ad[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(ads, null, 2));
}

// GET: 광고 목록 (slot 필터 가능)
export async function GET(req: NextRequest) {
  const slot = req.nextUrl.searchParams.get('slot');
  const activeOnly = req.nextUrl.searchParams.get('active') === 'true';
  let ads = readAds();

  if (slot) ads = ads.filter(a => a.slot === slot);
  if (activeOnly) {
    const now = new Date().toISOString();
    ads = ads.filter(a => a.is_active && a.start_date <= now && a.end_date >= now);
  }

  ads.sort((a, b) => b.priority - a.priority);
  return NextResponse.json(ads);
}

// POST: 광고 등록
export async function POST(req: NextRequest) {
  const body = await req.json();
  const ads = readAds();
  const newAd: Ad = {
    id: crypto.randomUUID(),
    slot: body.slot,
    title: body.title || '',
    description: body.description || '',
    image_url: body.image_url || '',
    link_url: body.link_url || '',
    advertiser: body.advertiser || '',
    is_active: body.is_active ?? true,
    start_date: body.start_date || new Date().toISOString(),
    end_date: body.end_date || new Date(Date.now() + 30 * 86400000).toISOString(),
    priority: body.priority ?? 0,
    created_at: new Date().toISOString(),
  };
  ads.push(newAd);
  writeAds(ads);
  return NextResponse.json(newAd, { status: 201 });
}

// PUT: 광고 수정
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const ads = readAds();
  const idx = ads.findIndex(a => a.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  ads[idx] = { ...ads[idx], ...body };
  writeAds(ads);
  return NextResponse.json(ads[idx]);
}

// DELETE: 광고 삭제
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  let ads = readAds();
  ads = ads.filter(a => a.id !== id);
  writeAds(ads);
  return NextResponse.json({ ok: true });
}
