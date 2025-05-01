
import React from 'react';
import { Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActionsPanelProps {
  selectedDataset: number | null;
  selectedAlgorithm: string;
}

const ActionsPanel = ({ selectedDataset, selectedAlgorithm }: ActionsPanelProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button 
            className="w-full" 
            disabled={!selectedDataset || !selectedAlgorithm}
          >
            <Database className="mr-2 h-4 w-4" />
            Run Analysis
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            disabled={!selectedDataset}
          >
            Preview Dataset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsPanel;
