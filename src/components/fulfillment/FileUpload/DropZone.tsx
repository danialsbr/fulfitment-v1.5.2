import React from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  file: File | null;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DropZone({ file, onDrop, onChange }: DropZoneProps) {
  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept=".xlsx"
        onChange={onChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="text-sm text-gray-600 text-center">
          فایل اکسل را انتخاب کنید یا اینجا رها کنید
        </span>
        {file && (
          <span className="text-sm text-blue-500 font-medium mt-2">
            {file.name}
          </span>
        )}
      </label>
    </div>
  );
}