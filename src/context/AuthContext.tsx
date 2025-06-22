'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUser({ email: storedEmail });
    }
  }, []);

  const login = (email: string, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    setToken(token);
    setUser({ email });
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 