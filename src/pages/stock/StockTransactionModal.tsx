import React from 'react';
import { StockTransaction } from './stock.types';

interface StockTransactionModalProps {
  transaction: StockTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const StockTransactionModal: React.FC<StockTransactionModalProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl z-10">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                transaction.type === 'IN' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  transaction.type === 'IN' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'IN' ? '+' : '-'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{transaction.itemName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                  <span className="text-sm text-gray-500">SKU: {transaction.sku}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Type</p>
                <p className={`font-bold ${transaction.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'IN' ? 'Stock IN' : 'Stock OUT'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="font-medium">{transaction.quantity} {transaction.unit}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Unit Price</p>
                <p className="font-medium">${transaction.unitPrice.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Total Price</p>
                <p className="font-medium">${transaction.totalPrice.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Before</p>
                <p className="font-medium">{transaction.previousQuantity} {transaction.unit}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">After</p>
                <p className="font-medium">{transaction.newQuantity} {transaction.unit}</p>
              </div>
              {transaction.reference && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Reference</p>
                  <p className="font-medium">{transaction.reference}</p>
                </div>
              )}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Created By</p>
                <p className="font-medium">{transaction.createdByName}</p>
              </div>
            </div>

            {transaction.notes && (
              <div className="mt-4">
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700 mt-1">{transaction.notes}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
              <span>Created: {formatDate(transaction.createdAt)}</span>
              <span>Updated: {formatDate(transaction.updatedAt)}</span>
            </div>

            <div className="mt-4">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransactionModal;