export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  type: string;
  status: 'running' | 'completed' | 'failed';
  input: any;
  output: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
