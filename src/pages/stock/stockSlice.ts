import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StockState, StockInDTO, StockOutDTO } from './stock.types';
import { stockService } from './stockService';

const initialState: StockState = {
  transactions: [],
  selectedTransaction: null,
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
    type: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  },
  currentStock: [],
};

// Async Thunks
export const fetchTransactions = createAsyncThunk(
  'stock/fetchTransactions',
  async () => {
    const response = await stockService.getTransactions();
    return response;
  }
);

export const fetchTransactionById = createAsyncThunk(
  'stock/fetchTransactionById',
  async (id: string) => {
    const response = await stockService.getTransactionById(id);
    if (!response) {
      throw new Error('Transaction not found');
    }
    return response;
  }
);

export const stockIn = createAsyncThunk(
  'stock/stockIn',
  async (data: StockInDTO, { rejectWithValue }) => {
    try {
      const response = await stockService.stockIn(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const stockOut = createAsyncThunk(
  'stock/stockOut',
  async (data: StockOutDTO, { rejectWithValue }) => {
    try {
      const response = await stockService.stockOut(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchItemsForDropdown = createAsyncThunk(
  'stock/fetchItemsForDropdown',
  async () => {
    const response = await stockService.getItemsForDropdown();
    return response;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload;
      state.pagination.currentPage = 1;
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
    },
    setDateFromFilter: (state, action) => {
      state.filters.dateFrom = action.payload;
      state.pagination.currentPage = 1;
    },
    setDateToFilter: (state, action) => {
      state.filters.dateTo = action.payload;
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        type: '',
        status: '',
        dateFrom: '',
        dateTo: '',
      };
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
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(fetchTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Transaction not found';
      })
      .addCase(stockIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(stockIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.successMessage = 'Stock IN successful';
      })
      .addCase(stockIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(stockOut.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(stockOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.successMessage = 'Stock OUT successful';
      })
      .addCase(stockOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedTransaction,
  clearSelectedTransaction,
  setSearchFilter,
  setTypeFilter,
  setStatusFilter,
  setDateFromFilter,
  setDateToFilter,
  clearFilters,
  setCurrentPage,
  clearError,
  clearSuccessMessage,
} = stockSlice.actions;

export default stockSlice.reducer;