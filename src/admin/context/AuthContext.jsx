import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage without useEffect
  const getInitialUser = () => {
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const [user, setUser] = useState(getInitialUser);

  const login = (email, password) => {
    // Simple authentication check
    if (email === 'adminpupr@gmail.com' && password === 'adminpupr123') {
      const userData = {
        email: email,
        name: 'Admin DPUPR',
        role: 'admin'
      };
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
