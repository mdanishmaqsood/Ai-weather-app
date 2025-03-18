'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useChat } from '@/hooks/use-chat';
import { ChevronDown } from 'lucide-react';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ErrorMessage } from '@/components/ErrorMessage';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { useConversation } from '@/context/ConversationContext';

interface ChatContainerProps {
  header: ReactNode;
  emptyState: ReactNode;
  onError?: (error: Error) => void;
}

export default function AIChat({
  header,
  emptyState,
  onError,
}: ChatContainerProps) {
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { currentConversationId, conversationMessages } = useConversation();

  const messages =
    conversationMessages[
      currentConversationId as keyof typeof conversationMessages
    ] || [];

  const { input, handleInputChange, handleSubmit, isLoading } = useChat({
    onError: (err) => {
      setError(
        err.message ||
          'An error occurred while communicating with the assistant'
      );
      onError?.(err);
    },
    onMessageReceived: (message) => {
      if (currentConversationId) {
      }
    },
  });

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Show scroll-to-bottom button if user scrolls up
  useEffect(() => {
    const checkScroll = () => {
      if (!messagesContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isScrolledUp);
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      {header}

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.length === 0 ? (
          emptyState
        ) : (
          <>
            {error && (
              <ErrorMessage message={error} retry={() => setError(null)} />
            )}
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isFirstInSequence={
                  index === 0 || messages[index - 1].role !== message.role
                }
                isLastInSequence={
                  index === messages.length - 1 ||
                  messages[index + 1].role !== message.role
                }
              />
            ))}
            {isLoading && <LoadingIndicator message="AI is thinking..." />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-8 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      )}

      {/* Chat input */}
      <div className="p-4 border-t bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
