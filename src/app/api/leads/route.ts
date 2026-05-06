import { NextRequest, NextResponse } from 'next/server';
import { supabase, type Lead } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Lead;

    if (supabase) {
      const { error } = await supabase.from('leads').insert([body]);
      if (error) console.error('[leads] Supabase error:', error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[leads] Unexpected error:', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ leads: [], configured: false });
  }
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ leads: [], error: error.message });
  return NextResponse.json({ leads: data ?? [], configured: true });
}
