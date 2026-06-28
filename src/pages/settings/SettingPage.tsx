import React, { useState, useEffect } from 'react';
import { useSettings } from './useSettings';
import ProfileSettings from './ProfileSettings';
import PasswordSettings from './PasswordSettings';
import NotificationSettings from './NotificationSettings';
import ThemeSettings from './ThemeSettings';
import InventorySettings from './InventorySettings';
import PreferencesSettings from './PreferencesSettings';
import { 
  PasswordUpdateData, 
  NotificationSettings as NotificationSettingsType,
  ThemeSettings as ThemeSettingsType,
  InventorySettings as InventorySettingsType,
  Preferences as PreferencesType
} from './settings.types';

type TabType = 'profile' | 'password' | 'notifications' | 'theme' | 'inventory' | 'preferences';

const SettingsPage: React.FC = () => {
  const {
    profile,
    notificationSettings,
    themeSettings,
    inventorySettings,
    preferences,
    isLoading,
    error,
    successMessage,
    loadProfile,
    loadNotificationSettings,
    loadThemeSettings,
    loadInventorySettings,
    loadPreferences,
    updateProfile,
    updatePassword,
    uploadAvatar,
    updateNotificationSettings,
    updateThemeSettings,
    updateInventorySettings,
    updatePreferences,
    clearError,
    clearSuccessMessage,
  } = useSettings();

  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // ✅ Handler functions with proper types
  const handleUpdatePassword = async (data: PasswordUpdateData): Promise<void> => {
    await updatePassword(data);
  };

  const handleUpdateNotificationSettings = async (settings: NotificationSettingsType): Promise<void> => {
    await updateNotificationSettings(settings);
  };

  const handleUpdateThemeSettings = async (settings: ThemeSettingsType): Promise<void> => {
    await updateThemeSettings(settings);
  };

  const handleUpdateInventorySettings = async (settings: InventorySettingsType): Promise<void> => {
    await updateInventorySettings(settings);
  };

  const handleUpdatePreferences = async (settings: PreferencesType): Promise<void> => {
    await updatePreferences(settings);
  };

  // ✅ تطبيق الثيم فوراً
  useEffect(() => {
    const applyTheme = (theme: string): void => {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    };

    if (themeSettings) {
      applyTheme(themeSettings.theme);
    }
  }, [themeSettings]);

  // ✅ تطبيق حجم الخط فوراً
  useEffect(() => {
    const applyFontSize = (size: string): void => {
      const html = document.documentElement;
      const fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
      html.style.fontSize = fontSize;
    };

    if (themeSettings) {
      applyFontSize(themeSettings.fontSize);
    }
  }, [themeSettings]);

  // ✅ تطبيق الـ Compact View
  useEffect(() => {
    const applyCompact = (compact: boolean): void => {
      const html = document.documentElement;
      if (compact) {
        html.classList.add('compact');
      } else {
        html.classList.remove('compact');
      }
    };

    if (themeSettings) {
      applyCompact(themeSettings.compactView);
    }
  }, [themeSettings]);

  useEffect(() => {
    loadProfile();
    loadNotificationSettings();
    loadThemeSettings();
    loadInventorySettings();
    loadPreferences();
  }, [loadProfile, loadNotificationSettings, loadThemeSettings, loadInventorySettings, loadPreferences]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => clearSuccessMessage(), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const tabs: { id: TabType; name: string; icon: string }[] = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'password', name: 'Password', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'theme', name: 'Theme', icon: '🎨' },
    { id: 'inventory', name: 'Inventory', icon: '📦' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and system settings</p>
        </div>
      </div>

      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-700 dark:text-green-300">{successMessage}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-2 transition-colors duration-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-6">
            {activeTab === 'profile' && (
              <ProfileSettings
                profile={profile}
                isLoading={isLoading}
                onUpdate={updateProfile}
                onUploadAvatar={uploadAvatar}
              />
            )}

            {activeTab === 'password' && (
              <PasswordSettings
                onUpdate={handleUpdatePassword}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationSettings
                settings={notificationSettings}
                onUpdate={handleUpdateNotificationSettings}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'theme' && (
              <ThemeSettings
                settings={themeSettings}
                onUpdate={handleUpdateThemeSettings}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'inventory' && (
              <InventorySettings
                settings={inventorySettings}
                onUpdate={handleUpdateInventorySettings}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'preferences' && (
              <PreferencesSettings
                settings={preferences}
                onUpdate={handleUpdatePreferences}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;