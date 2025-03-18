import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageRole } from '@/types';
import { useConversation } from '@/context/ConversationContext';
import { BASE_URL } from '@/configs/api';

interface UseChatOptions {
  onError?: (error: Error) => void;
  onMessageReceived?: (message: Message) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const { currentConversationId, addMessageToConversation, input, setInput } =
    useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const { onError, onMessageReceived } = options;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user' as MessageRole,
      content: input,
      createdAt: new Date(),
    };

    addMessageToConversation(userMessage);

    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          query: input,
          session_id: currentConversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is null');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim().startsWith('data: ')) continue;

          let rawData = line.slice(6).trim();
          if (!rawData) continue;

          let eventData: { type: string; content?: string };

          try {
            if (!rawData.startsWith('{') || !rawData.endsWith('}')) {
              eventData = { type: 'chunk', content: rawData };
            } else {
              eventData = JSON.parse(rawData);
            }

            if (eventData.type === 'chunk') {
              fullContent += ' ' + (eventData.content || '');
            }
          } catch (error) {
            console.error(
              'Error parsing event - skipping:',
              error,
              `Raw Data: ${rawData}`
            );
          }
        }
      }

      // After the stream is complete, create the final message and save it
      const finalMessage: Message = {
        id: uuidv4(),
        role: 'assistant' as MessageRole,
        content: fullContent.trim(),
        createdAt: new Date(),
      };

      addMessageToConversation(finalMessage);
      onMessageReceived?.(finalMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessageToConversation({
        id: uuidv4(),
        role: 'assistant' as MessageRole,
        content:
          'Sorry, there was an error processing your request. Please try again.',
        createdAt: new Date(),
      });

      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
