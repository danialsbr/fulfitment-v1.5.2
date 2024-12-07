import React from 'react';

interface UploadButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

export function UploadButton({ isLoading, disabled }: UploadButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'در حال آپلود...' : 'آپلود فایل'}
    </button>
  );
}