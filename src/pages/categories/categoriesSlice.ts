import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesState, CreateCategoryDTO, UpdateCategoryDTO } from './categories.types';
import { categoriesService } from './categoriesService';

const initialState: CategoriesState = {
  categories: [],
  selectedCategory: null,
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
  },
};

// Async Thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await categoriesService.getCategories();
    return response;
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id: string) => {
    const response = await categoriesService.getCategoryById(id);
    if (!response) {
      throw new Error('Category not found');
    }
    return response;
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (data: CreateCategoryDTO, { rejectWithValue }) => {
    try {
      const response = await categoriesService.createCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (data: UpdateCategoryDTO, { rejectWithValue }) => {
    try {
      const response = await categoriesService.updateCategory(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await categoriesService.deleteCategory(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = { search: '' };
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
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      // Fetch Category By ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Category not found';
      })
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.unshift(action.payload);
        state.pagination.totalItems = state.categories.length;
        state.successMessage = 'Category created successfully';
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.selectedCategory = action.payload;
        state.successMessage = 'Category updated successfully';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(c => c.id !== action.payload.id);
        state.pagination.totalItems = state.categories.length;
        state.selectedCategory = null;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedCategory,
  clearSelectedCategory,
  setSearchFilter,
  clearFilters,
  setCurrentPage,
  clearError,
  clearSuccessMessage,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;