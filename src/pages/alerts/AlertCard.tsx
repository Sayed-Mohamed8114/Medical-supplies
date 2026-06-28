import React from 'react';
import { Alert } from './alerts.types';

interface AlertCardProps {
  alert: Alert;
  onDismiss: (id: string) => void;
  onResolve: (id: string) => void;
  isLoading: boolean;
}

const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onDismiss,
  onResolve,
  isLoading,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CRITICAL':
      case 'OUT_OF_STOCK':
        return '🔴';
      case 'HIGH':
      case 'LOW_STOCK':
        return '🟡';
      case 'MEDIUM':
      case 'EXPIRING_SOON':
        return '🟠';
      case 'INFO':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'HIGH':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'MEDIUM':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'LOW':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`border-l-4 p-4 rounded-r-lg shadow-sm ${getPriorityColor(alert.priority)} transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getTypeIcon(alert.type)}</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {alert.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{alert.message}</p>
          
          {alert.itemName && (
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Item: <strong className="text-gray-700 dark:text-gray-300">{alert.itemName}</strong></span>
              {alert.quantity !== undefined && (
                <span>Quantity: <strong className="text-gray-700 dark:text-gray-300">{alert.quantity}</strong></span>
              )}
              {alert.reorderLevel !== undefined && (
                <span>Reorder Level: <strong className="text-gray-700 dark:text-gray-300">{alert.reorderLevel}</strong></span>
              )}
            </div>
          )}
          
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {formatDate(alert.createdAt)}
          </p>
        </div>
        
        <div className="flex gap-2 ml-4">
          {alert.status === 'ACTIVE' && (
            <>
              <button
                onClick={() => onResolve(alert.id)}
                disabled={isLoading}
                className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                Resolve
              </button>
              <button
                onClick={() => onDismiss(alert.id)}
                disabled={isLoading}
                className="px-3 py-1 text-xs bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
              >
                Dismiss
              </button>
            </>
          )}
          {alert.status === 'DISMISSED' && (
            <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-md">Dismissed</span>
          )}
          {alert.status === 'RESOLVED' && (
            <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-md">Resolved</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;