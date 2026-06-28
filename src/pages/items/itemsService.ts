import { Item, CreateItemDTO, UpdateItemDTO, Category, Supplier } from './items.types';
import { getStockStatus } from './itemsValidation';

// Mock Categories
const mockCategories: Category[] = [
  { id: 'cat1', name: 'Analgesics' },
  { id: 'cat2', name: 'Antibiotics' },
  { id: 'cat3', name: 'Diabetes Care' },
  { id: 'cat4', name: 'Cardiovascular' },
  { id: 'cat5', name: 'Respiratory' },
  { id: 'cat6', name: 'Vitamins' },
];

// Mock Suppliers
const mockSuppliers: Supplier[] = [
  { id: 'sup1', name: 'PharmaCorp' },
  { id: 'sup2', name: 'MediSource' },
  { id: 'sup3', name: 'LifeCare' },
  { id: 'sup4', name: 'HealthPlus' },
  { id: 'sup5', name: 'MediSupply' },
];

// Mock Items
const mockItems: Item[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    sku: 'MED-001',
    category: 'Analgesics',
    categoryId: 'cat1',
    quantity: 450,
    unit: 'Tablets',
    unitPrice: 0.05,
    totalValue: 22.5,
    reorderLevel: 100,
    location: 'Aisle A-1',
    supplier: 'PharmaCorp',
    supplierId: 'sup1',
    status: 'IN_STOCK',
    description: 'Pain reliever and fever reducer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    sku: 'MED-002',
    category: 'Antibiotics',
    categoryId: 'cat2',
    quantity: 75,
    unit: 'Capsules',
    unitPrice: 0.12,
    totalValue: 9.0,
    reorderLevel: 100,
    location: 'Aisle B-2',
    supplier: 'MediSource',
    supplierId: 'sup2',
    status: 'LOW_STOCK',
    description: 'Antibiotic for bacterial infections',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Insulin Injection',
    sku: 'MED-003',
    category: 'Diabetes Care',
    categoryId: 'cat3',
    quantity: 0,
    unit: 'Vials',
    unitPrice: 25.0,
    totalValue: 0,
    reorderLevel: 20,
    location: 'Fridge 2',
    supplier: 'LifeCare',
    supplierId: 'sup3',
    status: 'OUT_OF_STOCK',
    description: 'For diabetes management',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Lisinopril 10mg',
    sku: 'MED-004',
    category: 'Cardiovascular',
    categoryId: 'cat4',
    quantity: 200,
    unit: 'Tablets',
    unitPrice: 0.15,
    totalValue: 30.0,
    reorderLevel: 50,
    location: 'Aisle C-3',
    supplier: 'HealthPlus',
    supplierId: 'sup4',
    status: 'IN_STOCK',
    description: 'ACE inhibitor for hypertension',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Albuterol Inhaler',
    sku: 'MED-005',
    category: 'Respiratory',
    categoryId: 'cat5',
    quantity: 30,
    unit: 'Inhalers',
    unitPrice: 8.5,
    totalValue: 255,
    reorderLevel: 50,
    location: 'Aisle D-1',
    supplier: 'MediSupply',
    supplierId: 'sup5',
    status: 'LOW_STOCK',
    description: 'Bronchodilator for asthma',
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const itemsService = {
  // Get all items
  getItems: async (): Promise<Item[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockItems]);
      }, 500);
    });
  },

  // Get item by ID
  getItemById: async (id: string): Promise<Item | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockItems.find(i => i.id === id);
        resolve(item || null);
      }, 300);
    });
  },

  // Create new item
  createItem: async (data: CreateItemDTO): Promise<Item> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = mockCategories.find(c => c.id === data.categoryId);
        const supplier = mockSuppliers.find(s => s.id === data.supplierId);
        
        const newItem: Item = {
          id: Date.now().toString(),
          name: data.name,
          sku: data.sku,
          category: category?.name || 'Unknown',
          categoryId: data.categoryId,
          quantity: data.quantity,
          unit: data.unit,
          unitPrice: data.unitPrice,
          totalValue: data.quantity * data.unitPrice,
          reorderLevel: data.reorderLevel,
          location: data.location,
          supplier: supplier?.name || 'Unknown',
          supplierId: data.supplierId,
          status: getStockStatus(data.quantity, data.reorderLevel),
          description: data.description,
          expiryDate: data.expiryDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        mockItems.unshift(newItem);
        resolve(newItem);
      }, 600);
    });
  },

  // Update item
  updateItem: async (data: UpdateItemDTO): Promise<Item> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockItems.findIndex(i => i.id === data.id);
        if (index === -1) {
          reject(new Error('Item not found'));
          return;
        }
        
        const category = data.categoryId 
          ? mockCategories.find(c => c.id === data.categoryId)
          : null;
        const supplier = data.supplierId
          ? mockSuppliers.find(s => s.id === data.supplierId)
          : null;
        
        const updatedItem: Item = {
          ...mockItems[index],
          ...data,
          category: category?.name || mockItems[index].category,
          supplier: supplier?.name || mockItems[index].supplier,
          totalValue: (data.quantity || mockItems[index].quantity) * (data.unitPrice || mockItems[index].unitPrice),
          status: getStockStatus(
            data.quantity || mockItems[index].quantity,
            data.reorderLevel || mockItems[index].reorderLevel
          ),
          updatedAt: new Date().toISOString(),
        };
        
        mockItems[index] = updatedItem;
        resolve(updatedItem);
      }, 600);
    });
  },

  // Delete item
  deleteItem: async (id: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockItems.findIndex(i => i.id === id);
        if (index === -1) {
          reject(new Error('Item not found'));
          return;
        }
        mockItems.splice(index, 1);
        resolve({ success: true, message: 'Item deleted successfully' });
      }, 500);
    });
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockCategories]);
      }, 300);
    });
  },

  // Get suppliers
  getSuppliers: async (): Promise<Supplier[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSuppliers]);
      }, 300);
    });
  },
};