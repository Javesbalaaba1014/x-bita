import React, { useState } from 'react';
import InvestmentQRModal from './modals/InvestmentQRModal';
import WithdrawModal from './modals/WithdrawModal';

const Investment: React.FC = () => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'BNB'>('BTC');

  // Sample investment data
  const investmentData = {
    totalInvestment: 5000,
    currentValue: 6200,
    profit: 1200,
    coins: [
      { name: 'BTC', amount: 0.05, value: 2000, profit: 300, profitPercentage: 15 },
      { name: 'BNB', amount: 12.5, value: 4200, profit: 900, profitPercentage: 25 }
    ]
  };

  const handleDeposit = (coin: 'BTC' | 'BNB') => {
    setSelectedCoin(coin);
    setIsQRModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1E1B2E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Investment Portfolio</h1>
          <div className="space-x-4">
            <button
              onClick={() => handleDeposit('BTC')}
              className="bg-[#F7931A] text-white px-4 py-2 rounded-lg hover:bg-[#F7931A]/80 transition-colors"
            >
              Deposit BTC
            </button>
            <button
              onClick={() => handleDeposit('BNB')}
              className="bg-[#F3BA2F] text-white px-4 py-2 rounded-lg hover:bg-[#F3BA2F]/80 transition-colors"
            >
              Deposit BNB
            </button>
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="bg-[#2D2A3E] text-white px-4 py-2 rounded-lg hover:bg-[#3D3A4E] transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#2D2A3E] p-6 rounded-lg">
            <h2 className="text-gray-400 mb-2">Total Investment</h2>
            <p className="text-2xl text-white">${investmentData.totalInvestment}</p>
          </div>
          <div className="bg-[#2D2A3E] p-6 rounded-lg">
            <h2 className="text-gray-400 mb-2">Current Value</h2>
            <p className="text-2xl text-[#00E3A5]">${investmentData.currentValue}</p>
          </div>
          <div className="bg-[#2D2A3E] p-6 rounded-lg">
            <h2 className="text-gray-400 mb-2">Total Profit</h2>
            <p className="text-2xl text-[#00E3A5]">+${investmentData.profit}</p>
          </div>
        </div>

        {/* Investments Table */}
        <div className="bg-[#2D2A3E] rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#252336]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Coin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Profit %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {investmentData.coins.map((coin, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {coin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {coin.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#00E3A5]">
                    ${coin.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#00E3A5]">
                    +${coin.profit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#00E3A5]">
                    +{coin.profitPercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <InvestmentQRModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)}
        coinType={selectedCoin}
      />
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    </div>
  );
};

export default Investment; 