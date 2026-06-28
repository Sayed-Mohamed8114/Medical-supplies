import React, { useState } from 'react';
import { ThemeSettings as ThemeSettingsType } from './settings.types';

interface ThemeSettingsProps {
  settings: ThemeSettingsType;
  onUpdate: (settings: ThemeSettingsType) => Promise<void>;
  isLoading: boolean;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  settings,
  onUpdate,
  isLoading,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: checked }));
  };

  // ✅ Handle radio change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await onUpdate(localSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Theme & Appearance</h2>
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
        {/* Theme Mode - Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme Mode
          </label>
          <div className="flex gap-4">
            {['light', 'dark', 'system'].map((themeValue) => (
              <label key={themeValue} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value={themeValue}
                  checked={localSettings.theme === themeValue}
                  onChange={handleRadioChange}
                  disabled={!isEditing}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize">{themeValue}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Font Size - Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            name="fontSize"
            value={localSettings.fontSize}
            onChange={handleSelectChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Sidebar Collapsed - Checkbox */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-gray-800">Collapsed Sidebar</p>
            <p className="text-sm text-gray-500">Minimize the sidebar for more space</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="sidebarCollapsed"
              checked={localSettings.sidebarCollapsed}
              onChange={handleCheckboxChange}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${!isEditing && 'opacity-50'} ${localSettings.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          </label>
        </div>

        {/* Compact View - Checkbox */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-gray-800">Compact View</p>
            <p className="text-sm text-gray-500">Show more content with tighter spacing</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="compactView"
              checked={localSettings.compactView}
              onChange={handleCheckboxChange}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${!isEditing && 'opacity-50'} ${localSettings.compactView ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          </label>
        </div>
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

export default ThemeSettings;