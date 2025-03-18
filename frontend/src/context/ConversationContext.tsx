'use client';

import { Message } from '@/types';
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ConversationContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
  conversationMessages: Record<string, Message[]>;
  addMessageToConversation: (message: Message) => void;
  startNewConversation: () => string;
  deleteConversation: (id: string) => void;
  input: string;
  setInput: (text: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export function ConversationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [conversationMessages, setConversationMessages] = useState<
    Record<string, Message[]>
  >({});
  const [input, setInput] = useState('');

  // ✅ Load conversations & messages from localStorage on mount
  useEffect(() => {
    const storedConversations = localStorage.getItem('conversations');
    const storedMessages = localStorage.getItem('conversationMessages');
    const storedCurrentId = localStorage.getItem('currentConversationId');

    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }

    if (storedMessages) {
      setConversationMessages(JSON.parse(storedMessages));
    }

    if (storedCurrentId) {
      setCurrentConversationId(storedCurrentId);
    }
  }, []);

  // ✅ Save conversations & messages to localStorage on update
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(
      'conversationMessages',
      JSON.stringify(conversationMessages)
    );
  }, [conversationMessages]);

  useEffect(() => {
    if (currentConversationId) {
      localStorage.setItem('currentConversationId', currentConversationId);
    }
  }, [currentConversationId]);

  // ✅ Create a new conversation
  const startNewConversation = () => {
    const now = new Date();
    const newId = uuidv4();
    const newConversation: Conversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: now,
      updatedAt: now,
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newId);
    setConversationMessages((prev) => ({ ...prev, [newId]: [] }));

    return newId;
  };

  // ✅ Add messages to the active conversation
  const addMessageToConversation = (message: Message) => {
    if (!currentConversationId) {
      // Create a new conversation on first message
      const newConversationId = startNewConversation();
      setCurrentConversationId(newConversationId);
      setConversationMessages((prev) => ({
        ...prev,
        [newConversationId]: [message],
      }));
      return;
    }

    setConversationMessages((prev) => ({
      ...prev,
      [currentConversationId]: [
        ...(prev[currentConversationId] || []),
        message,
      ],
    }));
  };

  // ✅ Delete conversation
  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
    setConversationMessages((prev) => {
      const updatedMessages = { ...prev };
      delete updatedMessages[id];
      return updatedMessages;
    });

    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversationId,
        setCurrentConversationId,
        conversationMessages,
        addMessageToConversation,
        startNewConversation,
        deleteConversation,
        input,
        setInput,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      'useConversation must be used within a ConversationProvider'
    );
  }
  return context;
}
