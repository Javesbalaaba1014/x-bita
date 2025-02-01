import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  user_id: number;
  message: string;
  is_bot: boolean;
  is_read: boolean;
  created_at: string;
  user_name: string;
  user_email: string;
}

const API_URL = 'http://localhost:3001';

const ChatAdmin: React.FC = () => {
  const [conversations, setConversations] = useState<Record<number, Message[]>>({});
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
    // Poll for new messages every 10 seconds
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data = await response.json();
      
      // Group messages by user_id
      const grouped = data.reduce((acc: Record<number, Message[]>, msg: Message) => {
        if (!acc[msg.user_id]) {
          acc[msg.user_id] = [];
        }
        acc[msg.user_id].push(msg);
        return acc;
      }, {});

      setConversations(grouped);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !reply.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: selectedUser,
          message: reply
        })
      });

      if (!response.ok) throw new Error('Failed to send reply');

      setReply('');
      await fetchConversations(); // Refresh conversations
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#1E1B2E] items-center justify-center">
        <div className="text-white">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#1E1B2E]">
      {/* User list */}
      <div className="w-1/4 border-r border-gray-700 p-4">
        <h2 className="text-xl text-white mb-4">Conversations</h2>
        {Object.entries(conversations).map(([userId, messages]) => {
          const latestMessage = messages[messages.length - 1];
          return (
            <button
              key={userId}
              onClick={() => setSelectedUser(Number(userId))}
              className={`w-full p-4 text-left rounded-lg mb-2 ${
                selectedUser === Number(userId)
                  ? 'bg-[#00E3A5] text-white'
                  : 'bg-[#2C2844] text-gray-300 hover:bg-[#00E3A5]/10'
              }`}
            >
              <div className="font-semibold">{latestMessage.user_name}</div>
              <div className="text-sm opacity-75">{latestMessage.user_email}</div>
              <span className="text-sm block text-gray-400 mt-2">
                {latestMessage.message.substring(0, 30)}...
              </span>
            </button>
          );
        })}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {conversations[selectedUser]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${msg.is_bot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.is_bot
                        ? 'bg-[#2C2844] text-white'
                        : 'bg-[#00E3A5] text-white'
                    }`}
                  >
                    {msg.message}
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleReply} className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 bg-[#2C2844] text-white rounded-lg px-4 py-2"
                />
                <button
                  type="submit"
                  className="bg-[#00E3A5] text-white px-6 py-2 rounded-lg hover:bg-[#00c48f] transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start replying
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAdmin; 