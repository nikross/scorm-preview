import React, { createContext, useContext, ReactNode } from 'react';
import { useScorm } from '@/hooks/useScorm';

interface ScormContextType {
  packageData: {
    isLoaded: boolean;
    isLoading: boolean;
    isStarted: boolean;
  };
  status: {
    message: string;
    type: 'info' | 'success' | 'error';
  };
  loadPackage: (file: File) => Promise<void>;
  deletePackage: () => void;
  updateStatus: (message: string, type?: 'info' | 'success' | 'error') => void;
  setPackageData: React.Dispatch<React.SetStateAction<{
    isLoaded: boolean;
    isLoading: boolean;
    isStarted: boolean;
  }>>;
}

const ScormContext = createContext<ScormContextType | undefined>(undefined);

export const ScormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const scormData = useScorm();
  
  return (
    <ScormContext.Provider value={scormData}>
      {children}
    </ScormContext.Provider>
  );
};

export const useScormContext = () => {
  const context = useContext(ScormContext);
  if (context === undefined) {
    throw new Error('useScormContext must be used within a ScormProvider');
  }
  return context;
};
