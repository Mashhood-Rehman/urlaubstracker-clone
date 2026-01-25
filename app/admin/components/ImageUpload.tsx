'use client';

import { useState } from 'react';
import { icons } from '@/assets/icons';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  folder?: string;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  label = 'Upload Images',
  folder = 'blogs',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      formDataObj.append('folder', folder);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formDataObj,
        });
        const data = await res.json();
        if (data.success) {
          return data.url;
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      } catch (error) {
        console.error('Error uploading:', error);
        throw error;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];
      onImagesChange(newImages);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Failed to upload some images');
    } finally {
      setUploading(false);
      // Reset input
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('Image removed');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-600 uppercase tracking-tight">
        {label} <span className="text-red-500">*</span> ({images.length}/{maxImages})
      </label>

      <div className="relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading || images.length >= maxImages}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center gap-2 w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${uploading || images.length >= maxImages
            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
            : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100'
            }`}
        >
          <icons.Upload className="w-5 h-5 text-blue-600" />
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              {uploading ? 'Uploading...' : 'Drag & drop images or click to browse'}
            </p>
            <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB each</p>
          </div>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <icons.X className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-500 mt-1 text-center">Image {index + 1}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
