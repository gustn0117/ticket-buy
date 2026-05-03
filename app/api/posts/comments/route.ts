import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// GET /api/posts/comments?post_id=xxx
export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('post_id');
  if (!postId) return NextResponse.json({ error: 'post_id가 필요합니다.' }, { status: 400 });

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('post_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data || [] });
}

// POST /api/posts/comments
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { post_id, author_id, author_name, author_phone, bid_price, content } = body;

  if (!post_id) return NextResponse.json({ error: 'post_id가 필요합니다.' }, { status: 400 });
  if (!author_name || typeof author_name !== 'string' || !author_name.trim()) {
    return NextResponse.json({ error: '업체명/이름을 입력해주세요.' }, { status: 400 });
  }
  if (!author_phone || typeof author_phone !== 'string' || !author_phone.trim()) {
    return NextResponse.json({ error: '연락처를 입력해주세요.' }, { status: 400 });
  }
  if (!content || typeof content !== 'string' || !content.trim()) {
    return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 400 });
  }
  if (author_name.length > 50 || author_phone.length > 20 || content.length > 1000) {
    return NextResponse.json({ error: '입력값이 너무 깁니다.' }, { status: 400 });
  }

  const cleanBid =
    typeof bid_price === 'number' && bid_price > 0 && bid_price < 100000000
      ? Math.floor(bid_price)
      : null;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('post_comments')
    .insert({
      post_id,
      author_id: typeof author_id === 'string' && author_id ? author_id : null,
      author_name: author_name.trim(),
      author_phone: author_phone.trim(),
      bid_price: cleanBid,
      content: content.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data }, { status: 201 });
}

// DELETE /api/posts/comments?id=xxx
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id가 필요합니다.' }, { status: 400 });
  const supabase = createServiceClient();
  const { error } = await supabase.from('post_comments').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
