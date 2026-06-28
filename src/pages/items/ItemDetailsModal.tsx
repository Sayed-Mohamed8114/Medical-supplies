import React from 'react';
import { Item } from './items.types';
import { getStockStatusColor, getStockStatusText } from './itemsValidation';

interface ItemDetailsModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl z-10">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600 font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusColor(item.status)}`}>
                    {getStockStatusText(item.status)}
                  </span>
                  <span className="text-sm text-gray-500">SKU: {item.sku}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-medium">{item.category}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Supplier</p>
                <p className="font-medium">{item.supplier}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="font-medium">{item.quantity} {item.unit}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Unit Price</p>
                <p className="font-medium">${item.unitPrice.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Total Value</p>
                <p className="font-medium">${item.totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Reorder Level</p>
                <p className="font-medium">{item.reorderLevel}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium">{item.location}</p>
              </div>
              {item.expiryDate && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Expiry Date</p>
                  <p className="font-medium">{formatDate(item.expiryDate)}</p>
                </div>
              )}
            </div>

            {item.description && (
              <div className="mt-4">
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-sm text-gray-700 mt-1">{item.description}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
              <span>Created: {formatDate(item.createdAt)}</span>
              <span>Updated: {formatDate(item.updatedAt)}</span>
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

export default ItemDetailsModal;