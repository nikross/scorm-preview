import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScormContext } from '@/contexts/ScormContext';

export const ScormAssignment: React.FC = () => {
  const { setPackageData } = useScormContext();

  const handleStartTraining = () => {
    // Update state to show the viewer
    setPackageData(prev => ({ ...prev, isStarted: true }));
  };

  return (
    <Card className="w-[36rem] max-w-[90vw] mx-auto bg-white shadow-lg px-4 py-2">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">Your Learning Path</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <div className="space-y-4">
          <p className="text-gray-500">
            This training module will help you develop new skills and knowledge. 
            Take your time to complete all sections and ensure you understand the content.
            If you have any questions, don&apos;t hesitate to revisit the material or ask for help.
          </p>
        </div>
        
        <Button 
          onClick={handleStartTraining}
          size="lg"
          className="flex items-center px-8 py-3 text-base"
        >
          Start Training
        </Button>
      </CardContent>
    </Card>
  );
};
