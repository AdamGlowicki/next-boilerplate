import {
  Nullable,
  RequestStatus,
} from '@/core/interfaces/common';

export interface User {
  email: string;
  id: number;
  username: string;
}

export interface AuthState {
  hydrateUserStatus: RequestStatus;
  user: Nullable<User>;
}
