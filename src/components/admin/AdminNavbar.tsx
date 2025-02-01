import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#2C2844] border-b border-[#1E1B2E]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-white font-bold">Admin Panel</span>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin')
                    ? 'bg-[#00E3A5] text-white'
                    : 'text-gray-300 hover:bg-[#1E1B2E] hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin/users')
                    ? 'bg-[#00E3A5] text-white'
                    : 'text-gray-300 hover:bg-[#1E1B2E] hover:text-white'
                }`}
              >
                User Management
              </Link>
              <Link
                to="/admin/chat"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin/chat')
                    ? 'bg-[#00E3A5] text-white'
                    : 'text-gray-300 hover:bg-[#1E1B2E] hover:text-white'
                }`}
              >
                Chat Support
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 