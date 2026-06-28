import React, { useState, useEffect } from 'react';
import { useAlerts } from './useAlerts';
import AlertCard from './AlertCard';
import AlertFilters from './AlertFilters';

type ShowStatusType = 'active' | 'dismissed' | 'resolved' | 'all';

const AlertsPage: React.FC = () => {
  const {
    filteredAlerts,
    activeAlerts,
    dismissedAlerts,
    resolvedAlerts,
    isLoading,
    error,
    filters,
    dismissAlert,
    resolveAlert,
    loadAlerts,
    filterByType,
    filterByPriority,
    filterByStatus,
    search,
    clearFilters,
    clearError,
  } = useAlerts();

  const [showStatus, setShowStatus] = useState<ShowStatusType>('active');

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const getStatusCount = () => {
    return {
      active: activeAlerts.length,
      dismissed: dismissedAlerts.length,
      resolved: resolvedAlerts.length,
      total: activeAlerts.length + dismissedAlerts.length + resolvedAlerts.length,
    };
  };

  const statusCount = getStatusCount();

  const getDisplayAlerts = () => {
    switch (showStatus) {
      case 'active':
        return filteredAlerts;
      case 'dismissed':
        return dismissedAlerts;
      case 'resolved':
        return resolvedAlerts;
      default:
        return filteredAlerts;
    }
  };

  const displayAlerts = getDisplayAlerts();

  const tabs: { id: ShowStatusType; label: string; count: number }[] = [
    { id: 'active', label: 'Active', count: statusCount.active },
    { id: 'dismissed', label: 'Dismissed', count: statusCount.dismissed },
    { id: 'resolved', label: 'Resolved', count: statusCount.resolved },
    { id: 'all', label: 'All', count: statusCount.total },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Alerts & Notifications</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor and manage system alerts</p>
            </div>
            <div className="flex items-center gap-4">
              {statusCount.active > 0 && (
                <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full">
                  {statusCount.active} Active
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <AlertFilters
          filters={filters}
          onTypeChange={filterByType}
          onPriorityChange={filterByPriority}
          onStatusChange={filterByStatus}
          onSearchChange={search}
          onClearFilters={clearFilters}
        />

        {/* Status Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setShowStatus(tab.id)}
                  className={`py-3 px-6 border-b-2 font-medium text-sm transition-colors ${
                    showStatus === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Alerts List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : displayAlerts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No alerts found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">All clear! No alerts match your criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={dismissAlert}
                onResolve={resolveAlert}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;