import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
  children,
}) => {
  // ✅ خد isAuthenticated من Redux
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  // ✅ لو في تحميل، اظهر Spinner
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ لو مش authenticated، روح للـ Login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // ✅ لو authenticated، اعرض الصفحة
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;