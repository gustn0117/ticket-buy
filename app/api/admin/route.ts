import { NextRequest, NextResponse } from 'next/server';

// 관리자 비밀번호는 환경변수에서 읽기 (클라이언트 노출 방지)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ticketbuy_admin_2026!';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: '비밀번호가 틀렸습니다.' }, { status: 401 });
}
