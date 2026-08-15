import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../utils/api';

const AUTH_KEY = 'iitk_auth';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // Validate that parsed object has at least token or user
      return parsed && (parsed.user || parsed.token) ? parsed : null;
    } catch (e) {
      console.error('Error reading auth from localStorage:', e);
      return null;
    }
  });

  useEffect(() => {
    if (auth && (auth.user || auth.token)) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [auth]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });

      // Ensure proper normalization of backend payload
      const authData = {
        token: res.token || res.data?.token,
        user: res.user || res.data?.user || res,
      };

      setAuth(authData);
      toast.success(`Welcome back, ${authData.user?.name || 'Student'}!`);
      return authData;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed');
      throw err;
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);

      const authData = {
        token: res.token || res.data?.token,
        user: res.user || res.data?.user || res,
      };

      setAuth(authData);
      toast.success('Account created successfully!');
      return authData;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(AUTH_KEY);
    toast.success('Logged out successfully');
  };

  const requestOTP = (email) => api.post('/auth/otp/request', { email });
  const verifyOTP = (email, otp) => api.post('/auth/otp/verify', { email, otp });

  return (
    <AuthContext.Provider
      value={{
        auth,
        token: auth?.token || '',
        user: auth?.user || null,
        login,
        register,
        logout,
        requestOTP,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};