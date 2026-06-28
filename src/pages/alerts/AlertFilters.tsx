import React from 'react';
import { AlertType, AlertPriority, AlertStatus } from './alerts.types';

interface AlertFiltersProps {
  filters: {
    type: string;
    priority: string;
    status: string;
    search: string;
  };
  onTypeChange: (type: string) => void;
  onPriorityChange: (priority: string) => void;
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

const AlertFilters: React.FC<AlertFiltersProps> = ({
  filters,
  onTypeChange,
  onPriorityChange,
  onStatusChange,
  onSearchChange,
  onClearFilters,
}) => {
  const types: { value: AlertType | ''; label: string }[] = [
    { value: '', label: 'All Types' },
    { value: 'LOW_STOCK', label: 'Low Stock' },
    { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
    { value: 'EXPIRING_SOON', label: 'Expiring Soon' },
    { value: 'INFO', label: 'Info' },
  ];

  const priorities: { value: AlertPriority | ''; label: string }[] = [
    { value: '', label: 'All Priorities' },
    { value: 'CRITICAL', label: 'Critical' },
    { value: 'HIGH', label: 'High' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Low' },
  ];

  const statuses: { value: AlertStatus | ''; label: string }[] = [
    { value: '', label: 'All Status' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'DISMISSED', label: 'Dismissed' },
    { value: 'RESOLVED', label: 'Resolved' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search alerts..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <select
            value={filters.type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {types.map((type) => (
              <option key={type.value || 'all'} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={filters.priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {priorities.map((priority) => (
              <option key={priority.value || 'all'} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={filters.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {statuses.map((status) => (
              <option key={status.value || 'all'} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;