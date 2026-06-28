import React, { useState } from 'react';
import { Preferences as PreferencesType } from './settings.types';

interface PreferencesSettingsProps {
  settings: PreferencesType;
  onUpdate: (settings: PreferencesType) => Promise<void>;
  isLoading: boolean;
}

const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({
  settings,
  onUpdate,
  isLoading,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key: keyof PreferencesType, value: PreferencesType[keyof PreferencesType]) => {
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

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
  ];

  const timezones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
    'Europe/Paris', 'Asia/Dubai', 'Asia/Tokyo', 'Africa/Cairo'
  ];

  const dateFormats = [
    { value: 'YYYY-MM-DD', label: '2024-01-15' },
    { value: 'DD/MM/YYYY', label: '15/01/2024' },
    { value: 'MM/DD/YYYY', label: '01/15/2024' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
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
            Language
          </label>
          <select
            value={localSettings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            value={localSettings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Format
          </label>
          <select
            value={localSettings.dateFormat}
            onChange={(e) => handleChange('dateFormat', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
          >
            {dateFormats.map(format => (
              <option key={format.value} value={format.value}>{format.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Format
          </label>
          <div className="flex gap-4">
            {['12h', '24h'].map((format) => (
              <label key={format} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="timeFormat"
                  value={format}
                  checked={localSettings.timeFormat === format}
                  onChange={() => handleChange('timeFormat', format as '12h' | '24h')}
                  disabled={!isEditing}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{format === '12h' ? '12-hour (12:00 PM)' : '24-hour (14:00)'}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Day of Week
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="firstDayOfWeek"
                value="0"
                checked={localSettings.firstDayOfWeek === 0}
                onChange={() => handleChange('firstDayOfWeek', 0)}
                disabled={!isEditing}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Sunday</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="firstDayOfWeek"
                value="1"
                checked={localSettings.firstDayOfWeek === 1}
                onChange={() => handleChange('firstDayOfWeek', 1)}
                disabled={!isEditing}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Monday</span>
            </label>
          </div>
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

export default PreferencesSettings;