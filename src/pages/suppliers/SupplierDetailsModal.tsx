import React from 'react';
import { Supplier } from './suppliers.types';

interface SupplierDetailsModalProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
}

const SupplierDetailsModal: React.FC<SupplierDetailsModalProps> = ({
  supplier,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !supplier) return null;

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
            <h3 className="text-lg font-semibold text-gray-900">Supplier Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-green-600 font-bold">
                  {supplier.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{supplier.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    supplier.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {supplier.status}
                  </span>
                  <span className="text-sm text-gray-500">{supplier.itemCount} items</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Contact Person</p>
                <p className="font-medium">{supplier.contactPerson}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{supplier.email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{supplier.phone}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Tax ID</p>
                <p className="font-medium">{supplier.taxId || '—'}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-medium">
                {supplier.address}, {supplier.city}, {supplier.country} {supplier.postalCode}
              </p>
            </div>

            {supplier.website && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Website</p>
                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {supplier.website}
                </a>
              </div>
            )}

            {supplier.notes && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700">{supplier.notes}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-between text-xs text-gray-400">
              <span>Created: {formatDate(supplier.createdAt)}</span>
              <span>Updated: {formatDate(supplier.updatedAt)}</span>
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

export default SupplierDetailsModal;