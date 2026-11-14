import Stripe from 'stripe';

let stripe: Stripe | undefined;
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe is not configured.');
  stripe ??= new Stripe(key, { appInfo: { name: 'DealMap', version: '0.2.0' } });
  return stripe;
}
