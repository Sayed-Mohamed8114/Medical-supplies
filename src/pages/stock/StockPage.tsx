import React, { useState, useEffect } from 'react';
import { useStock } from './useStock';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import StockInForm from './StockInForm';
import StockOutForm from './StockOutForm';
import StockHistoryTable from './StockHistoryTable';
import StockTransactionModal from './StockTransactionModal';
import { StockTransaction, StockInDTO, StockOutDTO } from './stock.types';

type TabType = 'in' | 'out' | 'history';

const StockPage: React.FC = () => {
  const {
    transactions,
    isLoading,
    error,
    successMessage,
    pagination,
    filters,
    stockIn,
    stockOut,
    search,
    filterByType,
    filterByStatus,
    filterByDateFrom,
    filterByDateTo,
    clearFilters,
    changePage,
    clearError,
    clearSuccess,
  } = useStock();

  const [activeTab, setActiveTab] = useState<TabType>('in');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [selectedTransactionForView, setSelectedTransactionForView] = useState<StockTransaction | null>(null);

  // Get items from stock slice and normalize to the form component item shape
  const items = useSelector((state: RootState) => state.stock.currentStock).map((stockItem) => ({
    id: stockItem.itemId,
    name: stockItem.itemId,
    sku: stockItem.itemId,
    quantity: stockItem.quantity,
    unit: 'pcs',
  }));

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => clearSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccess]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleView = (transaction: StockTransaction): void => {
    setSelectedTransactionForView(transaction);
    setShowDetailsModal(true);
  };

  const handleStockInSubmit = async (data: StockInDTO): Promise<void> => {
    await stockIn(data);
    setShowForm(false);
  };

  const handleStockOutSubmit = async (data: StockOutDTO): Promise<void> => {
    await stockOut(data);
    setShowForm(false);
  };

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
    setShowForm(false);
  };

  const handleCloseForm = (): void => {
    setShowForm(false);
  };

  const handleOpenForm = (): void => {
    setShowForm(true);
  };

  const handleCloseDetails = (): void => {
    setShowDetailsModal(false);
    setSelectedTransactionForView(null);
  };

  const statusOptions: string[] = ['PENDING', 'COMPLETED', 'CANCELLED'];
  const typeOptions: string[] = ['IN', 'OUT'];

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'in', label: 'Stock IN', icon: '📥' },
    { id: 'out', label: 'Stock OUT', icon: '📤' },
    { id: 'history', label: 'History', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Stock Management</h1>
              <p className="text-gray-500 mt-1">Manage inventory movements</p>
            </div>
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {activeTab === 'in' ? 'Add Stock IN' : activeTab === 'out' ? 'Add Stock OUT' : 'New Transaction'}
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
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stock IN Form */}
        {activeTab === 'in' && showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add Stock IN</h3>
            <StockInForm
              items={items}
              onSubmit={handleStockInSubmit}
              isLoading={isLoading}
              onCancel={handleCloseForm}
            />
          </div>
        )}

        {/* Stock OUT Form */}
        {activeTab === 'out' && showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Withdraw Stock OUT</h3>
            <StockOutForm
              items={items}
              onSubmit={handleStockOutSubmit}
              isLoading={isLoading}
              onCancel={handleCloseForm}
            />
          </div>
        )}

        {/* Filters - Show only on History tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Search by item or SKU..."
                  value={filters.search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={filters.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filterByType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
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
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterByDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Date From"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterByDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Date To"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* History Table - Show only on History tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <StockHistoryTable
              transactions={transactions}
              isLoading={isLoading}
              onView={handleView}
            />

            {pagination.totalPages > 1 && (
              <div className="px-6 py-3 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                  Showing {transactions.length} of {pagination.totalItems} transactions
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
        )}

        {/* Empty state for IN/OUT tabs when form is not shown */}
        {activeTab !== 'history' && !showForm && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">
              {activeTab === 'in' ? '📥' : '📤'}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {activeTab === 'in' ? 'Add Stock IN' : 'Withdraw Stock OUT'}
            </h3>
            <p className="text-gray-500 mb-4">
              {activeTab === 'in' 
                ? 'Click the button above to add new stock to your inventory.' 
                : 'Click the button above to withdraw stock from your inventory.'}
            </p>
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {activeTab === 'in' ? 'Add Stock IN' : 'Withdraw Stock OUT'}
            </button>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <StockTransactionModal
        transaction={selectedTransactionForView}
        isOpen={showDetailsModal}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default StockPage;