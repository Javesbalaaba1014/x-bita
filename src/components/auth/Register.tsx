import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingNotification from '../common/FloatingNotification';
import { User } from '../../types/user';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import FloatingNotifications from '../FloatingNotifications';

const API_URL = 'http://localhost:3001';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showNotification } = useNotification();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      showNotification('Registration successful! Please check your email for confirmation. Redirecting...', 'success');
      setTimeout(() => navigate('/investment'), 1500);
    } catch (err: any) {
      showNotification(err.message || 'Failed to register', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FloatingNotifications />
      <div className="min-h-screen bg-[#1E1B2E] flex items-center justify-center">
        <div className="w-full max-w-6xl mx-4">
          <div className="bg-[#2C2844]/50 p-8 rounded-2xl backdrop-blur-sm">
            <div className="flex gap-8">
              {/* Left side - Video */}
              <div className="flex-1 bg-[#2C2844] rounded-xl overflow-hidden flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[500px] w-auto"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Right side - Auth Form */}
              <div className="w-[400px] bg-[#2C2844] rounded-xl p-8">
                {/* Toggle buttons */}
                <div className="flex mb-8 bg-[#1E1B2E] rounded-full p-1">
                  <button
                    onClick={() => navigate('/login')}
                    className={`flex-1 py-2 rounded-full transition-all ${
                      isLogin ? 'bg-[#00E3A5] text-white' : 'text-gray-400'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-full transition-all ${
                      !isLogin ? 'bg-[#00E3A5] text-white' : 'text-gray-400'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-gray-400 mb-2 block">Name :</label>
                    <input
                      type="text"
                      className="w-full bg-[#1E1B2E] text-white rounded-lg p-3"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 mb-2 block">Email :</label>
                    <input
                      type="email"
                      className="w-full bg-[#1E1B2E] text-white rounded-lg p-3"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 mb-2 block">Password :</label>
                    <input
                      type="password"
                      className="w-full bg-[#1E1B2E] text-white rounded-lg p-3"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 mb-2 block">Confirm Password :</label>
                    <input
                      type="password"
                      className="w-full bg-[#1E1B2E] text-white rounded-lg p-3"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00E3A5] text-white py-3 rounded-lg transition-all hover:bg-[#00c48f] disabled:opacity-50"
                  >
                    {loading ? 'Signing up...' : 'Sign up'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register; 