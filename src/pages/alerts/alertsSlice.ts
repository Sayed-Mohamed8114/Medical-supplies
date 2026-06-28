import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AlertsState, CreateAlertDTO } from './alerts.types';
import { alertsService } from './alertsService';

const initialState: AlertsState = {
  alerts: [],
  activeAlerts: [],
  dismissedAlerts: [],
  resolvedAlerts: [],
  isLoading: false,
  error: null,
  filters: {
    type: '',
    priority: '',
    status: '',
    search: '',
  },
};

// Async Thunks
export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async () => {
    const response = await alertsService.getAlerts();
    return response;
  }
);

export const fetchActiveAlerts = createAsyncThunk(
  'alerts/fetchActiveAlerts',
  async () => {
    const response = await alertsService.getActiveAlerts();
    return response;
  }
);

export const dismissAlert = createAsyncThunk(
  'alerts/dismissAlert',
  async (id: string) => {
    const response = await alertsService.dismissAlert(id);
    return response;
  }
);

export const resolveAlert = createAsyncThunk(
  'alerts/resolveAlert',
  async (id: string) => {
    const response = await alertsService.resolveAlert(id);
    return response;
  }
);

export const createAlert = createAsyncThunk(
  'alerts/createAlert',
  async (data: CreateAlertDTO) => {
    const response = await alertsService.createAlert(data);
    return response;
  }
);

export const checkAlerts = createAsyncThunk(
  'alerts/checkAlerts',
  async () => {
    const response = await alertsService.getActiveAlerts();
    return response;
  }
);

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.filters.priority = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { type: '', priority: '', status: '', search: '' };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alerts = action.payload;
        state.activeAlerts = action.payload.filter(a => a.status === 'ACTIVE');
        state.dismissedAlerts = action.payload.filter(a => a.status === 'DISMISSED');
        state.resolvedAlerts = action.payload.filter(a => a.status === 'RESOLVED');
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch alerts';
      })
      .addCase(fetchActiveAlerts.fulfilled, (state, action) => {
        state.activeAlerts = action.payload;
      })
      .addCase(dismissAlert.fulfilled, (state, action) => {
        const index = state.alerts.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.alerts[index] = action.payload;
        }
        state.activeAlerts = state.alerts.filter(a => a.status === 'ACTIVE');
        state.dismissedAlerts = state.alerts.filter(a => a.status === 'DISMISSED');
      })
      .addCase(resolveAlert.fulfilled, (state, action) => {
        const index = state.alerts.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.alerts[index] = action.payload;
        }
        state.activeAlerts = state.alerts.filter(a => a.status === 'ACTIVE');
        state.resolvedAlerts = state.alerts.filter(a => a.status === 'RESOLVED');
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.alerts.unshift(action.payload);
        state.activeAlerts = state.alerts.filter(a => a.status === 'ACTIVE');
      })
      .addCase(checkAlerts.fulfilled, (state, action) => {
        state.activeAlerts = action.payload;
      });
  },
});

export const {
  setTypeFilter,
  setPriorityFilter,
  setStatusFilter,
  setSearchFilter,
  clearFilters,
  clearError,
} = alertsSlice.actions;

export default alertsSlice.reducer;