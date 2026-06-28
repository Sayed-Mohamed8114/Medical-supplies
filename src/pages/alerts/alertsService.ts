import { Alert, CreateAlertDTO } from './alerts.types';
import { itemsService } from '../items/itemsService';

// ✅ Mock Alerts
let mockAlerts: Alert[] = [
  {
    id: 'alert1',
    type: 'LOW_STOCK',
    priority: 'HIGH',
    title: 'Low Stock Alert',
    message: 'Amoxicillin 250mg is running low. Only 75 units remaining.',
    itemId: '2',
    itemName: 'Amoxicillin 250mg',
    quantity: 75,
    reorderLevel: 100,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert2',
    type: 'OUT_OF_STOCK',
    priority: 'CRITICAL',
    title: 'Out of Stock',
    message: 'Insulin Injection is completely out of stock. Please reorder immediately.',
    itemId: '3',
    itemName: 'Insulin Injection',
    quantity: 0,
    reorderLevel: 20,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert3',
    type: 'EXPIRING_SOON',
    priority: 'MEDIUM',
    title: 'Expiring Soon',
    message: 'Albuterol Inhaler will expire in 15 days.',
    itemId: '5',
    itemName: 'Albuterol Inhaler',
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert4',
    type: 'INFO',
    priority: 'LOW',
    title: 'Stock Updated',
    message: 'Paracetamol 500mg stock has been updated to 450 units.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

// ✅ Check items and generate alerts automatically
export const checkAndGenerateAlerts = async (): Promise<Alert[]> => {
  const items = await itemsService.getItems();
  const newAlerts: Alert[] = [];

  items.forEach((item) => {
    // ✅ Low Stock Alert
    if (item.quantity <= item.reorderLevel && item.quantity > 0) {
      const existingAlert = mockAlerts.find(
        a => a.itemId === item.id && a.type === 'LOW_STOCK' && a.status === 'ACTIVE'
      );
      if (!existingAlert) {
        newAlerts.push({
          id: `alert${Date.now()}-${item.id}`,
          type: 'LOW_STOCK',
          priority: item.quantity === 0 ? 'CRITICAL' : 'HIGH',
          title: 'Low Stock Alert',
          message: `${item.name} is running low. Only ${item.quantity} units remaining.`,
          itemId: item.id,
          itemName: item.name,
          quantity: item.quantity,
          reorderLevel: item.reorderLevel,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        });
      }
    }

    // ✅ Out of Stock Alert
    if (item.quantity === 0) {
      const existingAlert = mockAlerts.find(
        a => a.itemId === item.id && a.type === 'OUT_OF_STOCK' && a.status === 'ACTIVE'
      );
      if (!existingAlert) {
        newAlerts.push({
          id: `alert${Date.now()}-${item.id}`,
          type: 'OUT_OF_STOCK',
          priority: 'CRITICAL',
          title: 'Out of Stock',
          message: `${item.name} is completely out of stock. Please reorder immediately.`,
          itemId: item.id,
          itemName: item.name,
          quantity: 0,
          reorderLevel: item.reorderLevel,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        });
      }
    }

    // ✅ Expiry Alert
    if (item.expiryDate) {
      const daysUntilExpiry = Math.ceil(
        (new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        const existingAlert = mockAlerts.find(
          a => a.itemId === item.id && a.type === 'EXPIRING_SOON' && a.status === 'ACTIVE'
        );
        if (!existingAlert) {
          newAlerts.push({
            id: `alert${Date.now()}-${item.id}`,
            type: 'EXPIRING_SOON',
            priority: daysUntilExpiry <= 7 ? 'HIGH' : 'MEDIUM',
            title: 'Expiring Soon',
            message: `${item.name} will expire in ${daysUntilExpiry} days.`,
            itemId: item.id,
            itemName: item.name,
            expiryDate: item.expiryDate,
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
          });
        }
      }
    }
  });

  // Add new alerts to mock
  mockAlerts = [...newAlerts, ...mockAlerts];

  return mockAlerts;
};

export const alertsService = {
  // ✅ Get all alerts
  getAlerts: async (): Promise<Alert[]> => {
    // Check for new alerts
    await checkAndGenerateAlerts();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockAlerts]);
      }, 300);
    });
  },

  // ✅ Get active alerts
  getActiveAlerts: async (): Promise<Alert[]> => {
    await checkAndGenerateAlerts();
    return new Promise((resolve) => {
      setTimeout(() => {
        const active = mockAlerts.filter(a => a.status === 'ACTIVE');
        resolve([...active]);
      }, 300);
    });
  },

  // ✅ Get alert by ID
  getAlertById: async (id: string): Promise<Alert | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const alert = mockAlerts.find(a => a.id === id);
        resolve(alert || null);
      }, 200);
    });
  },

  // ✅ Dismiss alert
  dismissAlert: async (id: string): Promise<Alert> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAlerts.findIndex(a => a.id === id);
        if (index === -1) {
          reject(new Error('Alert not found'));
          return;
        }
        mockAlerts[index] = {
          ...mockAlerts[index],
          status: 'DISMISSED',
          dismissedAt: new Date().toISOString(),
        };
        resolve(mockAlerts[index]);
      }, 300);
    });
  },

  // ✅ Resolve alert
  resolveAlert: async (id: string): Promise<Alert> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAlerts.findIndex(a => a.id === id);
        if (index === -1) {
          reject(new Error('Alert not found'));
          return;
        }
        mockAlerts[index] = {
          ...mockAlerts[index],
          status: 'RESOLVED',
          resolvedAt: new Date().toISOString(),
        };
        resolve(mockAlerts[index]);
      }, 300);
    });
  },

  // ✅ Create alert manually
  createAlert: async (data: CreateAlertDTO): Promise<Alert> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAlert: Alert = {
          id: `alert${Date.now()}`,
          ...data,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        };
        mockAlerts.unshift(newAlert);
        resolve(newAlert);
      }, 300);
    });
  },

  // ✅ Get alerts count
  getAlertsCount: async (): Promise<{ total: number; critical: number; lowStock: number; expiring: number }> => {
    await checkAndGenerateAlerts();
    const active = mockAlerts.filter(a => a.status === 'ACTIVE');
    return {
      total: active.length,
      critical: active.filter(a => a.priority === 'CRITICAL').length,
      lowStock: active.filter(a => a.type === 'LOW_STOCK' || a.type === 'OUT_OF_STOCK').length,
      expiring: active.filter(a => a.type === 'EXPIRING_SOON' || a.type === 'EXPIRED').length,
    };
  },
};