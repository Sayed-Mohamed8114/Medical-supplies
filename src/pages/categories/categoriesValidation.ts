export interface CategoryErrors {
  name?: string;
  description?: string;
}

export const validateCategory = (data: {
  name: string;
  description?: string;
}): CategoryErrors => {
  const errors: CategoryErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Category name must be at least 2 characters';
  }

  if (data.name && data.name.length > 50) {
    errors.name = 'Category name must be less than 50 characters';
  }

  if (data.description && data.description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }

  return errors;
};