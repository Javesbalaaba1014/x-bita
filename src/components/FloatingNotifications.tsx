import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  message: string;
}

const FloatingNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateRandomNotification = () => {
    const users = ['user123', 'trader456', 'crypto789', 'investor321'];
    const coins = ['solana', 'ETH', 'BTC', 'BNB', 'XRP', 'USDT'];
    const amounts = ['1.5', '2.5', '0.8', '3.2', '1.2'];

    const user = users[Math.floor(Math.random() * users.length)];
    const coin = coins[Math.floor(Math.random() * coins.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];

    return {
      id: Date.now(),
      message: `${user} successfully withdrawn a ${amount} ${coin}`
    };
  };

  // Generate initial notifications
  useEffect(() => {
    const initialNotifications = Array.from({ length: 10 }, generateRandomNotification);
    setNotifications(initialNotifications);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#2C2844] border-b border-[#00E3A5]/20">
      <div className="overflow-hidden h-10">
        <div className="flex items-center h-full animate-ticker">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className="flex-shrink-0 px-4 text-[#00E3A5] whitespace-nowrap"
                initial={{ opacity: 0, x: 100 }} // Start off-screen
                animate={{ opacity: 1, x: 0 }} // Animate to on-screen
                exit={{ opacity: 0, x: -100 }} // Animate off-screen
                transition={{ duration: 0.5 }} // Animation duration
              >
                {notification.message}
                <span className="mx-8 text-gray-500">|</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* Duplicate notifications for seamless loop */}
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={`${notification.id}-duplicate`}
                className="flex-shrink-0 px-4 text-[#00E3A5] whitespace-nowrap"
                initial={{ opacity: 0, x: 100 }} // Start off-screen
                animate={{ opacity: 1, x: 0 }} // Animate to on-screen
                exit={{ opacity: 0, x: -100 }} // Animate off-screen
                transition={{ duration: 0.5 }} // Animation duration
              >
                {notification.message}
                <span className="mx-8 text-gray-500">|</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FloatingNotifications; 