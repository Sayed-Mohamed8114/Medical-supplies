// src/pages/auth/authService.ts
import { LoginCredentials, RegisterData, AuthResponse, User, ForgotPasswordData, ResetPasswordData } from './auth.types';
import { tokenUtils } from './tokenUtils';

// استخدام value ثابتة (في حالة عدم وجود env)
//const API_URL = 'http://localhost:3001/api';

// Mock data للمستخدمين
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@medical.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
    phoneNumber: '+1234567890',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'manager@medical.com',
    password: 'password123',
    firstName: 'Manager',
    lastName: 'User',
    role: 'manager' as const,
    phoneNumber: '+1234567891',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'staff@medical.com',
    password: 'password123',
    firstName: 'Staff',
    lastName: 'User',
    role: 'staff' as const,
    phoneNumber: '+1234567892',
    createdAt: new Date().toISOString(),
  },
];

export const authService = {
  // تسجيل الدخول
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
        
        if (foundUser && credentials.password === foundUser.password) {
          const userData: User = {
            id: foundUser.id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role,
            phoneNumber: foundUser.phoneNumber,
            createdAt: foundUser.createdAt,
          };
          
          resolve({
            user: userData,
            token: `mock-jwt-token-${foundUser.id}-${Date.now()}`,
            expiresIn: 86400, // 24 ساعة
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  },

  // تسجيل مستخدم جديد
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find(u => u.email === data.email);
        
        if (existingUser) {
          reject(new Error('User with this email already exists'));
          return;
        }

        if (data.password !== data.confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'staff',
          phoneNumber: data.phoneNumber,
          createdAt: new Date().toISOString(),
        };
        
        resolve({
          user: newUser,
          token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
          expiresIn: 86400,
        });
      }, 800);
    });
  },

  // تسجيل الخروج
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tokenUtils.clearAll();
        resolve();
      }, 300);
    });
  },

  // نسيت كلمة المرور
  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userExists = MOCK_USERS.some(u => u.email === data.email);
        
        if (userExists) {
          resolve({ 
            message: 'Password reset link has been sent to your email address.' 
          });
        } else {
          reject(new Error('No user found with this email address'));
        }
      }, 800);
    });
  },

  // إعادة تعيين كلمة المرور
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.password !== data.confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }
        
        if (data.token && data.token.length > 0) {
          resolve({ 
            message: 'Password has been reset successfully. You can now login with your new password.' 
          });
        } else {
          reject(new Error('Invalid or expired reset token'));
        }
      }, 800);
    });
  },
};