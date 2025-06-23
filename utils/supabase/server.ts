import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  // const cookieStore = await cookies();
  const cookieStore = cookies(); // ✅ correct

  console.log('[createClient] Getting cookies:', cookieStore.getAll());

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const allCookies = cookieStore.getAll();
          console.log('[Supabase getAll cookies]', allCookies);
          return allCookies;
          // return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            console.log('[Supabase setAll cookies]', cookiesToSet);
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (err) {
            console.warn(
              '[Supabase setAll error] Likely called in Server Component:',
              err
            );
          }
          // catch {
          //   // The `setAll` method was called from a Server Component.
          //   // This can be ignored if you have middleware refreshing
          //   // user sessions.
          // }
        },
      },
    }
  );
}
