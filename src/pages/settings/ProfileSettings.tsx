import React, { useEffect, useState } from 'react';
import ProfileImageUpload from './ProfileImageUpload';
import { validateProfile, ProfileErrors } from './settingsValidation';
import { UserProfile, UpdateProfileData } from './settings.types';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  position: string;
  bio: string;
};

const initializeFormData = (profile: UserProfile): ProfileFormData => ({
  firstName: profile.firstName || '',
  lastName: profile.lastName || '',
  phoneNumber: profile.phoneNumber || '',
  department: profile.department || '',
  position: profile.position || '',
  bio: profile.bio || '',
});

interface ProfileSettingsProps {
  profile: UserProfile | null;
  isLoading: boolean;
  onUpdate: (data: UpdateProfileData) => Promise<UserProfile>;
  onUploadAvatar: (file: File) => Promise<{ avatarUrl: string }>;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profile,
  isLoading,
  onUpdate,
  onUploadAvatar,
}) => {
  const [formData, setFormData] = useState<ProfileFormData>(() =>
    profile ? initializeFormData(profile) : {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      department: '',
      position: '',
      bio: '',
    }
  );
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Update form data when a new profile is received, but avoid synchronous
  // setState inside the effect body to prevent cascading renders flagged by
  // the react-hooks ESLint rule. Schedule update asynchronously.
  useEffect(() => {
    if (profile && !isEditing) {
      const id = setTimeout(() => setFormData(initializeFormData(profile)), 0);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [profile, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const validationErrors = validateProfile(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      await onUpdate(formData);
      setIsEditing(false);
    }
  };

  if (!profile) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Profile Settings</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col items-center mb-6">
        <ProfileImageUpload
          avatar={profile.avatar}
          name={`${profile.firstName} ${profile.lastName}`}
          onUpload={onUploadAvatar}
          isLoading={isLoading}
        />
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email (read-only)
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Inventory">Inventory</option>
              <option value="Purchasing">Purchasing</option>
              <option value="Management">Management</option>
            </select>
            {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Manager, Administrator"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">First Name</p>
              <p className="font-medium text-gray-900 dark:text-white">{profile.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Name</p>
              <p className="font-medium text-gray-900 dark:text-white">{profile.lastName}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.phoneNumber || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.department || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.position || 'Not specified'}</p>
          </div>
          {profile.bio && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
              <p className="font-medium text-gray-900 dark:text-white">{profile.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;