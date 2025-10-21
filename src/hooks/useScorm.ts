import { useState, useEffect, useCallback } from 'react';
import JSZip from 'jszip';

export interface ScormPackage {
  isLoaded: boolean;
  isLoading: boolean;
  isStarted: boolean;
}

export interface ScormStatus {
  message: string;
  type: 'info' | 'success' | 'error';
}

export const useScorm = () => {
  const [packageData, setPackageData] = useState<ScormPackage>({
    isLoaded: false,
    isLoading: false,
    isStarted: false,
  });
  const [status, setStatus] = useState<ScormStatus>({
    message: '',
    type: 'info',
  });

  // Check for stored package on mount
  useEffect(() => {
    const storedLicense = localStorage.getItem('scorm_license');
    const storedModule = localStorage.getItem('scorm_module');
    
    if (storedLicense && storedModule) {
      setPackageData({
        isLoaded: true,
        isLoading: false,
        isStarted: false,
      });
      
      setStatus({
        message: 'Package loaded from storage with parameters',
        type: 'success',
      });
    }
  }, []);

  const updateStatus = useCallback((message: string, type: ScormStatus['type'] = 'info') => {
    setStatus({ message, type });
  }, []);

  const loadPackage = useCallback(async (file: File) => {
    if (!file) return;

    // Set loading state
    setPackageData(prev => ({ ...prev, isLoading: true }));
    updateStatus('Processing ZIP file...', 'info');

    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);

      // Look for index.html in the ZIP
      const indexHtml = zipContent.file('index.html');
      if (!indexHtml) {
        throw new Error('index.html not found in ZIP file');
      }

      // Extract index.html content
      const htmlContent = await indexHtml.async('text');

      // Extract license and module parameters from the HTML content
      const extractParameters = (html: string) => {
        // Look for URL parameters in the HTML content
        // Pattern: ?license=...&module=...
        const urlMatch = html.match(/[?&]license=([^&"'\s]+)/);
        const moduleMatch = html.match(/[?&]module=([^&"'\s]+)/);
        
        const license = urlMatch?.[1] || null;
        const moduleId = moduleMatch?.[1] || null;
        
        return { license, module: moduleId };
      };

      const { license, module } = extractParameters(htmlContent);

      // Store extracted parameters
      if (license) {
        localStorage.setItem('scorm_license', license);
      } else {
        console.warn('No license parameter found in index.html');
      }
      
      if (module) {
        localStorage.setItem('scorm_module', module);
      } else {
        console.warn('No module parameter found in index.html');
      }

      // Add artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update state
      setPackageData({
        isLoaded: true,
        isLoading: false,
        isStarted: false,
      });

      updateStatus('Package loaded successfully!', 'success');
    } catch (error) {
      console.error('Error processing ZIP file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
      setPackageData(prev => ({ ...prev, isLoading: false }));
      updateStatus('', 'info'); // Clear status message
    }
  }, [updateStatus]);

  const deletePackage = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('scorm_license');
    localStorage.removeItem('scorm_module');

    // Update state
    setPackageData({
      isLoaded: false,
      isLoading: false,
      isStarted: false,
    });

    updateStatus('Module deleted', 'info');
  }, [updateStatus]);

  return {
    packageData,
    status,
    loadPackage,
    deletePackage,
    updateStatus,
    setPackageData,
  };
};
