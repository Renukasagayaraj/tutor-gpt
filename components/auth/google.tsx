import { createClient } from '@/utils/supabase/client';
import { FcGoogle } from 'react-icons/fc';

type GoogleSignInProps = {
  text: string;
};

export default function GoogleSignIn({ text }: GoogleSignInProps) {
  const supabase = createClient();
  console.log('Created Supabase client');
  const handleGoogleSignIn = async () => {
    console.log('Starting Google sign-in');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log('Finished Google sign-in');
    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  console.log('Created Google sign-in handler');
  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full border border-[#174fa3] text-[#174fa3] bg-white py-2 rounded mb-2 text-base font-medium hover:bg-[#f0f6fb] transition flex items-center justify-center"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Continue with Google
    </button>
  );
}
