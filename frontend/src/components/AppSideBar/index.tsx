// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import { MessageSquare, Plus } from 'lucide-react';
// import { Button } from '@/shadcn/button';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   SidebarSeparator,
//   SidebarTrigger,
//   useSidebar,
// } from '@/shadcn/sidebar';
// import { Logo } from '@/assets/icons/logo';
// import { useConversation } from '@/context/ConversationContext';
// import { cn } from '@/lib/utils';

// export function AppSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { conversations, startNewConversation, setCurrentConversationId } =
//     useConversation();
//   const { state } = useSidebar();

//   const handleNewConversation = () => {
//     const newId = startNewConversation();
//     router.push(`/`);
//   };

//   const handleConversationClick = (id: string) => {
//     setCurrentConversationId(id);
//     localStorage.setItem('currentConversationId', id);
//     router.push(`/chat/${id}`);
//   };

//   return (
//     <Sidebar variant="sidebar" collapsible="icon">
//       <SidebarHeader className="border-b">
//         <div className="flex items-center justify-between p-2">
//           <Logo size="sm" />
//           <SidebarTrigger
//             className={cn(state === 'collapsed' && 'rotate-180')}
//           />
//         </div>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <div className="px-2 py-2">
//             <Button
//               className="w-full justify-start gap-2"
//               onClick={handleNewConversation}
//             >
//               <Plus className="h-4 w-4" />
//               New Conversation
//             </Button>
//           </div>
//         </SidebarGroup>

//         {conversations.length > 0 && (
//           <SidebarGroup>
//             <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {conversations.map((conversation) => (
//                   <SidebarMenuItem key={conversation.id}>
//                     <SidebarMenuButton
//                       onClick={() => handleConversationClick(conversation.id)}
//                       isActive={pathname === `/chat/${conversation.id}`}
//                       tooltip={conversation.title}
//                     >
//                       <MessageSquare className="h-4 w-4" />
//                       <span>{conversation.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         )}

//         <SidebarSeparator />
//       </SidebarContent>

//       <SidebarFooter className="border-t">
//         <div className="p-2 text-xs text-center text-muted-foreground">
//           AI Assistant v1.0
//         </div>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/shadcn/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/shadcn/sidebar';
import { Logo } from '@/assets/icons/logo';
import { useConversation } from '@/context/ConversationContext';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const {
    conversations,
    currentConversationId,
    startNewConversation,
    setCurrentConversationId,
  } = useConversation();
  const { state } = useSidebar();

  useEffect(() => {
    if (!currentConversationId && conversations.length > 0) {
      setCurrentConversationId(conversations[0].id);
    }
  }, [conversations, currentConversationId, setCurrentConversationId]);

  const handleNewConversation = () => {
    const currentTitle = conversations.find(
      (conversation) => conversation.id === currentConversationId
    )?.title;

    console.log({ currentTitle, conversations, currentConversationId });
    setCurrentConversationId(null);
    startNewConversation();
  };

  const handleConversationClick = (id: string) => {
    setCurrentConversationId(id);
    localStorage.setItem('currentConversationId', id);
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-2">
          <Logo size="sm" />
          <SidebarTrigger
            className={cn(state === 'collapsed' && 'rotate-180')}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 py-2">
            <Button
              className="w-full justify-start gap-2"
              onClick={handleNewConversation}
            >
              <Plus className="h-4 w-4" />
              New Conversation
            </Button>
          </div>
        </SidebarGroup>

        {conversations.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {conversations.map((conversation) => (
                  <SidebarMenuItem key={conversation.id}>
                    <SidebarMenuButton
                      onClick={() => handleConversationClick(conversation.id)}
                      isActive={currentConversationId === conversation.id}
                      tooltip={conversation.title}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{conversation.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarSeparator />
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-2 text-xs text-center text-muted-foreground">
          AI Assistant v1.0
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
