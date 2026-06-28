export interface SupplierErrors {
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  taxId?: string;
  website?: string;
}

export const validateSupplier = (data: {
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
}): SupplierErrors => {
  const errors: SupplierErrors = {};

  // Name
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Supplier name must be at least 2 characters';
  }

  // Contact Person
  if (!data.contactPerson || data.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Contact person name must be at least 2 characters';
  }

  // Email
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone
  if (!data.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Address
  if (!data.address || data.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters';
  }

  // City
  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  // Country
  if (!data.country || data.country.trim().length < 2) {
    errors.country = 'Country is required';
  }

  // Postal Code
  if (!data.postalCode || data.postalCode.trim().length < 3) {
    errors.postalCode = 'Postal code is required';
  }

  // Website (optional)
  if (data.website && !/^https?:\/\/.+/.test(data.website)) {
    errors.website = 'Please enter a valid URL (e.g., https://example.com)';
  }

  return errors;
};