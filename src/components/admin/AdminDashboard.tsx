import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-[#1E1B2E] min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/admin/chat"
          className="p-6 bg-[#2C2844] rounded-lg hover:bg-[#00E3A5]/10 transition-colors"
        >
          <h2 className="text-xl text-white font-semibold mb-2">Chat Support</h2>
          <p className="text-gray-400">Manage user conversations and provide support</p>
        </Link>

        <Link 
          to="/admin/users"
          className="p-6 bg-[#2C2844] rounded-lg hover:bg-[#00E3A5]/10 transition-colors"
        >
          <h2 className="text-xl text-white font-semibold mb-2">User Management</h2>
          <p className="text-gray-400">View and manage user accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard; 