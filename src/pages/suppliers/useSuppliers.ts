import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  fetchSuppliers,
  fetchSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  setSelectedSupplier,
  clearSelectedSupplier,
  setSearchFilter,
  setStatusFilter,
  clearFilters,
  setCurrentPage,
  clearError,
  clearSuccessMessage,
} from './suppliersSlice';
import {
  Supplier,
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from './suppliers.types';

export const useSuppliers = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    suppliers,
    selectedSupplier,
    isLoading,
    error,
    successMessage,
    pagination,
    filters,
  } = useSelector((state: RootState) => state.suppliers);

  const filteredSuppliers = useMemo(() => {
    let result = [...suppliers];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchLower) ||
          supplier.contactPerson.toLowerCase().includes(searchLower) ||
          supplier.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      result = result.filter((supplier) => supplier.status === filters.status);
    }

    return result;
  }, [suppliers, filters]);

  const paginatedSuppliers = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return filteredSuppliers.slice(start, end);
  }, [filteredSuppliers, pagination.currentPage, pagination.itemsPerPage]);

  const totalPages = Math.ceil(filteredSuppliers.length / pagination.itemsPerPage);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const loadSuppliers = useCallback(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const getSupplier = useCallback(
    (id: string) => {
      dispatch(fetchSupplierById(id));
    },
    [dispatch]
  );

  const handleCreateSupplier = useCallback(
    async (data: CreateSupplierDTO) => {
      const result = await dispatch(createSupplier(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleUpdateSupplier = useCallback(
    async (data: UpdateSupplierDTO) => {
      const result = await dispatch(updateSupplier(data)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleDeleteSupplier = useCallback(
    async (id: string) => {
      const result = await dispatch(deleteSupplier(id)).unwrap();
      return result;
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (search: string) => {
      dispatch(setSearchFilter(search));
    },
    [dispatch]
  );

  const handleStatusFilter = useCallback(
    (status: string) => {
      dispatch(setStatusFilter(status));
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

  const handleSelectSupplier = useCallback(
    (supplier: Supplier | null) => {
      if (supplier) {
        dispatch(setSelectedSupplier(supplier));
      } else {
        dispatch(clearSelectedSupplier());
      }
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  return {
    suppliers: paginatedSuppliers,
    allSuppliers: filteredSuppliers,
    selectedSupplier,
    isLoading,
    error,
    successMessage,
    pagination: {
      ...pagination,
      totalPages,
      totalItems: filteredSuppliers.length,
    },
    filters,
    
    loadSuppliers,
    getSupplier,
    createSupplier: handleCreateSupplier,
    updateSupplier: handleUpdateSupplier,
    deleteSupplier: handleDeleteSupplier,
    
    search: handleSearch,
    filterByStatus: handleStatusFilter,
    clearFilters: handleClearFilters,
    changePage: handlePageChange,
    selectSupplier: handleSelectSupplier,
    
    clearError: handleClearError,
    clearSuccess: handleClearSuccess,
  };
};