import { NextRequest, NextResponse } from 'next/server';
import { supabase, type Payment } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payment;

    if (supabase) {
      const { error } = await supabase.from('payments').insert([body]);
      if (error) console.error('[payments] Supabase error:', error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[payments] Unexpected error:', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ payments: [], configured: false });
  }
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ payments: [], error: error.message });
  return NextResponse.json({ payments: data ?? [], configured: true });
}
