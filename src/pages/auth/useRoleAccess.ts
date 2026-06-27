import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { UserRole, rolePermissions, Permission } from './auth.types';

export const useRoleAccess = () => {
  const { user } = useAuth();

  // Check if user has specific role(s)
  const hasRole = useCallback(
    (roles: UserRole | UserRole[]): boolean => {
      if (!user) return false;
      
      const rolesToCheck = Array.isArray(roles) ? roles : [roles];
      return rolesToCheck.includes(user.role);
    },
    [user]
  );

  // Check if user has permission for specific resource and action
  const hasPermission = useCallback(
    (resource: string, action: 'create' | 'read' | 'update' | 'delete'): boolean => {
      if (!user) return false;
      
      // Admin has all permissions
      if (user.role === 'admin') return true;
      
      const userPermissions: Permission[] = rolePermissions[user.role] || [];
      
      // Check for 'all' resource permission
      const allPermission = userPermissions.find(p => p.resource === 'all');
      if (allPermission) {
        return allPermission.actions.includes(action);
      }
      
      // Check for specific resource permission
      const resourcePermission = userPermissions.find(p => p.resource === resource);
      if (resourcePermission) {
        return resourcePermission.actions.includes(action);
      }
      
      return false;
    },
    [user]
  );

  // Convenience methods
  const canView = useCallback(
    (resource: string): boolean => hasPermission(resource, 'read'),
    [hasPermission]
  );

  const canCreate = useCallback(
    (resource: string): boolean => hasPermission(resource, 'create'),
    [hasPermission]
  );

  const canUpdate = useCallback(
    (resource: string): boolean => hasPermission(resource, 'update'),
    [hasPermission]
  );

  const canDelete = useCallback(
    (resource: string): boolean => hasPermission(resource, 'delete'),
    [hasPermission]
  );

  // Get user role name in readable format
  const getUserRoleName = useCallback((): string => {
    if (!user) return '';
    const roleNames: Record<UserRole, string> = {
      admin: 'Administrator',
      manager: 'Manager',
      staff: 'Staff',
      viewer: 'Viewer',
    };
    return roleNames[user.role];
  }, [user]);

  // Role check shortcuts
  const isAdmin = useCallback((): boolean => hasRole('admin'), [hasRole]);
  const isManager = useCallback((): boolean => hasRole('manager'), [hasRole]);
  const isStaff = useCallback((): boolean => hasRole('staff'), [hasRole]);
  const isViewer = useCallback((): boolean => hasRole('viewer'), [hasRole]);

  return {
    hasRole,
    hasPermission,
    canView,
    canCreate,
    canUpdate,
    canDelete,
    getUserRoleName,
    isAdmin,
    isManager,
    isStaff,
    isViewer,
    userRole: user?.role,
  };
};