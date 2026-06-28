import { 
  StockTransaction, 
  StockInDTO, 
  StockOutDTO 
} from './stock.types';

// Mock Items for reference
const mockItems = [
  { id: '1', name: 'Paracetamol 500mg', sku: 'MED-001', quantity: 450, unit: 'Tablets', unitPrice: 0.05 },
  { id: '2', name: 'Amoxicillin 250mg', sku: 'MED-002', quantity: 75, unit: 'Capsules', unitPrice: 0.12 },
  { id: '3', name: 'Insulin Injection', sku: 'MED-003', quantity: 0, unit: 'Vials', unitPrice: 25.0 },
  { id: '4', name: 'Lisinopril 10mg', sku: 'MED-004', quantity: 200, unit: 'Tablets', unitPrice: 0.15 },
  { id: '5', name: 'Albuterol Inhaler', sku: 'MED-005', quantity: 30, unit: 'Inhalers', unitPrice: 8.5 },
];

const mockTransactions: StockTransaction[] = [
  {
    id: 't1',
    itemId: '1',
    itemName: 'Paracetamol 500mg',
    sku: 'MED-001',
    type: 'IN',
    quantity: 100,
    previousQuantity: 350,
    newQuantity: 450,
    unit: 'Tablets',
    unitPrice: 0.05,
    totalPrice: 5.0,
    reference: 'PO-001',
    notes: 'Restock from supplier',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'user1',
    createdByName: 'Admin User',
  },
  {
    id: 't2',
    itemId: '2',
    itemName: 'Amoxicillin 250mg',
    sku: 'MED-002',
    type: 'OUT',
    quantity: 25,
    previousQuantity: 100,
    newQuantity: 75,
    unit: 'Capsules',
    unitPrice: 0.12,
    totalPrice: 3.0,
    reference: 'RX-001',
    notes: 'Patient order',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'user1',
    createdByName: 'Admin User',
  },
  {
    id: 't3',
    itemId: '3',
    itemName: 'Insulin Injection',
    sku: 'MED-003',
    type: 'IN',
    quantity: 50,
    previousQuantity: 0,
    newQuantity: 50,
    unit: 'Vials',
    unitPrice: 25.0,
    totalPrice: 1250,
    reference: 'PO-002',
    notes: 'Emergency restock',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user1',
    createdByName: 'Admin User',
  },
];

// Helper to find item and update quantity
const updateItemQuantity = (itemId: string, newQuantity: number) => {
  const item = mockItems.find(i => i.id === itemId);
  if (item) {
    item.quantity = newQuantity;
  }
};

export const stockService = {
  // Get all transactions
  getTransactions: async (): Promise<StockTransaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockTransactions]);
      }, 400);
    });
  },

  // Get transaction by ID
  getTransactionById: async (id: string): Promise<StockTransaction | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction = mockTransactions.find(t => t.id === id);
        resolve(transaction || null);
      }, 300);
    });
  },

  // Stock IN
  stockIn: async (data: StockInDTO): Promise<StockTransaction> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = mockItems.find(i => i.id === data.itemId);
        if (!item) {
          reject(new Error('Item not found'));
          return;
        }

        const previousQuantity = item.quantity;
        const newQuantity = previousQuantity + data.quantity;

        const transaction: StockTransaction = {
          id: `t${Date.now()}`,
          itemId: item.id,
          itemName: item.name,
          sku: item.sku,
          type: 'IN',
          quantity: data.quantity,
          previousQuantity,
          newQuantity,
          unit: item.unit,
          unitPrice: data.unitPrice,
          totalPrice: data.quantity * data.unitPrice,
          reference: data.reference || '',
          notes: data.notes || '',
          status: 'COMPLETED',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'user1',
          createdByName: 'Current User',
        };

        // Update item quantity
        updateItemQuantity(item.id, newQuantity);
        mockTransactions.unshift(transaction);

        resolve(transaction);
      }, 600);
    });
  },

  // Stock OUT
  stockOut: async (data: StockOutDTO): Promise<StockTransaction> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = mockItems.find(i => i.id === data.itemId);
        if (!item) {
          reject(new Error('Item not found'));
          return;
        }

        if (item.quantity < data.quantity) {
          reject(new Error(`Insufficient quantity. Available: ${item.quantity}`));
          return;
        }

        const previousQuantity = item.quantity;
        const newQuantity = previousQuantity - data.quantity;

        const transaction: StockTransaction = {
          id: `t${Date.now()}`,
          itemId: item.id,
          itemName: item.name,
          sku: item.sku,
          type: 'OUT',
          quantity: data.quantity,
          previousQuantity,
          newQuantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          totalPrice: data.quantity * item.unitPrice,
          reference: data.reference || '',
          notes: data.notes || '',
          status: 'COMPLETED',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'user1',
          createdByName: 'Current User',
        };

        // Update item quantity
        updateItemQuantity(item.id, newQuantity);
        mockTransactions.unshift(transaction);

        resolve(transaction);
      }, 600);
    });
  },

  // Get current stock for item
  getCurrentStock: async (itemId: string): Promise<{ quantity: number }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = mockItems.find(i => i.id === itemId);
        if (!item) {
          reject(new Error('Item not found'));
          return;
        }
        resolve({ quantity: item.quantity });
      }, 300);
    });
  },

  // Get all items for dropdown
  getItemsForDropdown: async (): Promise<{ id: string; name: string; sku: string; quantity: number; unit: string }[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockItems]);
      }, 300);
    });
  },
};