// 'use client';

// import { useEffect } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';

// import { SidebarTrigger } from '@/shadcn/sidebar';
// import { useConversation } from '@/context/ConversationContext';
// import { Button } from '@/shadcn//button';
// import { LoadingIndicator } from '@/components/LoadingIndicator';
// import { AppLayout } from '@/layouts/AppLayout';

// import AIChat from '../components';

// function ConversationDetailComponent() {
//   const params = useParams();
//   const router = useRouter();
//   const { conversations, setCurrentConversationId } = useConversation();
//   const conversationId = params.id as string;

//   console.log({ conversationId, conversations });

//   useEffect(() => {
//     setCurrentConversationId(conversationId);

//     // localStorage.setItem('chatSessionId', conversationId);
//   }, [conversationId, setCurrentConversationId]);

//   const conversation = conversations.find((c) => c.id === conversationId);

//   useEffect(() => {
//     if (!conversation) {
//     //   router.push('/');
//     }
//   }, [conversation, router]);

//   if (!conversation) {
//     return (
//       <LoadingIndicator message="Loading conversation..." className="p-4" />
//     );
//   }

//   const header = (
//     <header className="flex items-center justify-between border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm p-4 sticky top-0 z-10">
//       <div className="flex items-center gap-2">
//         <SidebarTrigger className="md:hidden" />
//         <Button
//           variant="ghost"
//           size="icon"
//           className="mr-2"
//           onClick={() => router.push('/')}
//         >
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <div>
//           <h1 className="text-sm font-medium">{conversation.title}</h1>
//           <p className="text-xs text-muted-foreground">
//             {new Date(conversation.updatedAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     </header>
//   );

//   const emptyState = (
//     <div className="flex flex-col items-center justify-center h-full text-center">
//       <p className="text-muted-foreground">
//         This conversation is empty. Start by sending a message.
//       </p>
//     </div>
//   );

//   return <AIChat header={header} emptyState={emptyState} />;
// }

// export function ConversationDetailContainer() {
//   return (
//     <AppLayout>
//       <ConversationDetailComponent />
//     </AppLayout>
//   );
// }

'use client';

import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { SidebarTrigger } from '@/shadcn/sidebar';
import { useConversation } from '@/context/ConversationContext';
import { Button } from '@/shadcn/button';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { AppLayout } from '@/layouts/AppLayout';

import AIChat from '../components';

function ConversationDetailComponent() {
  const params = useParams();
  const router = useRouter();
  const { conversations, setCurrentConversationId, conversationMessages } =
    useConversation();
  const conversationId = params.id as string;

  useEffect(() => {
    setCurrentConversationId(conversationId);
  }, [conversationId, setCurrentConversationId]);

  const conversation = conversations.find((c) => c.id === conversationId);
  const messages = conversationMessages[conversationId] || [];

  // Redirect if conversation is not found
  useEffect(() => {
    if (!conversation) {
      //   router.push('/');
    }
  }, [conversation, router]);

  if (!conversation) {
    return (
      <LoadingIndicator message="Loading conversation..." className="p-4" />
    );
  }

  const header = (
    <header className="flex items-center justify-between border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm p-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-sm font-medium">{conversation.title}</h1>
          <p className="text-xs text-muted-foreground">
            {new Date(conversation.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </header>
  );

  const emptyState = (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-muted-foreground">
        This conversation is empty. Start by sending a message.
      </p>
    </div>
  );

  return <AIChat header={header} emptyState={emptyState} />;
}

export function ConversationDetailContainer() {
  return (
    <AppLayout>
      <ConversationDetailComponent />
    </AppLayout>
  );
}
