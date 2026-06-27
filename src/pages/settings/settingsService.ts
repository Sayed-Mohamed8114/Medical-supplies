import { 
  UserProfile, 
  UpdateProfileData, 
  PasswordUpdateData,
  NotificationSettings,
  ThemeSettings,
  InventorySettings,
  Preferences 
} from './settings.types';

// Mock user profile
let mockProfile: UserProfile = {
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

// Mock settings
let mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  lowStockAlerts: true,
  expiryAlerts: true,
  newUserAlerts: false,
  reportAlerts: true,
  pushNotifications: false,
  smsNotifications: false,
};

let mockThemeSettings: ThemeSettings = {
  theme: 'light',
  sidebarCollapsed: false,
  fontSize: 'medium',
  compactView: false,
};

let mockInventorySettings: InventorySettings = {
  defaultLowStockThreshold: 50,
  defaultExpiryWarningDays: 30,
  autoReorder: false,
  autoReorderQuantity: 100,
  defaultUnit: 'pcs',
  currency: 'USD',
  taxRate: 0,
};

let mockPreferences: Preferences = {
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
  firstDayOfWeek: 1,
};

export const settingsService = {
  // Profile
  getProfile: async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockProfile });
      }, 500);
    });
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockProfile = { ...mockProfile, ...data, updatedAt: new Date().toISOString() };
        resolve({ ...mockProfile });
      }, 500);
    });
  },

  updatePassword: async (data: PasswordUpdateData): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.currentPassword !== 'password123') {
          reject(new Error('Current password is incorrect'));
        } else if (data.newPassword.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
        } else if (data.newPassword !== data.confirmPassword) {
          reject(new Error('New passwords do not match'));
        } else {
          resolve({ message: 'Password updated successfully' });
        }
      }, 500);
    });
  },

  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(file);
        mockProfile.avatar = fakeUrl;
        resolve({ avatarUrl: fakeUrl });
      }, 800);
    });
  },

  // Notification Settings
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockNotificationSettings });
      }, 500);
    });
  },

  updateNotificationSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockNotificationSettings = { ...settings };
        resolve({ ...mockNotificationSettings });
      }, 500);
    });
  },

  // Theme Settings
  getThemeSettings: async (): Promise<ThemeSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockThemeSettings });
      }, 500);
    });
  },

  updateThemeSettings: async (settings: ThemeSettings): Promise<ThemeSettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockThemeSettings = { ...settings };
        resolve({ ...mockThemeSettings });
      }, 500);
    });
  },

  // Inventory Settings
  getInventorySettings: async (): Promise<InventorySettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockInventorySettings });
      }, 500);
    });
  },

  updateInventorySettings: async (settings: InventorySettings): Promise<InventorySettings> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockInventorySettings = { ...settings };
        resolve({ ...mockInventorySettings });
      }, 500);
    });
  },

  // Preferences
  getPreferences: async (): Promise<Preferences> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockPreferences });
      }, 500);
    });
  },

  updatePreferences: async (preferences: Preferences): Promise<Preferences> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPreferences = { ...preferences };
        resolve({ ...mockPreferences });
      }, 500);
    });
  },
};