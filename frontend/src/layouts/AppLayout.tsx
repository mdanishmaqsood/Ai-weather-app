'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/shadcn/sidebar';
import { AppSidebar } from '@/components/AppSideBar';
import { ConversationProvider } from '@/context/ConversationContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sidebarState = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sidebar:state='))
      ?.split('=')[1];

    if (sidebarState) {
      setDefaultOpen(sidebarState === 'true');
    }
  }, []);

  return (
    <ConversationProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 relative w-full">{children}</div>
        </div>
      </SidebarProvider>
    </ConversationProvider>
  );
}
