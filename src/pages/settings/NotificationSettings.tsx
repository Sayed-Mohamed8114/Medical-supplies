import React, { useState } from 'react';
import { NotificationSettings as NotificationSettingsType } from './settings.types';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onUpdate: (settings: NotificationSettingsType) => Promise<void>;
  isLoading: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onUpdate,
  isLoading,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = (key: keyof NotificationSettingsType) => {
    setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    await onUpdate(localSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setIsEditing(false);
  };

  const notificationOptions = [
    { key: 'emailNotifications' as const, label: 'Email Notifications', description: 'Receive email updates about your account' },
    { key: 'lowStockAlerts' as const, label: 'Low Stock Alerts', description: 'Get notified when items are low in stock' },
    { key: 'expiryAlerts' as const, label: 'Expiry Alerts', description: 'Get notified about expiring products' },
    { key: 'newUserAlerts' as const, label: 'New User Alerts', description: 'Get notified when new users join' },
    { key: 'reportAlerts' as const, label: 'Report Alerts', description: 'Get notified when reports are ready' },
    { key: 'pushNotifications' as const, label: 'Push Notifications', description: 'Receive push notifications in browser' },
    { key: 'smsNotifications' as const, label: 'SMS Notifications', description: 'Receive SMS alerts for critical updates' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
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
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">{option.label}</p>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings[option.key]}
                onChange={() => handleToggle(option.key)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${isEditing ? 'cursor-pointer' : 'opacity-50'} ${localSettings[option.key] ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            </label>
          </div>
        ))}
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

export default NotificationSettings;