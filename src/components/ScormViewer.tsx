import React, { useRef, useEffect } from 'react';
import { Scorm12API } from 'scorm-again';
import { Card, CardContent } from '@/components/ui/card';
import { useScormContext } from '@/contexts/ScormContext';

export const ScormViewer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { packageData } = useScormContext();
  
  useEffect(() => {
    // Initialize SCORM 1.2 API in parent window
    window.API = new Scorm12API();
  }, []);

  useEffect(() => {
    if (packageData.isLoaded && iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Get license and module from localStorage
      const license = localStorage.getItem('scorm_license');
      const moduleId = localStorage.getItem('scorm_module');
      
      if (license && moduleId) {
        // Set iframe src to the API route with extracted parameters
        iframe.src = `/api/scorm/entrypoint.html?license=${encodeURIComponent(license)}&module=${encodeURIComponent(moduleId)}`;
      } else {
        console.error('License or module ID not found in localStorage. Cannot load SCORM content.');
      }
    }
  }, [packageData]);

  if (!packageData.isLoaded) {
    return null;
  }

  return (
    <div className="w-full max-w-[80vw] mx-auto">
      <Card className="bg-white shadow-lg overflow-hidden w-full">
        <CardContent className="p-0 h-full">
          <iframe
            ref={iframeRef}
            className="w-full border-0"
            style={{ 
              maxWidth: '100%',
              height: '80vh'
            }}
            allow="autoplay; fullscreen"
          />
        </CardContent>
      </Card>
    </div>
  );
};
