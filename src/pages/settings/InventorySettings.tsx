import React, { useState } from 'react';
import { InventorySettings as InventorySettingsType } from './settings.types';

interface InventorySettingsProps {
  settings: InventorySettingsType;
  onUpdate: (settings: InventorySettingsType) => Promise<void>;
  isLoading: boolean;
}

const InventorySettings: React.FC<InventorySettingsProps> = ({
  settings,
  onUpdate,
  isLoading,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: keyof InventorySettingsType, value: InventorySettingsType[keyof InventorySettingsType]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await onUpdate(localSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setIsEditing(false);
  };

  const units = ['pcs', 'boxes', 'bottles', 'packs', 'vials', 'tablets', 'capsules'];
  const currencies = ['USD', 'EUR', 'GBP', 'EGP', 'AED', 'SAR'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Inventory Settings</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Low Stock Threshold
          </label>
          <input
            type="number"
            value={localSettings.defaultLowStockThreshold}
            onChange={(e) => handleChange('defaultLowStockThreshold', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          />
          <p className="mt-1 text-xs text-gray-500">Items below this quantity will show as low stock</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Expiry Warning Days
          </label>
          <input
            type="number"
            value={localSettings.defaultExpiryWarningDays}
            onChange={(e) => handleChange('defaultExpiryWarningDays', parseInt(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          />
          <p className="mt-1 text-xs text-gray-500">Show warning for items expiring within this many days</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Unit
          </label>
          <select
            value={localSettings.defaultUnit}
            onChange={(e) => handleChange('defaultUnit', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={localSettings.currency}
            onChange={(e) => handleChange('currency', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={localSettings.taxRate}
            onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-gray-800">Auto Reorder</p>
            <p className="text-sm text-gray-500">Automatically reorder when stock is low</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.autoReorder}
              onChange={(e) => handleChange('autoReorder', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${!isEditing && 'opacity-50'} ${localSettings.autoReorder ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          </label>
        </div>

        {localSettings.autoReorder && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Auto Reorder Quantity
            </label>
            <input
              type="number"
              value={localSettings.autoReorderQuantity}
              onChange={(e) => handleChange('autoReorderQuantity', parseInt(e.target.value))}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default InventorySettings;