import { Supplier, CreateSupplierDTO, UpdateSupplierDTO } from './suppliers.types';

const mockSuppliers: Supplier[] = [
  {
    id: 'sup1',
    name: 'PharmaCorp International',
    contactPerson: 'Ahmed Hassan',
    email: 'info@pharmacorp.com',
    phone: '+1234567890',
    address: '123 Medical Street',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
    taxId: 'TAX-12345',
    website: 'https://pharmacorp.com',
    notes: 'Leading pharmaceutical supplier',
    itemCount: 45,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sup2',
    name: 'MediSource Solutions',
    contactPerson: 'Sara Mohamed',
    email: 'contact@medisource.com',
    phone: '+1234567891',
    address: '456 Healthcare Blvd',
    city: 'Los Angeles',
    country: 'USA',
    postalCode: '90001',
    taxId: 'TAX-67890',
    website: 'https://medisource.com',
    notes: 'Medical equipment and supplies',
    itemCount: 32,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sup3',
    name: 'LifeCare Medical',
    contactPerson: 'Omar Ali',
    email: 'info@lifecare.com',
    phone: '+1234567892',
    address: '789 Health Avenue',
    city: 'Chicago',
    country: 'USA',
    postalCode: '60601',
    taxId: 'TAX-24680',
    website: 'https://lifecare.com',
    notes: 'Specialized in diabetes care',
    itemCount: 18,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sup4',
    name: 'HealthPlus Distributors',
    contactPerson: 'Mona Ibrahim',
    email: 'sales@healthplus.com',
    phone: '+1234567893',
    address: '321 Wellness Road',
    city: 'Houston',
    country: 'USA',
    postalCode: '77001',
    taxId: 'TAX-13579',
    website: 'https://healthplus.com',
    notes: 'Pharmaceutical distribution',
    itemCount: 27,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sup5',
    name: 'MediSupply Co.',
    contactPerson: 'Khaled Ahmed',
    email: 'info@medisupply.com',
    phone: '+1234567894',
    address: '654 Commerce Street',
    city: 'Miami',
    country: 'USA',
    postalCode: '33101',
    taxId: 'TAX-97531',
    website: 'https://medisupply.com',
    notes: 'Medical supply chain solutions',
    itemCount: 15,
    status: 'inactive',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const suppliersService = {
  getSuppliers: async (): Promise<Supplier[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSuppliers]);
      }, 400);
    });
  },

  getSupplierById: async (id: string): Promise<Supplier | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const supplier = mockSuppliers.find(s => s.id === id);
        resolve(supplier || null);
      }, 300);
    });
  },

  createSupplier: async (data: CreateSupplierDTO): Promise<Supplier> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSupplier: Supplier = {
          id: `sup${Date.now()}`,
          ...data,
          itemCount: 0,
          status: data.status || 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockSuppliers.push(newSupplier);
        resolve(newSupplier);
      }, 500);
    });
  },

  updateSupplier: async (data: UpdateSupplierDTO): Promise<Supplier> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSuppliers.findIndex(s => s.id === data.id);
        if (index === -1) {
          reject(new Error('Supplier not found'));
          return;
        }
        
        const updatedSupplier: Supplier = {
          ...mockSuppliers[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        
        mockSuppliers[index] = updatedSupplier;
        resolve(updatedSupplier);
      }, 500);
    });
  },

  deleteSupplier: async (id: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSuppliers.findIndex(s => s.id === id);
        if (index === -1) {
          reject(new Error('Supplier not found'));
          return;
        }
        
        if (mockSuppliers[index].itemCount > 0) {
          reject(new Error(`Cannot delete supplier with ${mockSuppliers[index].itemCount} items. Please reassign or delete the items first.`));
          return;
        }
        
        mockSuppliers.splice(index, 1);
        resolve({ success: true, message: 'Supplier deleted successfully' });
      }, 500);
    });
  },
};