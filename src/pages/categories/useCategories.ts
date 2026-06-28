import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  setSelectedCategory,
  clearSelectedCategory,
  setSearchFilter,
  clearFilters,
  setCurrentPage,
  clearError,
  clearSuccessMessage,
} from './categoriesSlice';
import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from './categories.types';

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    categories,
    selectedCategory,
    isLoading,
    error,
    successMessage,
    pagination,
    filters,
  } = useSelector((state: RootState) => state.categories);

  // Get filtered categories
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (category) =>
          category.name.toLowerCase().includes(searchLower) ||
          (category.description && category.description.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }, [categories, filters]);

  // Get paginated categories
  const paginatedCategories = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return filteredCategories.slice(start, end);
  }, [filteredCategories, pagination.currentPage, pagination.itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCategories.length / pagination.itemsPerPage);

  // Load data on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // CRUD Operations
  const loadCategories = useCallback(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getCategory = useCallback(
    (id: string) => {
      dispatch(fetchCategoryById(id));
    },
    [dispatch]
  );

  const handleCreateCategory = useCallback(
    async (data: CreateCategoryDTO) => {
      const result = await dispatch(createCategory(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleUpdateCategory = useCallback(
    async (data: UpdateCategoryDTO) => {
      const result = await dispatch(updateCategory(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      const result = await dispatch(deleteCategory(id)).unwrap();
      return result;
    },
    [dispatch]
  );

  // Filter operations
  const handleSearch = useCallback(
    (search: string) => {
      dispatch(setSearchFilter(search));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const handleSelectCategory = useCallback(
    (category: Category | null) => {
      if (category) {
        dispatch(setSelectedCategory(category));
      } else {
        dispatch(clearSelectedCategory());
      }
    },
    [dispatch]
  );

  // Clear messages
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  return {
    // State
    categories: paginatedCategories,
    allCategories: filteredCategories,
    selectedCategory,
    isLoading,
    error,
    successMessage,
    pagination: {
      ...pagination,
      totalPages,
      totalItems: filteredCategories.length,
    },
    filters,
    
    // Actions
    loadCategories,
    getCategory,
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    
    // Filter Actions
    search: handleSearch,
    clearFilters: handleClearFilters,
    changePage: handlePageChange,
    selectCategory: handleSelectCategory,
    
    // Clear Actions
    clearError: handleClearError,
    clearSuccess: handleClearSuccess,
  };
};