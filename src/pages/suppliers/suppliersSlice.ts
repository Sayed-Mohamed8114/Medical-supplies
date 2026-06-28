import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SuppliersState, CreateSupplierDTO, UpdateSupplierDTO } from './suppliers.types';
import { suppliersService } from './suppliersService';

const initialState: SuppliersState = {
  suppliers: [],
  selectedSupplier: null,
  isLoading: false,
  error: null,
  successMessage: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  filters: {
    search: '',
    status: '',
  },
};

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async () => {
    const response = await suppliersService.getSuppliers();
    return response;
  }
);

export const fetchSupplierById = createAsyncThunk(
  'suppliers/fetchSupplierById',
  async (id: string) => {
    const response = await suppliersService.getSupplierById(id);
    if (!response) {
      throw new Error('Supplier not found');
    }
    return response;
  }
);

export const createSupplier = createAsyncThunk(
  'suppliers/createSupplier',
  async (data: CreateSupplierDTO, { rejectWithValue }) => {
    try {
      const response = await suppliersService.createSupplier(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  'suppliers/updateSupplier',
  async (data: UpdateSupplierDTO, { rejectWithValue }) => {
    try {
      const response = await suppliersService.updateSupplier(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await suppliersService.deleteSupplier(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setSelectedSupplier: (state, action) => {
      state.selectedSupplier = action.payload;
    },
    clearSelectedSupplier: (state) => {
      state.selectedSupplier = null;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = { search: '', status: '' };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage);
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch suppliers';
      })
      .addCase(fetchSupplierById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedSupplier = action.payload;
      })
      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Supplier not found';
      })
      .addCase(createSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers.unshift(action.payload);
        state.pagination.totalItems = state.suppliers.length;
        state.successMessage = 'Supplier created successfully';
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.suppliers.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
        state.selectedSupplier = action.payload;
        state.successMessage = 'Supplier updated successfully';
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = state.suppliers.filter(s => s.id !== action.payload.id);
        state.pagination.totalItems = state.suppliers.length;
        state.selectedSupplier = null;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedSupplier,
  clearSelectedSupplier,
  setSearchFilter,
  setStatusFilter,
  clearFilters,
  setCurrentPage,
  clearError,
  clearSuccessMessage,
} = suppliersSlice.actions;

export default suppliersSlice.reducer;