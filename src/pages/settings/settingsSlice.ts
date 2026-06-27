import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  SettingsState, 
  UpdateProfileData, 
  PasswordUpdateData,
  NotificationSettings,
  ThemeSettings,
  InventorySettings,
  Preferences 
} from './settings.types';
import { settingsService } from './settingsService';

const initialState: SettingsState = {
  profile: null,
  notificationSettings: {
    emailNotifications: true,
    lowStockAlerts: true,
    expiryAlerts: true,
    newUserAlerts: false,
    reportAlerts: true,
    pushNotifications: false,
    smsNotifications: false,
  },
  themeSettings: {
    theme: 'light',
    sidebarCollapsed: false,
    fontSize: 'medium',
    compactView: false,
  },
  inventorySettings: {
    defaultLowStockThreshold: 50,
    defaultExpiryWarningDays: 30,
    autoReorder: false,
    autoReorderQuantity: 100,
    defaultUnit: 'pcs',
    currency: 'USD',
    taxRate: 0,
  },
  preferences: {
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    firstDayOfWeek: 1,
  },
  isLoading: false,
  error: null,
  successMessage: null,
};

// Async Thunks
export const fetchProfile = createAsyncThunk(
  'settings/fetchProfile',
  async () => {
    const response = await settingsService.getProfile();
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  'settings/updateProfile',
  async (data: UpdateProfileData) => {
    const response = await settingsService.updateProfile(data);
    return response;
  }
);

export const updatePassword = createAsyncThunk(
  'settings/updatePassword',
  async (data: PasswordUpdateData, { rejectWithValue }) => {
    try {
      const response = await settingsService.updatePassword(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'settings/uploadAvatar',
  async (file: File) => {
    const response = await settingsService.uploadAvatar(file);
    return response;
  }
);

export const fetchNotificationSettings = createAsyncThunk(
  'settings/fetchNotificationSettings',
  async () => {
    const response = await settingsService.getNotificationSettings();
    return response;
  }
);

export const updateNotificationSettings = createAsyncThunk(
  'settings/updateNotificationSettings',
  async (settings: NotificationSettings) => {
    const response = await settingsService.updateNotificationSettings(settings);
    return response;
  }
);

export const fetchThemeSettings = createAsyncThunk(
  'settings/fetchThemeSettings',
  async () => {
    const response = await settingsService.getThemeSettings();
    return response;
  }
);

export const updateThemeSettings = createAsyncThunk(
  'settings/updateThemeSettings',
  async (settings: ThemeSettings) => {
    const response = await settingsService.updateThemeSettings(settings);
    return response;
  }
);

export const fetchInventorySettings = createAsyncThunk(
  'settings/fetchInventorySettings',
  async () => {
    const response = await settingsService.getInventorySettings();
    return response;
  }
);

export const updateInventorySettings = createAsyncThunk(
  'settings/updateInventorySettings',
  async (settings: InventorySettings) => {
    const response = await settingsService.updateInventorySettings(settings);
    return response;
  }
);

export const fetchPreferences = createAsyncThunk(
  'settings/fetchPreferences',
  async () => {
    const response = await settingsService.getPreferences();
    return response;
  }
);

export const updatePreferences = createAsyncThunk(
  'settings/updatePreferences',
  async (preferences: Preferences) => {
    const response = await settingsService.updatePreferences(preferences);
    return response;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.successMessage = 'Profile updated successfully';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Upload Avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile) {
          state.profile.avatar = action.payload.avatarUrl;
        }
        state.successMessage = 'Avatar uploaded successfully';
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to upload avatar';
      })
      // Notification Settings
      .addCase(fetchNotificationSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotificationSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationSettings = action.payload;
      })
      .addCase(fetchNotificationSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch notification settings';
      })
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.notificationSettings = action.payload;
        state.successMessage = 'Notification settings updated';
      })
      // Theme Settings
      .addCase(fetchThemeSettings.fulfilled, (state, action) => {
        state.themeSettings = action.payload;
      })
      .addCase(updateThemeSettings.fulfilled, (state, action) => {
        state.themeSettings = action.payload;
        state.successMessage = 'Theme settings updated';
      })
      // Inventory Settings
      .addCase(fetchInventorySettings.fulfilled, (state, action) => {
        state.inventorySettings = action.payload;
      })
      .addCase(updateInventorySettings.fulfilled, (state, action) => {
        state.inventorySettings = action.payload;
        state.successMessage = 'Inventory settings updated';
      })
      // Preferences
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
        state.successMessage = 'Preferences updated';
      });
  },
});

export const { clearError, clearSuccessMessage } = settingsSlice.actions;
export default settingsSlice.reducer;