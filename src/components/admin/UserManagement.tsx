import React, { useState, useEffect } from 'react';
import { generateWalletAddress } from '../../utils/database';
import { useNotification } from '../../context/NotificationContext';

interface User {
  id: number;
  name: string;
  email: string;
  btc_wallet: string;
  eth_wallet: string;
  bnb_wallet: string;
  usdt_wallet: string;
  xrp_wallet: string;
  sol_wallet: string;
  btc_balance: string;
  eth_balance: string;
  bnb_balance: string;
  usdt_balance: string;
  xrp_balance: string;
  sol_balance: string;
  is_approved: number;
}

const API_URL = 'http://localhost:3001';

const UserManagement: React.FC = () => {
  const { showNotification } = useNotification();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState<Record<number, {
    btc: string;
    eth: string;
    bnb: string;
    usdt: string;
    xrp: string;
    sol: string;
  }>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to fetch users: ' + String(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletChange = (userId: number, type: 'btc' | 'eth' | 'bnb' | 'usdt' | 'xrp' | 'sol', value: string) => {
    setWallets(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [type]: value
      }
    }));
  };

  const handleApprove = async (userId: number) => {
    const userWallets = wallets[userId];
    if (!userWallets) {
      showNotification('Please fill in wallet addresses', 'error');
      return;
    }

    try {
      console.log('Sending approval request for user:', userId);
      const response = await fetch('/api/admin/approve-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          btc_wallet: userWallets.btc || null,
          eth_wallet: userWallets.eth || null,
          bnb_wallet: userWallets.bnb || null,
          usdt_wallet: userWallets.usdt || null,
          xrp_wallet: userWallets.xrp || null,
          sol_wallet: userWallets.sol || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve user');
      }
      
      // Clear wallets for this user
      const { [userId]: _, ...remainingWallets } = wallets;
      setWallets(remainingWallets);
      
      await fetchUsers();
      showNotification('User approved successfully', 'success');
    } catch (error) {
      console.error('Error approving user:', error);
      showNotification('Failed to approve user: ' + String(error), 'error');
    }
  };

  const handleReject = async (userId: number) => {
    if (!confirm('Are you sure you want to reject this user? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/reject-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Failed to reject user');
      }

      // Clear wallets for this user if they exist
      const { [userId]: _, ...remainingWallets } = wallets;
      setWallets(remainingWallets);
      
      await fetchUsers(); // Refresh user list
      showNotification('User rejected successfully', 'success');
    } catch (error) {
      console.error('Error rejecting user:', error);
      showNotification('Failed to reject user: ' + String(error), 'error');
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-[#1E1B2E] min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-[#2C2844] rounded-lg">
          <thead>
            <tr className="text-left text-gray-300 border-b border-gray-700">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">BTC Wallet</th>
              <th className="p-4">BTC Balance</th>
              <th className="p-4">ETH Wallet</th>
              <th className="p-4">ETH Balance</th>
              <th className="p-4">BNB Wallet</th>
              <th className="p-4">BNB Balance</th>
              <th className="p-4">USDT Wallet</th>
              <th className="p-4">USDT Balance</th>
              <th className="p-4">XRP Wallet</th>
              <th className="p-4">XRP Balance</th>
              <th className="p-4">SOL Wallet</th>
              <th className="p-4">SOL Balance</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-white border-b border-gray-700">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 text-xs">{user.btc_wallet || '-'}</td>
                <td className="p-4">{Number(user.btc_balance).toFixed(8)}</td>
                <td className="p-4 text-xs">{user.eth_wallet || '-'}</td>
                <td className="p-4">{Number(user.eth_balance).toFixed(8)}</td>
                <td className="p-4 text-xs">{user.bnb_wallet || '-'}</td>
                <td className="p-4">{Number(user.bnb_balance).toFixed(8)}</td>
                <td className="p-4 text-xs">{user.usdt_wallet || '-'}</td>
                <td className="p-4">{Number(user.usdt_balance).toFixed(8)}</td>
                <td className="p-4 text-xs">{user.xrp_wallet || '-'}</td>
                <td className="p-4">{Number(user.xrp_balance).toFixed(8)}</td>
                <td className="p-4 text-xs">{user.sol_wallet || '-'}</td>
                <td className="p-4">{Number(user.sol_balance).toFixed(8)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.is_approved 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {user.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="p-4">
                  {!user.is_approved && (
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        placeholder="BTC Wallet"
                        className="bg-[#1E1B2E] text-white rounded px-2 py-1 text-sm"
                        value={wallets[user.id]?.btc || ''}
                        onChange={(e) => handleWalletChange(user.id, 'btc', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="ETH Wallet"
                        className="bg-[#1E1B2E] text-white rounded px-2 py-1 text-sm"
                        value={wallets[user.id]?.eth || ''}
                        onChange={(e) => handleWalletChange(user.id, 'eth', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="BNB Wallet"
                        className="bg-[#1E1B2E] text-white rounded px-2 py-1 text-sm"
                        value={wallets[user.id]?.bnb || ''}
                        onChange={(e) => handleWalletChange(user.id, 'bnb', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="USDT Wallet"
                        className="bg-[#1E1B2E] text-white rounded px-2 py-1 text-sm"
                        value={wallets[user.id]?.usdt || ''}
                        onChange={(e) => handleWalletChange(user.id, 'usdt', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="XRP Wallet"
                        className="bg-[#1E1B2E] text-white rounded px-2 py-1 text-sm"
                        value={wallets[user.id]?.xrp || ''}
                        onChange={(e) => handleWalletChange(user.id, 'xrp', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="SOL Wallet"
                        className="bg-[#1E1B2E] text-white rounded px-2 py-1 text-sm"
                        value={wallets[user.id]?.sol || ''}
                        onChange={(e) => handleWalletChange(user.id, 'sol', e.target.value)}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="px-3 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 