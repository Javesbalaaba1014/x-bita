import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleWithdraw = () => {
    // Handle withdrawal logic here
    console.log('Withdrawing:', amount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2D2A3E] rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold text-white mb-4">Withdraw Funds</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full bg-[#1E1B2E] text-white px-4 py-2 rounded-lg mb-4"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleWithdraw}
            className="flex-1 bg-[#00E3A5] text-white px-4 py-2 rounded-lg hover:bg-[#00c48f] transition-colors"
          >
            Withdraw
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#3D3A4E] text-white px-4 py-2 rounded-lg hover:bg-[#4D4A5E] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal; 