export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  is_admin: boolean;
  is_approved: boolean;
  wallet_address: string | null;
  balance: number;
  token_balance: number;
  created_at: string;
  redirectTo?: string;
} 