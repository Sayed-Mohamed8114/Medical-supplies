import React, { useRef, useState } from 'react';

interface ProfileImageUploadProps {
  avatar?: string;
  name: string;
  onUpload: (file: File) => Promise<{ avatarUrl: string }>;  // ✅ نفس النوع
  isLoading: boolean;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  avatar,
  name,
  onUpload,
  isLoading,
}) => {
  const [preview, setPreview] = useState<string>(avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // ✅ Upload
      try {
        await onUpload(file);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const getInitials = () => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {getInitials()}
          </div>
        )}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="absolute bottom-0 right-0 bg-gray-800 text-white p-1.5 rounded-full hover:bg-gray-700 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <p className="text-sm text-gray-500">Click to upload profile image</p>
    </div>
  );
};

export default ProfileImageUpload;