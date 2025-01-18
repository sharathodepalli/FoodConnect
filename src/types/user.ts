export type UserRole = 'donor' | 'recipient' | 'volunteer' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  notifications: number;
}