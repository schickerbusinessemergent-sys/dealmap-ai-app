export const appName = 'DealMap';

export const sampleDeals = [
  {
    id: 1,
    title: 'Downtown Burger Flash Deal',
    category: 'Food',
    description: '50% off gourmet burgers for the next 3 hours.',
    price: 12,
    originalPrice: 24,
    location: 'Auckland CBD',
    lat: -36.8485,
    lng: 174.7633,
    hot: true,
    status: 'active',
    discount: 50,
    expiry: '3 hours',
  },
  {
    id: 2,
    title: 'Creative Studio Sprint',
    category: 'Services',
    description: 'Brand identity sprint bundle for startups.',
    price: 180,
    originalPrice: 340,
    location: 'Wellington',
    lat: -41.2865,
    lng: 174.7762,
    hot: true,
    status: 'active',
    discount: 47,
    expiry: '12 hours',
  },
  {
    id: 3,
    title: 'Game Dev Bootcamp',
    category: 'Education',
    description: 'Weekend game development bootcamp from concept to prototype.',
    price: 150,
    originalPrice: 250,
    location: 'Christchurch',
    lat: -43.5321,
    lng: 172.6306,
    hot: false,
    status: 'active',
    discount: 40,
    expiry: '1 day',
  },
  {
    id: 4,
    title: 'Fitness Membership Weekend Pass',
    category: 'Health',
    description: 'Unlimited access to classes and recovery lounge.',
    price: 25,
    originalPrice: 60,
    location: 'Hamilton',
    lat: -37.787,
    lng: 175.279,
    hot: false,
    status: 'expired',
    discount: 58,
    expiry: 'ended',
  },
];

export function buildAiIdea(prompt: string) {
  const cleanPrompt = prompt.trim();
  const keyword = cleanPrompt.split(' ').slice(0, 3).join(' ') || 'startup';

  return {
    title: `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)} Growth Engine`,
    tag: 'AI Generated Business Idea',
    summary: `A bold idea for ${cleanPrompt || 'a new digital product'} that combines viral sharing, micro-offers, and community-based discovery. The product should reward users for inviting others, posting local deals, and participating in challenges.`,
    features: [
      'Map-based discovery and trending local offers',
      'User-generated deal pins with location and category filters',
      'Invite rewards and referral-based activation loops',
      'AI-powered concept suggestions, pricing, and naming ideas',
      'Stripe-ready subscription and deployment fee management',
    ],
    monetization: [
      'NZD $20/month app access',
      'AI credits and paid expansion packs',
      'Seller subscriptions and premium listing upgrades',
      'Small commission or deployment fee model after review',
    ],
  };
}
