import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const Stats: React.FC = () => {
  const [totalInvestors, setTotalInvestors] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalInvestors(prev => Math.min(prev + 100, 10000));
      const investmentIncrease = Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
      setTotalInvestment(prev => Math.min(prev + investmentIncrease, 50000000));
      setUserCount(prev => prev + 1);
      setTimer(10);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomUser = Math.floor(Math.random() * 1000) + 1;
      const withdrawalAmount = Math.floor(Math.random() * 200000) + 10000;
      setTotalWithdrawals(prev => Math.min(prev + withdrawalAmount, 20000000));
      setTotalInvestment(prev => Math.max(prev - withdrawalAmount, 0));
      setNotification(`User ${randomUser} has withdrawn $${withdrawalAmount}! Total investment is now $${totalInvestment - withdrawalAmount}.`);
      setTimeout(() => setNotification(''), 5000);
    }, 15000);

    return () => clearInterval(notificationInterval);
  }, [totalInvestment]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="relative">
      {notification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded shadow-md">
          {notification}
        </div>
      )}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-[#2C2844] py-12 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-[#1E1B2E] rounded-xl p-6">
                <h3 className="text-gray-400 mb-2">User Count</h3>
                <div className="text-3xl font-bold text-[#00E3A5]">
                  <CountUp end={userCount} duration={1} separator="," />
                </div>
                <p className="text-gray-400 mt-2 text-sm">Total users registered</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-[#1E1B2E] rounded-xl p-6">
                <h3 className="text-gray-400 mb-2">Total Investment</h3>
                <div className="text-3xl font-bold text-[#00E3A5]">
                  $<CountUp end={totalInvestment} duration={1} separator="," />
                </div>
                <p className="text-gray-400 mt-2 text-sm">Assets under management</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-[#1E1B2E] rounded-xl p-6">
                <h3 className="text-gray-400 mb-2">Total Withdrawals</h3>
                <div className="text-3xl font-bold text-[#00E3A5]">
                  $<CountUp end={totalWithdrawals} duration={1} separator="," />
                </div>
                <p className="text-gray-400 mt-2 text-sm">Successfully processed</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-[#1E1B2E] rounded-xl p-6">
                <h3 className="text-gray-400 mb-2">Next Investment Update In</h3>
                <div className="text-3xl font-bold text-[#00E3A5]">
                  {timer} seconds
                </div>
                <p className="text-gray-400 mt-2 text-sm">Until next investment increase</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Stats; 