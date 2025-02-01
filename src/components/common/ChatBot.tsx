import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id?: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isRead?: boolean;
}

const API_URL = 'http://localhost:3001';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch messages on component mount if user is logged in
  useEffect(() => {
    if (user?.id) {
      fetchMessages();
    }
  }, [user?.id]);

  const fetchMessages = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`${API_URL}/api/messages/${user.id}`);
      const data = await response.json();
      setMessages(data.map((msg: any) => ({
        id: msg.id,
        text: msg.message,
        isBot: msg.is_bot,
        timestamp: new Date(msg.created_at),
        isRead: msg.is_read
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user?.id) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          message: input
        })
      });

      const botMessage: Message = {
        text: "Thanks for your message! Our team will get back to you soon.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChatClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        data-chat-button
        onClick={handleChatClick}
        className="bg-[#00E3A5] p-4 rounded-full shadow-lg hover:bg-[#00c48f] transition-all duration-300"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 w-96 bg-[#2C2844] rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-[#1E1B2E] p-4 text-white">
              <h3 className="text-lg font-semibold">X-BIT Support</h3>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-4">
                  Start a conversation with us!
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-[#1E1B2E] text-white'
                          : 'bg-[#00E3A5] text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#1E1B2E] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00E3A5]"
                />
                <button
                  type="submit"
                  className="bg-[#00E3A5] text-white px-4 py-2 rounded-lg hover:bg-[#00c48f] transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 