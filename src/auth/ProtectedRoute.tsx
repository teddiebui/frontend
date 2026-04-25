import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  const { user, loading, fetchCurrentUser } = useAuth();
  const location = useLocation();

  // Ensure we fetch current user on first mount (or whenever it's missing)
  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  // While checking authentication, keep user on a loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner /> <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  // After loading completes, redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated users can access nested routes
  return <Outlet />;
}