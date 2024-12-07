import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface StatusMessageProps {
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

export function StatusMessage({ isSuccess, isError, error }: StatusMessageProps) {
  if (isSuccess) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
        <CheckCircle className="h-5 w-5" />
        <span>فایل با موفقیت آپلود شد</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
        <XCircle className="h-5 w-5" />
        <span>
          {error instanceof Error 
            ? error.message 
            : 'خطا در آپلود فایل'}
        </span>
      </div>
    );
  }

  return null;
}