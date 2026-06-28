import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ItemsState, CreateItemDTO, UpdateItemDTO } from './items.types';
import { itemsService } from './itemsService';

const initialState: ItemsState = {
  items: [],
  selectedItem: null,
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
    category: '',
    status: '',
  },
  categories: [],
  suppliers: [],
};

// Async Thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await itemsService.getItems();
    return response;
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: string) => {
    const response = await itemsService.getItemById(id);
    if (!response) {
      throw new Error('Item not found');
    }
    return response;
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (data: CreateItemDTO, { rejectWithValue }) => {
    try {
      const response = await itemsService.createItem(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (data: UpdateItemDTO, { rejectWithValue }) => {
    try {
      const response = await itemsService.updateItem(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await itemsService.deleteItem(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'items/fetchCategories',
  async () => {
    const response = await itemsService.getCategories();
    return response;
  }
);

export const fetchSuppliers = createAsyncThunk(
  'items/fetchSuppliers',
  async () => {
    const response = await itemsService.getSuppliers();
    return response;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
      state.pagination.currentPage = 1;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = { search: '', category: '', status: '' };
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
      // Fetch Items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage);
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch items';
      })
      // Fetch Item By ID
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Item not found';
      })
      // Create Item
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        state.pagination.totalItems = state.items.length;
        state.successMessage = 'Item created successfully';
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Item
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedItem = action.payload;
        state.successMessage = 'Item updated successfully';
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Item
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(i => i.id !== action.payload.id);
        state.pagination.totalItems = state.items.length;
        state.selectedItem = null;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Fetch Suppliers
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
      });
  },
});

export const {
  setSelectedItem,
  clearSelectedItem,
  setSearchFilter,
  setCategoryFilter,
  setStatusFilter,
  clearFilters,
  setCurrentPage,
  clearError,
  clearSuccessMessage,
} = itemsSlice.actions;

export default itemsSlice.reducer;