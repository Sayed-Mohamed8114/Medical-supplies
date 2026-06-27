const TOKEN_KEY = 'medical_inventory_token';
const USER_KEY = 'medical_inventory_user';

export const tokenUtils = {
  // Token functions
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // User functions
  setUser: (user: unknown): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): unknown | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Clear all
  clearAll: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check if token exists
  hasToken: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Check if user exists
  hasUser: (): boolean => {
    return !!localStorage.getItem(USER_KEY);
  },
};