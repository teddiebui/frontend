import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { EmployeeDTO } from '@/types';
import authService from '@/services/authService';

interface AuthActionResult {
  ok: boolean;
  message?: string;
}

interface AuthContextType {
  user: EmployeeDTO | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthActionResult>;
  logout: () => Promise<AuthActionResult>;
  fetchCurrentUser: () => Promise<EmployeeDTO | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<EmployeeDTO | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchCurrentUser = useCallback(async (): Promise<EmployeeDTO | null> => {
    setLoading(true);

    try {
      const res = await authService.me();
      if (res.httpCode === 200 && res.data) {
        setUser(res.data);
        console.log('Fetched current user:', res.data);
        return res.data;
      }

      setUser(null);
      return null;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<AuthActionResult> => {
    setLoading(true);

    try {
      const res = await authService.login({ username, password });

      if (res.httpCode !== 200) {
        setLoading(false);
        return {
          ok: false,
          message: res.message || 'Đăng nhập thất bại.',
        };
      }

      const currentUser = await fetchCurrentUser();
      if (!currentUser) {
        return {
          ok: false,
          message: 'Đăng nhập thành công nhưng không tải được thông tin người dùng.',
        };
      }

      return { ok: true };
    } catch {
      setLoading(false);
      return {
        ok: false,
        message: 'Không thể kết nối tới hệ thống. Vui lòng thử lại.',
      };
    }
  }, [fetchCurrentUser]);

  const logout = useCallback(async (): Promise<AuthActionResult> => {
    try {
      const res = await authService.logout();
      return res.httpCode === 200
        ? { ok: true }
        : {
            ok: false,
            message: res.message || 'Đăng xuất chưa hoàn tất ở phía máy chủ.',
          };
    } catch {
      return {
        ok: false,
        message: 'Không thể xác nhận đăng xuất với máy chủ.',
      };
    } finally {
      setUser(null);
      setLoading(false);
    }
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