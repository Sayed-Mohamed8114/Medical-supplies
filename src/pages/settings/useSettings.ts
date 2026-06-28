import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  fetchProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
  fetchNotificationSettings,
  updateNotificationSettings,
  fetchThemeSettings,
  updateThemeSettings,
  fetchInventorySettings,
  updateInventorySettings,
  fetchPreferences,
  updatePreferences,
  clearError,
  clearSuccessMessage,
} from './settingsSlice';
import {
  UpdateProfileData,
  PasswordUpdateData,
  NotificationSettings,
  ThemeSettings,
  InventorySettings,
  Preferences,
} from './settings.types';

export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    profile,
    notificationSettings,
    themeSettings,
    inventorySettings,
    preferences,
    isLoading,
    error,
    successMessage,
  } = useSelector((state: RootState) => state.settings);

  const loadProfile = useCallback(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileData) => {
      const result = await dispatch(updateProfile(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleUpdatePassword = useCallback(
    async (data: PasswordUpdateData) => {
      const result = await dispatch(updatePassword(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleUploadAvatar = useCallback(
    async (file: File) => {
      const result = await dispatch(uploadAvatar(file)).unwrap();
      return result;
    },
    [dispatch]
  );

  const loadNotificationSettings = useCallback(() => {
    dispatch(fetchNotificationSettings());
  }, [dispatch]);

  const handleUpdateNotificationSettings = useCallback(
    async (settings: NotificationSettings) => {
      const result = await dispatch(updateNotificationSettings(settings)).unwrap();
      return result;
    },
    [dispatch]
  );

  const loadThemeSettings = useCallback(() => {
    dispatch(fetchThemeSettings());
  }, [dispatch]);

  const handleUpdateThemeSettings = useCallback(
    async (settings: ThemeSettings) => {
      const result = await dispatch(updateThemeSettings(settings)).unwrap();
      return result;
    },
    [dispatch]
  );

  const loadInventorySettings = useCallback(() => {
    dispatch(fetchInventorySettings());
  }, [dispatch]);

  const handleUpdateInventorySettings = useCallback(
    async (settings: InventorySettings) => {
      const result = await dispatch(updateInventorySettings(settings)).unwrap();
      return result;
    },
    [dispatch]
  );

  const loadPreferences = useCallback(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  const handleUpdatePreferences = useCallback(
    async (preferences: Preferences) => {
      const result = await dispatch(updatePreferences(preferences)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearSuccessMessage = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  return {
    profile,
    notificationSettings,
    themeSettings,
    inventorySettings,
    preferences,
    isLoading,
    error,
    successMessage,
    loadProfile,
    updateProfile: handleUpdateProfile,
    updatePassword: handleUpdatePassword,
    uploadAvatar: handleUploadAvatar,
    loadNotificationSettings,
    updateNotificationSettings: handleUpdateNotificationSettings,
    loadThemeSettings,
    updateThemeSettings: handleUpdateThemeSettings,
    loadInventorySettings,
    updateInventorySettings: handleUpdateInventorySettings,
    loadPreferences,
    updatePreferences: handleUpdatePreferences,
    clearError: handleClearError,
    clearSuccessMessage: handleClearSuccessMessage,
  };
};