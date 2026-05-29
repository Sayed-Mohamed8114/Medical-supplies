export type UserRole = 'admin' | 'manager' | 'staff' | 'viewer';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phoneNumber?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  phoneNumber?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface DecodedToken {
  userId: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { resource: 'all', actions: ['create', 'read', 'update', 'delete'] }
  ],
  manager: [
    { resource: 'items', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'categories', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'suppliers', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'stock', actions: ['create', 'read', 'update'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'users', actions: ['read'] }
  ],
  staff: [
    { resource: 'items', actions: ['read', 'update'] },
    { resource: 'stock', actions: ['create', 'read', 'update'] },
    { resource: 'suppliers', actions: ['read'] },
    { resource: 'reports', actions: ['read'] }
  ],
  viewer: [
    { resource: 'items', actions: ['read'] },
    { resource: 'stock', actions: ['read'] },
    { resource: 'reports', actions: ['read'] }
  ]
};