import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { EmployeeDTO } from '@/types';
import authService from '@/services/authService';

interface AuthContextType {
  user: EmployeeDTO | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<EmployeeDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await authService.me();
      if (res.httpCode === 200) {
        setUser(res.data as EmployeeDTO);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const res = await authService.login({ username, password });

    if (res.httpCode === 200) {
      await fetchCurrentUser();
      return true;
    }

    return false;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // 🔥 IMPORTANT: init auth state khi app start
  useEffect(() => {
    fetchCurrentUser().finally(() => setLoading(false));
    console.log('Auth state initialized, user:', user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};