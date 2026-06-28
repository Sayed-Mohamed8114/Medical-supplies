import React, { useState, useEffect } from 'react';
import { useItems } from './useItems';
import ItemsTable from './ItemsTable';
import AddItemForm from './AddItemForm';
import EditItemModal from './EditItemModal';
import DeleteItemModal from './DeleteItemModal';
import ItemDetailsModal from './ItemDetailsModal';
import { Item, CreateItemDTO, UpdateItemDTO } from './items.types';

const ItemsPage: React.FC = () => {
  const {
    items,
    selectedItem,
    isLoading,
    error,
    successMessage,
    pagination,
    filters,
    categories,
    suppliers,
    createItem,
    updateItem,
    deleteItem,
    search,
    filterByCategory,
    filterByStatus,
    clearFilters,
    changePage,
    selectItem,
    clearError,
    clearSuccess,
  } = useItems();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [selectedItemForAction, setSelectedItemForAction] = useState<Item | null>(null);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccess]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleView = (item: Item): void => {
    setSelectedItemForAction(item);
    setShowDetailsModal(true);
  };

  const handleEdit = (item: Item): void => {
    setSelectedItemForAction(item);
    selectItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item: Item): void => {
    setSelectedItemForAction(item);
    setShowDeleteModal(true);
  };

  const handleCreate = async (data: CreateItemDTO): Promise<void> => {
    await createItem(data);
    setShowAddModal(false);
  };

  const handleUpdate = async (data: UpdateItemDTO): Promise<void> => {
    await updateItem(data);
    setShowEditModal(false);
    selectItem(null);
  };

  const handleDeleteConfirm = async (id: string): Promise<void> => {
    await deleteItem(id);
    setShowDeleteModal(false);
    setSelectedItemForAction(null);
  };

  const handleCloseAddModal = (): void => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = (): void => {
    setShowEditModal(false);
    selectItem(null);
  };

  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false);
    setSelectedItemForAction(null);
  };

  const handleCloseDetailsModal = (): void => {
    setShowDetailsModal(false);
    setSelectedItemForAction(null);
  };

  // Status options for filter
  const statusOptions: string[] = ['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'EXPIRING_SOON'];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Items Management</h1>
              <p className="text-gray-500 mt-1">Manage your medical inventory items</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-green-700">{successMessage}</p>
            <button
              onClick={clearSuccess}
              className="text-green-500 hover:text-green-700"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700"
            >
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={filters.search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={filters.category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filterByCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filters.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filterByStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
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
          <ItemsTable
            items={items}
            isLoading={isLoading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-3 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                Showing {items.length} of {pagination.totalItems} items
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => changePage(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <span className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">
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

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50" 
              onClick={handleCloseAddModal} 
            />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl z-10">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Add New Item</h3>
                <button
                  onClick={handleCloseAddModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <AddItemForm
                  categories={categories}
                  suppliers={suppliers}
                  onSubmit={handleCreate}
                  isLoading={isLoading}
                  onCancel={handleCloseAddModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      <EditItemModal
        item={selectedItem}
        isOpen={showEditModal}
        categories={categories}
        suppliers={suppliers}
        onUpdate={handleUpdate}
        isLoading={isLoading}
        onClose={handleCloseEditModal}
      />

      {/* Delete Item Modal */}
      <DeleteItemModal
        item={selectedItemForAction}
        isOpen={showDeleteModal}
        onDelete={handleDeleteConfirm}
        isLoading={isLoading}
        onClose={handleCloseDeleteModal}
      />

      {/* Item Details Modal */}
      <ItemDetailsModal
        item={selectedItemForAction}
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
};

export default ItemsPage;