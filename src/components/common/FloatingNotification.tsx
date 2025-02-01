import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingNotificationProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

const FloatingNotification: React.FC<FloatingNotificationProps> = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' 
              ? 'bg-green-500/10 border border-green-500 text-green-500' 
              : 'bg-red-500/10 border border-red-500 text-red-500'
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNotification; 