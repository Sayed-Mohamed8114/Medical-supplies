export type AlertType = 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRING_SOON' | 'EXPIRED' | 'INFO' | 'WARNING';
export type AlertPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type AlertStatus = 'ACTIVE' | 'DISMISSED' | 'RESOLVED';

export interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  message: string;
  itemId?: string;
  itemName?: string;
  quantity?: number;
  reorderLevel?: number;
  expiryDate?: string;
  status: AlertStatus;
  createdAt: string;
  dismissedAt?: string;
  resolvedAt?: string;
}

export interface AlertsState {
  alerts: Alert[];
  activeAlerts: Alert[];
  dismissedAlerts: Alert[];
  resolvedAlerts: Alert[];
  isLoading: boolean;
  error: string | null;
  filters: {
    type: string;
    priority: string;
    status: string;
    search: string;
  };
}

export interface CreateAlertDTO {
  type: AlertType;
  priority: AlertPriority;
  title: string;
  message: string;
  itemId?: string;
  itemName?: string;
  quantity?: number;
  reorderLevel?: number;
  expiryDate?: string;
}