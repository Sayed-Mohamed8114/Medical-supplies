import { 
  UserProfile, 
  UpdateProfileData, 
  PasswordUpdateData,
  NotificationSettings,
  ThemeSettings,
  InventorySettings,
  Preferences 
} from './settings.types';

// ✅ استخدم localStorage بدل الـ Mock Data
const STORAGE_KEYS = {
  PROFILE: 'medical_settings_profile',
  NOTIFICATIONS: 'medical_settings_notifications',
  THEME: 'medical_settings_theme',
  INVENTORY: 'medical_settings_inventory',
  PREFERENCES: 'medical_settings_preferences',
};

// ✅ دوال مساعدة للـ localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

const setToStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ✅ القيم الافتراضية
const defaultProfile: UserProfile = {
  id: '1',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@medical.com',
  phoneNumber: '+1234567890',
  department: 'IT',
  position: 'System Administrator',
  bio: 'Medical inventory system administrator',
  avatar: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  lowStockAlerts: true,
  expiryAlerts: true,
  newUserAlerts: false,
  reportAlerts: true,
  pushNotifications: false,
  smsNotifications: false,
};

const defaultThemeSettings: ThemeSettings = {
  theme: 'light',
  sidebarCollapsed: false,
  fontSize: 'medium',
  compactView: false,
};

const defaultInventorySettings: InventorySettings = {
  defaultLowStockThreshold: 50,
  defaultExpiryWarningDays: 30,
  autoReorder: false,
  autoReorderQuantity: 100,
  defaultUnit: 'pcs',
  currency: 'USD',
  taxRate: 0,
};

const defaultPreferences: Preferences = {
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
  firstDayOfWeek: 1,
};

export const settingsService = {
  // ✅ Profile
  getProfile: async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = getFromStorage(STORAGE_KEYS.PROFILE, defaultProfile);
        resolve(profile);
      }, 200);
    });
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = getFromStorage(STORAGE_KEYS.PROFILE, defaultProfile);
        const updated = { 
          ...current, 
          ...data, 
          updatedAt: new Date().toISOString() 
        };
        setToStorage(STORAGE_KEYS.PROFILE, updated);
        resolve(updated);
      }, 200);
    });
  },

  updatePassword: async (data: PasswordUpdateData): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // ✅ الباسورد الافتراضي
        if (data.currentPassword !== 'password123') {
          reject(new Error('Current password is incorrect'));
          return;
        }
        if (data.newPassword.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }
        if (data.newPassword !== data.confirmPassword) {
          reject(new Error('New passwords do not match'));
          return;
        }
        // ✅ خزن الباسورد الجديد في localStorage
        localStorage.setItem('medical_password', data.newPassword);
        resolve({ message: 'Password updated successfully' });
      }, 200);
    });
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const avatarUrl = reader.result as string;
          const current = getFromStorage(STORAGE_KEYS.PROFILE, defaultProfile);
          current.avatar = avatarUrl;
          setToStorage(STORAGE_KEYS.PROFILE, current);
          resolve({ avatarUrl });
        };
        reader.readAsDataURL(file);
      }, 500);
    });
  },

  // ✅ Notification Settings
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const settings = getFromStorage(STORAGE_KEYS.NOTIFICATIONS, defaultNotificationSettings);
        resolve(settings);
      }, 200);
    });
  },

  updateNotificationSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setToStorage(STORAGE_KEYS.NOTIFICATIONS, settings);
        resolve(settings);
      }, 200);
    });
  },

  // ✅ Theme Settings
  getThemeSettings: async (): Promise<ThemeSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const settings = getFromStorage(STORAGE_KEYS.THEME, defaultThemeSettings);
        resolve(settings);
      }, 200);
    });
  },

  updateThemeSettings: async (settings: ThemeSettings): Promise<ThemeSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setToStorage(STORAGE_KEYS.THEME, settings);
        resolve(settings);
      }, 200);
    });
  },

  // ✅ Inventory Settings
  getInventorySettings: async (): Promise<InventorySettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const settings = getFromStorage(STORAGE_KEYS.INVENTORY, defaultInventorySettings);
        resolve(settings);
      }, 200);
    });
  },

  updateInventorySettings: async (settings: InventorySettings): Promise<InventorySettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setToStorage(STORAGE_KEYS.INVENTORY, settings);
        resolve(settings);
      }, 200);
    });
  },

  // ✅ Preferences
  getPreferences: async (): Promise<Preferences> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const preferences = getFromStorage(STORAGE_KEYS.PREFERENCES, defaultPreferences);
        resolve(preferences);
      }, 200);
    });
  },

  updatePreferences: async (preferences: Preferences): Promise<Preferences> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setToStorage(STORAGE_KEYS.PREFERENCES, preferences);
        resolve(preferences);
      }, 200);
    });
  },
};