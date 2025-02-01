import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import FloatingNotifications from '../FloatingNotifications';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting login form with:', { email, password });
      const userData = await login(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      showNotification('Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        // Redirect based on admin status
        if (userData.is_admin) {
          navigate('/admin');
        } else {
          navigate('/investment');
        }
      }, 1500);
      
    } catch (err: any) {
      console.error('Login form submission error:', err);
      showNotification(err.message || 'Failed to login', 'error');
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
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-full transition-all ${
                      isLogin ? 'bg-[#00E3A5] text-white' : 'text-gray-400'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className={`flex-1 py-2 rounded-full transition-all ${
                      !isLogin ? 'bg-[#00E3A5] text-white' : 'text-gray-400'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-gray-400 mb-2 block">Email :</label>
                    <input
                      type="email"
                      className="w-full bg-[#1E1B2E] text-white rounded-lg p-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 mb-2 block">Password :</label>
                    <input
                      type="password"
                      className="w-full bg-[#1E1B2E] text-white rounded-lg p-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00E3A5] text-white py-3 rounded-lg transition-all hover:bg-[#00c48f] disabled:opacity-50 mt-4"
                  >
                    {loading ? 'Logging in...' : 'Log in'}
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

export default Login;