import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AuthCallback({ searchParams }: { searchParams: { code?: string; next?: string } }) {
  if (searchParams.code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code);
    if (!error) redirect(searchParams.next?.startsWith('/') ? searchParams.next : '/dashboard');
  }
  redirect('/login?message=verification_failed');
}
