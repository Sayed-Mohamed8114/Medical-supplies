import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import settingsReducer from '../pages/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;