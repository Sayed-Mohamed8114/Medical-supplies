import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useRoleAccess } from './useRoleAccess';
import { UserRole } from './auth.types';

interface RoleBasedRouteProps {
  allowedRoles: UserRole | UserRole[];
  redirectPath?: string;
  children: React.ReactNode;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  redirectPath = '/dashboard',
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole } = useRoleAccess();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
export default RoleBasedRoute;