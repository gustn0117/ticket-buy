import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// POST /api/community/comments
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { post_id, author_id, author_name, content } = body;

  if (!post_id || !content?.trim()) {
    return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 400 });
  }
  if (content.length > 1000) {
    return NextResponse.json({ error: '댓글은 1000자 이내로 입력해주세요.' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('community_comments')
    .insert({
      post_id,
      author_id: author_id || null,
      author_name: author_name || '익명',
      content: content.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data }, { status: 201 });
}

// DELETE /api/community/comments?id=xxx
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id가 필요합니다.' }, { status: 400 });

  const supabase = createServiceClient();
  const { error } = await supabase.from('community_comments').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
