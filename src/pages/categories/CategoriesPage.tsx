import React, { useState, useEffect } from 'react';
import { useCategories } from './useCategories';
import CategoriesTable from './CategoriesTable';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from './categories.types';

const CategoriesPage: React.FC = () => {
  const {
    categories,
    selectedCategory,
    isLoading,
    error,
    successMessage,
    pagination,
    filters,
    createCategory,
    updateCategory,
    deleteCategory,
    search,
    clearFilters,
    changePage,
    selectCategory,
    clearError,
    clearSuccess,
  } = useCategories();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedCategoryForAction, setSelectedCategoryForAction] = useState<Category | null>(null);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccess]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleEdit = (category: Category): void => {
    setSelectedCategoryForAction(category);
    selectCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (category: Category): void => {
    setSelectedCategoryForAction(category);
    setShowDeleteModal(true);
  };

  const handleCreate = async (data: CreateCategoryDTO): Promise<void> => {
    await createCategory(data);
    setShowAddModal(false);
  };

  const handleUpdate = async (data: UpdateCategoryDTO): Promise<void> => {
    await updateCategory(data);
    setShowEditModal(false);
    selectCategory(null);
  };

  const handleDeleteConfirm = async (id: string): Promise<void> => {
    await deleteCategory(id);
    setShowDeleteModal(false);
    setSelectedCategoryForAction(null);
  };

  const handleCloseAddModal = (): void => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = (): void => {
    setShowEditModal(false);
    selectCategory(null);
  };

  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false);
    setSelectedCategoryForAction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
              <p className="text-gray-500 mt-1">Manage your product categories</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-green-700">{successMessage}</p>
            <button onClick={clearSuccess} className="text-green-500 hover:text-green-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <button onClick={clearError} className="text-red-500 hover:text-red-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search categories..."
                value={filters.search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div></div>
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <CategoriesTable
            categories={categories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-3 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                Showing {categories.length} of {pagination.totalItems} categories
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => changePage(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <span className="px-3 py-1 border rounded-md bg-purple-50 text-purple-600">
                  {pagination.currentPage} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => changePage(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseAddModal} />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md z-10">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
                <button onClick={handleCloseAddModal} className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <AddCategoryForm
                  onSubmit={handleCreate}
                  isLoading={isLoading}
                  onCancel={handleCloseAddModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      <EditCategoryModal
        category={selectedCategory}
        isOpen={showEditModal}
        onUpdate={handleUpdate}
        isLoading={isLoading}
        onClose={handleCloseEditModal}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        category={selectedCategoryForAction}
        isOpen={showDeleteModal}
        onDelete={handleDeleteConfirm}
        isLoading={isLoading}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default CategoriesPage;