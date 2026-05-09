import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const NO_CACHE = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  Pragma: 'no-cache',
};

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('ad_pricing')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) return NextResponse.json([], { headers: NO_CACHE });
  return NextResponse.json(data || [], { headers: NO_CACHE });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const supabase = createServiceClient();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id 필요' }, { status: 400 });
  const { data, error } = await supabase
    .from('ad_pricing')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { headers: NO_CACHE });
}
