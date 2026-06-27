import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
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
  SettingsState,
} from './settings.types';

export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  
  const settingsState = useSelector((state: RootState) => state.settings as SettingsState);
  
  const {
    profile,
    notificationSettings,
    themeSettings,
    inventorySettings,
    preferences,
    isLoading,
    error,
    successMessage,
  } = settingsState;

  // Profile actions
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

  // Notification Settings
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

  // Theme Settings
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

  // Inventory Settings
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

  // Preferences
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

  // Clear actions
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearSuccessMessage = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  return {
    // State
    profile,
    notificationSettings,
    themeSettings,
    inventorySettings,
    preferences,
    isLoading,
    error,
    successMessage,
    // Profile Actions
    loadProfile,
    updateProfile: handleUpdateProfile,
    updatePassword: handleUpdatePassword,
    uploadAvatar: handleUploadAvatar,
    // Notification Actions
    loadNotificationSettings,
    updateNotificationSettings: handleUpdateNotificationSettings,
    // Theme Actions
    loadThemeSettings,
    updateThemeSettings: handleUpdateThemeSettings,
    // Inventory Actions
    loadInventorySettings,
    updateInventorySettings: handleUpdateInventorySettings,
    // Preferences Actions
    loadPreferences,
    updatePreferences: handleUpdatePreferences,
    // Clear Actions
    clearError: handleClearError,
    clearSuccessMessage: handleClearSuccessMessage,
  };
};