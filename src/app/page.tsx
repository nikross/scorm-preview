'use client';

import { ScormUpload } from '@/components/ScormUpload';
import { ScormViewer } from '@/components/ScormViewer';
import { ScormAssignment } from '@/components/ScormAssignment';
import { ScormProvider, useScormContext } from '@/contexts/ScormContext';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function AppContent() {
  const { packageData, deletePackage, setPackageData } = useScormContext();

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-gray-700 text-white h-16 py-1 flex items-center shadow-sm relative">
        <div className="container mx-auto px-16 flex items-center justify-between">
          <h1 
            className="text-xl font-bold cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => setPackageData(prev => ({ ...prev, isStarted: false }))}
          >
            Simple LMS
          </h1>
          {packageData.isLoaded && (
            <Button
              variant="link"
              size="sm"
              onClick={deletePackage}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
              title="Delete SCORM Module"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>
      
      <div className="container flex items-center justify-center min-h-[80vh] mx-auto px-4 py-8">
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-12">
            {packageData.isLoaded && packageData.isStarted ? (
              <ScormViewer />
            ) : packageData.isLoaded && !packageData.isStarted ? (
              <ScormAssignment />
            ) : (
              <ScormUpload />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ScormProvider>
      <AppContent />
    </ScormProvider>
  );
}