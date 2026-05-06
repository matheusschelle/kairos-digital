import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { title, price, offerId, isRecurring } = await req.json() as {
      title: string;
      price: number;
      offerId: string;
      isRecurring?: boolean;
    };

    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: offerId,
          title,
          quantity: 1,
          unit_price: price,
          currency_id: 'BRL',
        },
      ],
      payment_methods: {
        installments: isRecurring ? 1 : 12,
        default_installments: 1,
      },
      back_urls: {
        success: 'https://kairos-digital-pi.vercel.app/?pagamento=aprovado',
        failure: 'https://kairos-digital-pi.vercel.app/?pagamento=recusado',
        pending: 'https://kairos-digital-pi.vercel.app/?pagamento=pendente',
      },
      auto_return: 'approved' as const,
      statement_descriptor: 'KAIROS DIGITAL',
      external_reference: offerId,
    };

    const result = await preference.create({ body });
    return NextResponse.json({ init_point: result.init_point });
  } catch (err) {
    console.error('[MP] create-preference error:', err);
    return NextResponse.json(
      { error: 'Erro ao criar preferência de pagamento.' },
      { status: 500 },
    );
  }
}
