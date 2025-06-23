import { getChatAccessWithUser } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Chat from './Chat';
import { getConversations } from './actions/conversations';
import { getMessages } from './actions/messages';
import { type Message } from '@/utils/types';
import { CookieConsentBanner } from '@/components/cookieConsentBanner';

export default async function Home() {
  console.log('START Home page rendering');

  const supabase = await createClient();
  console.log('Created Supabase client');

  // Get user session on server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log('Fetched user from Supabase:', { user, error });

  if (!user || error) {
    console.log('No user or error, redirecting to /auth');
    redirect('/auth');
  }

  // Get initial subscription state
  const isDevMode = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'false';
  console.log('isDevMode', isDevMode);
  
  const realChatAccess = isDevMode
    ? { isSubscribed: true, freeMessages: 100 } // arbitrary values for dev mode
    : await getChatAccessWithUser(user.id);
  console.log('Fetched chat access:', realChatAccess);

  const chatAccess = {
    isSubscribed: realChatAccess.isSubscribed,
    freeMessages: realChatAccess.freeMessages,
    canChat: realChatAccess.isSubscribed || realChatAccess.freeMessages > 0,
  };
  console.log('chatAccess:', chatAccess);

  // Get initial conversations
  const conversations = await getConversations();
  console.log('Fetched conversations:', conversations);

  // Get messages for the first conversation if it exists
  let initialMessages: Message[] = [];
  let initialConversationId: string | undefined = undefined;
  if (conversations.length > 0) {
    initialConversationId = conversations[0].conversationId;
    initialMessages = await getMessages(initialConversationId!);
  }
  console.log('Fetched initial messages:', initialMessages);

  return (
    <>
      <CookieConsentBanner />
      <Chat
        initialUserId={user.id}
        initialEmail={user.email}
        initialConversations={conversations}
        initialMessages={initialMessages}
        initialConversationId={initialConversationId}
        initialChatAccess={chatAccess}
      />
    </>
  );
}
