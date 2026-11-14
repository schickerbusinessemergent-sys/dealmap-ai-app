import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function requireVerifiedUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/login');
  if (!user.email_confirmed_at) redirect('/verify-email');
  return { supabase, user };
}
