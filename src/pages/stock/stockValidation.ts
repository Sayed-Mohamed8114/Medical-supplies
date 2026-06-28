export interface StockInErrors {
  itemId?: string;
  quantity?: string;
  unitPrice?: string;
}

export interface StockOutErrors {
  itemId?: string;
  quantity?: string;
}

export const validateStockIn = (data: {
  itemId: string;
  quantity: number;
  unitPrice: number;
}): StockInErrors => {
  const errors: StockInErrors = {};

  if (!data.itemId) {
    errors.itemId = 'Please select an item';
  }

  if (!data.quantity || data.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }

  if (!data.unitPrice || data.unitPrice < 0) {
    errors.unitPrice = 'Unit price must be greater than or equal to 0';
  }

  return errors;
};

export const validateStockOut = (data: {
  itemId: string;
  quantity: number;
  currentQuantity: number;
}): StockOutErrors => {
  const errors: StockOutErrors = {};

  if (!data.itemId) {
    errors.itemId = 'Please select an item';
  }

  if (!data.quantity || data.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }

  if (data.quantity > data.currentQuantity) {
    errors.quantity = `Cannot withdraw ${data.quantity} items. Only ${data.currentQuantity} available`;
  }

  return errors;
};