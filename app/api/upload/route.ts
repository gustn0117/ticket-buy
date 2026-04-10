import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });

    // 확장자 체크
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: '허용되지 않는 파일 형식입니다. (jpg, png, gif, webp, svg)' }, { status: 400 });
    }

    // 5MB 제한
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기가 5MB를 초과합니다.' }, { status: 400 });
    }

    // 저장
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, filename });
  } catch {
    return NextResponse.json({ error: '업로드에 실패했습니다.' }, { status: 500 });
  }
}
