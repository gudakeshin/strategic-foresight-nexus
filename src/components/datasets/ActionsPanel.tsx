
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, Upload } from 'lucide-react';

interface ActionsPanelProps {
  selectedDataset: number | null;
  selectedAlgorithm: string;
  onAnalyze?: () => void;
}

const ActionsPanel = ({ selectedDataset, selectedAlgorithm, onAnalyze }: ActionsPanelProps) => {
  const isActionDisabled = !selectedDataset;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onAnalyze}
          className="w-full" 
          disabled={isActionDisabled}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Analyze Dataset
        </Button>
        <Button variant="outline" className="w-full" disabled={isActionDisabled}>
          <Download className="mr-2 h-4 w-4" />
          Export Dataset
        </Button>
        <Button variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Custom Dataset
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionsPanel;
