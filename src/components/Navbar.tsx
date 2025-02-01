import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1E1B2E] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold hover:text-[#00E3A5]">X-BIT</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-[#00E3A5]">Home</Link>
              <Link to="/investment" className="text-gray-300 hover:text-[#00E3A5]">My Investment</Link>
              <Link to="/learn" className="text-gray-300 hover:text-[#00E3A5]">Learn</Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">
              EN
            </button>
            <div className="text-gray-300">
              Welcome, <span className="text-[#00E3A5]">User</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 