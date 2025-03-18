import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/cn';
import type { Message } from '@/types';
import { Avatar, AvatarFallback } from '@/shadcn/avatar';

import ToolOutput from './ToolOutput';

interface ChatMessageProps {
  message: Message;
  isFirstInSequence: boolean;
  isLastInSequence: boolean;
}

export default function ChatMessage({
  message,
  isFirstInSequence,
  isLastInSequence,
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const timestamp = message.createdAt
    ? format(new Date(message.createdAt), 'h:mm a')
    : '';

  return (
    <div
      className={cn(
        'group flex gap-3 transition-opacity',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && isFirstInSequence && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      {!isUser && !isFirstInSequence && <div className="w-8" />}

      <div
        className={cn(
          'flex flex-col max-w-[85%] md:max-w-[70%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {isFirstInSequence && (
          <div
            className={cn(
              'flex items-center mb-1 text-xs text-muted-foreground',
              isUser ? 'justify-end' : 'justify-start'
            )}
          >
            <span className="font-medium">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="mx-2">•</span>
            <span>{timestamp}</span>
          </div>
        )}

        <div
          className={cn(
            'rounded-lg px-4 py-2 text-sm',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted dark:bg-slate-800',
            isFirstInSequence && !isLastInSequence && isUser
              ? 'rounded-br-sm'
              : '',
            !isFirstInSequence && !isLastInSequence && isUser
              ? 'rounded-r-sm'
              : '',
            isLastInSequence && !isFirstInSequence && isUser
              ? 'rounded-tr-sm'
              : '',
            isFirstInSequence && !isLastInSequence && !isUser
              ? 'rounded-bl-sm'
              : '',
            !isFirstInSequence && !isLastInSequence && !isUser
              ? 'rounded-l-sm'
              : '',
            isLastInSequence && !isFirstInSequence && !isUser
              ? 'rounded-tl-sm'
              : ''
          )}
        >
          {message.content}
        </div>

        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="space-y-2 w-full mt-2">
            {message.toolCalls.map((toolCall) => (
              <ToolOutput key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}
      </div>

      {isUser && isFirstInSequence && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarFallback className="bg-muted">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      {isUser && !isFirstInSequence && <div className="w-8" />}
    </div>
  );
}
