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

  const handleChange = (
    key: keyof ThemeSettingsType,
    value: ThemeSettingsType[keyof ThemeSettingsType]
  ) => {
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
        {/* Theme Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme Mode
          </label>
          <div className="flex gap-4">
            {['light', 'dark', 'system'].map((theme) => (
              <label key={theme} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value={theme}
                  checked={localSettings.theme === theme}
                  onChange={() => handleChange('theme', theme)}
                  disabled={!isEditing}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize">{theme}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={localSettings.fontSize}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Sidebar Collapsed */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-gray-800">Collapsed Sidebar</p>
            <p className="text-sm text-gray-500">Minimize the sidebar for more space</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.sidebarCollapsed}
              onChange={(e) => handleChange('sidebarCollapsed', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${!isEditing && 'opacity-50'} ${localSettings.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          </label>
        </div>

        {/* Compact View */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-gray-800">Compact View</p>
            <p className="text-sm text-gray-500">Show more content with tighter spacing</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.compactView}
              onChange={(e) => handleChange('compactView', e.target.checked)}
              disabled={!isEditing}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${!isEditing && 'opacity-50'} ${localSettings.compactView ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
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