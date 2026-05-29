import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { 
  login, 
  register, 
  logout, 
  forgotPassword, 
  resetPassword, 
  clearError 
} from './authSlice';
import { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData 
} from './auth.types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Selectors - get state from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  // Login action
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(login(credentials));
      if (login.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    },
    [dispatch]
  );

  // Register action
  const handleRegister = useCallback(
    async (data: RegisterData) => {
      const result = await dispatch(register(data));
      if (register.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    },
    [dispatch]
  );

  // Logout action
  const handleLogout = useCallback(async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      return result.payload;
    } else {
      throw new Error(result.payload as string);
    }
  }, [dispatch]);

  // Forgot password action
  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordData) => {
      const result = await dispatch(forgotPassword(data));
      if (forgotPassword.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    },
    [dispatch]
  );

  // Reset password action
  const handleResetPassword = useCallback(
    async (data: ResetPasswordData) => {
      const result = await dispatch(resetPassword(data));
      if (resetPassword.fulfilled.match(result)) {
        return result.payload;
      } else {
        throw new Error(result.payload as string);
      }
    },
    [dispatch]
  );

  // Clear error action
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    clearError: handleClearError,
  };
};