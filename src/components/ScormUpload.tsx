import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScormContext } from '@/contexts/ScormContext';

export const ScormUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { packageData, loadPackage } = useScormContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadPackage(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      loadPackage(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (packageData.isLoaded) {
    return null; // Hide upload when package is loaded
  }

  if (packageData.isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-lg font-semibold text-gray-700">Processing SCORM package...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your content</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg">
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-lg font-semibold text-gray-500">Import SCORM package</p>
            <p className="text-gray-400">
              Click to select or drag and drop it here
            </p>
          </div>
        </div>
      </Card>
  );
};
