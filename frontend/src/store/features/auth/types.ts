import { User } from '@/types';

export interface IInitialState {
  user: User | null | undefined;
  isAuthenticated: boolean;
}
