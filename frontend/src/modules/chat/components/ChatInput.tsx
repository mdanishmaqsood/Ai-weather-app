'use client';

import type React from 'react';

import { Button } from '@/shadcn/button';
import { Textarea } from '@/shadcn/textarea';
import { SendIcon, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      setRows(scrollHeight > 100 ? 4 : scrollHeight > 50 ? 2 : 1);
    }
  }, [input]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSubmit(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative flex items-center">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          className={cn(
            'pr-14 py-3 resize-none max-h-32 overflow-y-auto',
            'bg-background border-input focus-visible:ring-1 focus-visible:ring-ring',
            'rounded-lg shadow-sm transition-all duration-200',
            'placeholder:text-muted-foreground'
          )}
          rows={rows}
        />
        <div className="absolute right-2 bottom-2 flex">
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={cn(
              'h-9 w-9 rounded-full transition-all duration-200',
              !input.trim() && 'opacity-70'
            )}
          >
            {isLoading ? (
              <Sparkles className="h-4 w-4 animate-pulse" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground text-right">
        Press <kbd className="px-1.5 py-0.5 bg-muted rounded border">Enter</kbd>{' '}
        to send,{' '}
        <kbd className="px-1.5 py-0.5 bg-muted rounded border">
          Shift + Enter
        </kbd>{' '}
        for new line
      </div>
    </form>
  );
}
