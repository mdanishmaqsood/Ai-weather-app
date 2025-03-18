'use client';

import { Sparkles, CloudSun, MapPin, Calendar } from 'lucide-react';
import { useEffect } from 'react';

import { SidebarTrigger } from '@/shadcn/sidebar';
import { Logo } from '@/assets/icons/logo';
import { useConversation } from '@/context/ConversationContext';
import { AppLayout } from '@/layouts/AppLayout';

import AIChat from '../components';

function ChatComponent() {
  const { currentConversationId, startNewConversation, setInput } =
    useConversation();

  useEffect(() => {
    if (!currentConversationId) {
      startNewConversation();
    }
  }, [currentConversationId, startNewConversation]);

  const header = (
    <header className="flex items-center justify-between border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm p-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Logo size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">New Conversation</span>
      </div>
    </header>
  );

  const emptyState = (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-primary/5 p-6 rounded-full mb-4">
        <Sparkles className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Welcome to AI Assistant</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Ask me about the weather, dealership locations, or schedule an
        appointment. I&apos;m here to help!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        {[
          {
            icon: CloudSun,
            title: 'Weather Information',
            description: 'Get current weather conditions for any location',
          },
          {
            icon: MapPin,
            title: 'Dealership Locations',
            description: 'Find dealership addresses and contact information',
          },
          {
            icon: Calendar,
            title: 'Schedule Appointments',
            description: 'Book service appointments at your convenience',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-card border rounded-lg p-4 text-left hover:shadow-md transition-shadow"
            onClick={() => {
              setInput(item.title);
            }}
          >
            <item.icon className="h-8 w-8 mb-2 text-primary" />
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return <AIChat header={header} emptyState={emptyState} />;
}

export function ChatHomeContainer() {
  return (
    <AppLayout>
      <ChatComponent />
    </AppLayout>
  );
}
