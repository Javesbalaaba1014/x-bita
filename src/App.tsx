import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './hero'
import About from './components/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Investment from './components/Investment'
import Learn from './components/Learn'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext';
import ChatBot from './components/common/ChatBot';
import ChatAdmin from './components/admin/ChatAdmin';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import { NotificationProvider } from './context/NotificationContext';
import { useState, useEffect } from 'react';
import AdminLayout from './components/admin/AdminLayout';
import AdminWrapper from './components/admin/AdminWrapper';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userStr = localStorage.getItem('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userStr) {
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [userStr]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1B2E] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!userStr) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.id || !user.is_admin) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AdminWrapper>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/investment" element={
                <ProtectedRoute>
                  <Investment />
                </ProtectedRoute>
              } />
              <Route path="/learn" element={<Learn />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/*" element={
                <AdminRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="chat" element={<ChatAdmin />} />
                    </Routes>
                  </AdminLayout>
                </AdminRoute>
              } />
            </Routes>
            <ChatBot />
          </AdminWrapper>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
