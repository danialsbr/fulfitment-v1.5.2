import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadApi } from '../../../services/api/upload';
import { useTranslation } from '../../../hooks/useTranslation';
import { DropZone } from './DropZone';
import { UploadButton } from './UploadButton';
import { StatusMessage } from './StatusMessage';

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const t = useTranslation();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadApi.uploadFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      setFile(null);
    },
  });

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
    } else {
      uploadMutation.error = new Error('فقط فایل‌های Excel (.xlsx) پذیرفته می‌شوند');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.xlsx')) {
      setFile(droppedFile);
    } else {
      uploadMutation.error = new Error('فقط فایل‌های Excel (.xlsx) پذیرفته می‌شوند');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      try {
        await uploadMutation.mutateAsync(file);
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Upload className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-semibold">آپلود فایل سفارشات</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <DropZone
            file={file}
            onDrop={handleDrop}
            onChange={handleFileChange}
          />

          <UploadButton
            isLoading={uploadMutation.isPending}
            disabled={!file || uploadMutation.isPending}
          />

          <StatusMessage
            isSuccess={uploadMutation.isSuccess}
            isError={uploadMutation.isError}
            error={uploadMutation.error}
          />
        </form>
      </div>
    </div>
  );
}