import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';

interface WalletAssignment {
  userId: string;
  walletAddress: string;
  amount: number;
}

const WalletManagement: React.FC = () => {
  const { showNotification } = useNotification();
  const [assignment, setAssignment] = useState<WalletAssignment>({
    userId: '',
    walletAddress: '',
    amount: 0
  });

  const handleAssignWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/assign-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment)
      });

      if (!response.ok) throw new Error('Failed to assign wallet');

      showNotification('Wallet assigned successfully', 'success');
      setAssignment({ userId: '', walletAddress: '', amount: 0 });
    } catch (error) {
      showNotification('Failed to assign wallet', 'error');
      console.error('Error assigning wallet:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Wallet Management</h2>
      <form onSubmit={handleAssignWallet} className="space-y-4">
        <div>
          <label className="block mb-2">User ID</label>
          <input
            type="text"
            value={assignment.userId}
            onChange={(e) => setAssignment({...assignment, userId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Wallet Address</label>
          <input
            type="text"
            value={assignment.walletAddress}
            onChange={(e) => setAssignment({...assignment, walletAddress: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            value={assignment.amount}
            onChange={(e) => setAssignment({...assignment, amount: Number(e.target.value)})}
            className="w-full p-2 border rounded"
            required
            min="0"
            step="0.00000001"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign Wallet
        </button>
      </form>
    </div>
  );
};

export default WalletManagement; 