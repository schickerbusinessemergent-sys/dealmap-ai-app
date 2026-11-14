import { describe, it, expect } from 'vitest';
function isVerified(user: { email_confirmed_at?: string | null } | null) { return Boolean(user?.email_confirmed_at); }
describe('verification authorization rules', () => {
  it('rejects missing user', () => expect(isVerified(null)).toBe(false));
  it('rejects unverified email', () => expect(isVerified({ email_confirmed_at: null })).toBe(false));
  it('accepts verified email', () => expect(isVerified({ email_confirmed_at: '2026-01-01' })).toBe(true));
});
