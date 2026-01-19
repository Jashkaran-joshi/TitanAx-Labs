import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      // Decode token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setUser({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth
  };
};

