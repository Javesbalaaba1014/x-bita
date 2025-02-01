export interface Investment {
  btc_wallet: string;
  btc_balance: number;
  eth_wallet: string;
  eth_balance: number;
  bnb_wallet: string;
  bnb_balance: number;
  usdt_wallet: string;
  usdt_balance: number;
  xrp_wallet: string;
  xrp_balance: number;
  sol_wallet: string;
  sol_balance: number;
  [key: string]: string | number; // Index signature for dynamic access
}

export interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment: {
    asset: 'BTC' | 'ETH' | 'BNB' | 'XRP' | 'USDT' | 'SOL';
    amount: number;
    profit: number;
    total: number;
  };
  onWithdraw: (coin: string, amount: number) => Promise<void>;
} 