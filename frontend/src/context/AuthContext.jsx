import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('eventflow_token');
      const savedUser = localStorage.getItem('eventflow_user');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        const decodedUser = response.data.user;

        const currentUser = savedUser
          ? JSON.parse(savedUser)
          : {
              id: decodedUser.userId,
              role: decodedUser.role,
            };

        setUser(currentUser);
        localStorage.setItem(
          'eventflow_user',
          JSON.stringify(currentUser)
        );
      } catch (error) {
        localStorage.removeItem('eventflow_token');
        localStorage.removeItem('eventflow_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const { token, user: loggedInUser } = response.data;

    localStorage.setItem('eventflow_token', token);
    localStorage.setItem(
      'eventflow_user',
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('eventflow_token');
    localStorage.removeItem('eventflow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}