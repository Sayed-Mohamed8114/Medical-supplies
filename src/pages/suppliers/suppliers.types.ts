export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  taxId?: string;
  website?: string;
  notes?: string;
  itemCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierDTO {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  taxId?: string;
  website?: string;
  notes?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateSupplierDTO extends Partial<CreateSupplierDTO> {
  id: string;
}

export interface SuppliersState {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  filters: {
    search: string;
    status: string;
  };
}