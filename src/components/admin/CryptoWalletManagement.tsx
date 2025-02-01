import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';

interface CryptoWallets {
  userId: string;
  btcWallet: string;
  ethWallet: string;
  bnbWallet: string;
  usdtWallet: string;
  xrpWallet: string;
  solWallet: string;
  btcAmount: number;
  ethAmount: number;
  bnbAmount: number;
  usdtAmount: number;
  xrpAmount: number;
  solAmount: number;
}

const CryptoWalletManagement: React.FC = () => {
  const { showNotification } = useNotification();
  const [wallets, setWallets] = useState<CryptoWallets>({
    userId: '',
    btcWallet: '',
    ethWallet: '',
    bnbWallet: '',
    usdtWallet: '',
    xrpWallet: '',
    solWallet: '',
    btcAmount: 0,
    ethAmount: 0,
    bnbAmount: 0,
    usdtAmount: 0,
    xrpAmount: 0,
    solAmount: 0
  });

  const handleAssignWallets = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/assign-crypto-wallets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wallets)
      });

      if (!response.ok) throw new Error('Failed to assign wallets');

      showNotification('Crypto wallets assigned successfully', 'success');
      setWallets({
        userId: '',
        btcWallet: '',
        ethWallet: '',
        bnbWallet: '',
        usdtWallet: '',
        xrpWallet: '',
        solWallet: '',
        btcAmount: 0,
        ethAmount: 0,
        bnbAmount: 0,
        usdtAmount: 0,
        xrpAmount: 0,
        solAmount: 0
      });
    } catch (error) {
      showNotification('Failed to assign wallets', 'error');
      console.error('Error assigning wallets:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Crypto Wallet Management</h2>
      <form onSubmit={handleAssignWallets} className="space-y-6">
        <div>
          <label className="block mb-2">User ID</label>
          <input
            type="text"
            value={wallets.userId}
            onChange={(e) => setWallets({...wallets, userId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Bitcoin */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Bitcoin (BTC) Wallet</label>
            <input
              type="text"
              value={wallets.btcWallet}
              onChange={(e) => setWallets({...wallets, btcWallet: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="BTC Wallet Address"
            />
          </div>
          <div>
            <label className="block mb-2">BTC Amount</label>
            <input
              type="number"
              value={wallets.btcAmount}
              onChange={(e) => setWallets({...wallets, btcAmount: Number(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.00000001"
            />
          </div>
        </div>

        {/* Ethereum */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Ethereum (ETH) Wallet</label>
            <input
              type="text"
              value={wallets.ethWallet}
              onChange={(e) => setWallets({...wallets, ethWallet: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="ETH Wallet Address"
            />
          </div>
          <div>
            <label className="block mb-2">ETH Amount</label>
            <input
              type="number"
              value={wallets.ethAmount}
              onChange={(e) => setWallets({...wallets, ethAmount: Number(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.00000001"
            />
          </div>
        </div>

        {/* BNB */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">BNB Wallet</label>
            <input
              type="text"
              value={wallets.bnbWallet}
              onChange={(e) => setWallets({...wallets, bnbWallet: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="BNB Wallet Address"
            />
          </div>
          <div>
            <label className="block mb-2">BNB Amount</label>
            <input
              type="number"
              value={wallets.bnbAmount}
              onChange={(e) => setWallets({...wallets, bnbAmount: Number(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.00000001"
            />
          </div>
        </div>

        {/* USDT */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">USDT Wallet</label>
            <input
              type="text"
              value={wallets.usdtWallet}
              onChange={(e) => setWallets({...wallets, usdtWallet: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="USDT Wallet Address"
            />
          </div>
          <div>
            <label className="block mb-2">USDT Amount</label>
            <input
              type="number"
              value={wallets.usdtAmount}
              onChange={(e) => setWallets({...wallets, usdtAmount: Number(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.00000001"
            />
          </div>
        </div>

        {/* XRP */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">XRP Wallet</label>
            <input
              type="text"
              value={wallets.xrpWallet}
              onChange={(e) => setWallets({...wallets, xrpWallet: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="XRP Wallet Address"
            />
          </div>
          <div>
            <label className="block mb-2">XRP Amount</label>
            <input
              type="number"
              value={wallets.xrpAmount}
              onChange={(e) => setWallets({...wallets, xrpAmount: Number(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.00000001"
            />
          </div>
        </div>

        {/* Solana */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Solana (SOL) Wallet</label>
            <input
              type="text"
              value={wallets.solWallet}
              onChange={(e) => setWallets({...wallets, solWallet: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="SOL Wallet Address"
            />
          </div>
          <div>
            <label className="block mb-2">SOL Amount</label>
            <input
              type="number"
              value={wallets.solAmount}
              onChange={(e) => setWallets({...wallets, solAmount: Number(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
              step="0.00000001"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign All Wallets
        </button>
      </form>
    </div>
  );
};

export default CryptoWalletManagement; 