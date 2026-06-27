export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  position: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  lowStockAlerts: boolean;
  expiryAlerts: boolean;
  newUserAlerts: boolean;
  reportAlerts: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface ThemeSettings {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  fontSize: 'small' | 'medium' | 'large';
  compactView: boolean;
}

export interface InventorySettings {
  defaultLowStockThreshold: number;
  defaultExpiryWarningDays: number;
  autoReorder: boolean;
  autoReorderQuantity: number;
  defaultUnit: string;
  currency: string;
  taxRate: number;
}

export interface Preferences {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  firstDayOfWeek: number;
}

export interface SettingsState {
  profile: UserProfile | null;
  notificationSettings: NotificationSettings;
  themeSettings: ThemeSettings;
  inventorySettings: InventorySettings;
  preferences: Preferences;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  bio?: string;
}