import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStripe } from '@/lib/stripe';

const schema = z.object({ acceptedSubscriptionTerms: z.literal(true) });
export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    const expectedOrigin = process.env.NEXT_PUBLIC_APP_URL;
    if (origin && expectedOrigin && new URL(origin).origin !== new URL(expectedOrigin).origin) {
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    }
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Please accept the subscription terms.' }, { status: 400 });
    const price = process.env.STRIPE_MONTHLY_PRICE_ID;
    if (!price) return NextResponse.json({ error: 'Subscription checkout is not configured.' }, { status: 503 });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
    if (!user.email_confirmed_at) return NextResponse.json({ error: 'Verify your email first.' }, { status: 403 });

    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin.from('profiles').select('stripe_customer_id,subscription_status').eq('id', user.id).single();
    if (profileError) throw profileError;
    if (profile.subscription_status === 'active') return NextResponse.json({ error: 'Subscription is already active.' }, { status: 409 });
    const stripe = getStripe();
    const customer = profile.stripe_customer_id
      ? { id: profile.stripe_customer_id }
      : await stripe.customers.create({ email: user.email, metadata: { supabase_user_id: user.id } });
    if (!profile.stripe_customer_id) {
      const { error } = await admin.from('profiles').update({ stripe_customer_id: customer.id }).eq('id', user.id);
      if (error) throw error;
    }
    const base = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', customer: customer.id,
      line_items: [{ price, quantity: 1 }],
      success_url: `${base}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/pricing?checkout=cancelled`,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id },
      subscription_data: { metadata: { supabase_user_id: user.id } },
      allow_promotion_codes: false,
    });
    await admin.from('agreement_acceptances').insert({ user_id: user.id, agreement_key: 'subscription', agreement_version: process.env.SUBSCRIPTION_TERMS_VERSION ?? 'draft', context: 'stripe_checkout' });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('checkout session creation failed', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 });
  }
}
