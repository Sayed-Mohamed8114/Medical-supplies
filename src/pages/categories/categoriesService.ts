import { Category, CreateCategoryDTO, UpdateCategoryDTO } from './categories.types';

// Mock Categories with item counts
const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'Analgesics',
    description: 'Pain relievers and fever reducers',
    itemCount: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat2',
    name: 'Antibiotics',
    description: 'Medications used to treat bacterial infections',
    itemCount: 32,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat3',
    name: 'Diabetes Care',
    description: 'Products for diabetes management',
    itemCount: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat4',
    name: 'Cardiovascular',
    description: 'Heart and blood pressure medications',
    itemCount: 27,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat5',
    name: 'Respiratory',
    description: 'Asthma and breathing treatments',
    itemCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat6',
    name: 'Vitamins',
    description: 'Dietary supplements and vitamins',
    itemCount: 22,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const categoriesService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockCategories]);
      }, 400);
    });
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = mockCategories.find(c => c.id === id);
        resolve(category || null);
      }, 300);
    });
  },

  // Create new category
  createCategory: async (data: CreateCategoryDTO): Promise<Category> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCategory: Category = {
          id: `cat${Date.now()}`,
          name: data.name,
          description: data.description || '',
          itemCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockCategories.push(newCategory);
        resolve(newCategory);
      }, 500);
    });
  },

  // Update category
  updateCategory: async (data: UpdateCategoryDTO): Promise<Category> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCategories.findIndex(c => c.id === data.id);
        if (index === -1) {
          reject(new Error('Category not found'));
          return;
        }
        
        const updatedCategory: Category = {
          ...mockCategories[index],
          name: data.name,
          description: data.description || '',
          updatedAt: new Date().toISOString(),
        };
        
        mockCategories[index] = updatedCategory;
        resolve(updatedCategory);
      }, 500);
    });
  },

  // Delete category
  deleteCategory: async (id: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCategories.findIndex(c => c.id === id);
        if (index === -1) {
          reject(new Error('Category not found'));
          return;
        }
        
        // Check if category has items
        if (mockCategories[index].itemCount > 0) {
          reject(new Error(`Cannot delete category with ${mockCategories[index].itemCount} items. Please reassign or delete the items first.`));
          return;
        }
        
        mockCategories.splice(index, 1);
        resolve({ success: true, message: 'Category deleted successfully' });
      }, 500);
    });
  },

  // Update item count for a category
  updateItemCount: async (categoryId: string, count: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = mockCategories.find(c => c.id === categoryId);
        if (category) {
          category.itemCount = count;
          category.updatedAt = new Date().toISOString();
        }
        resolve();
      }, 300);
    });
  },
};