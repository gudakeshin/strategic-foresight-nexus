
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dataset } from '@/types/datasets';
import { Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DatasetSelectorProps {
  datasets: Dataset[];
  selectedDataset: number | null;
  onSelectDataset: (id: number) => void;
  preselectedDataset?: Dataset | null;
}

const DatasetSelector = ({ 
  datasets, 
  selectedDataset, 
  onSelectDataset,
  preselectedDataset
}: DatasetSelectorProps) => {
  
  // Set the preselected dataset if available
  useEffect(() => {
    if (preselectedDataset && preselectedDataset.id && !selectedDataset) {
      onSelectDataset(preselectedDataset.id);
    }
  }, [preselectedDataset, selectedDataset, onSelectDataset]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Selected Dataset</CardTitle>
          {preselectedDataset && (
            <Badge variant="outline" className="text-xs">
              From Library
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-3">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              onClick={() => onSelectDataset(dataset.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedDataset === dataset.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Database className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-sm">{dataset.name}</h4>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="outline" className="text-xs">
                  {dataset.rows.toLocaleString()} rows
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {dataset.columns} columns
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Updated: {dataset.lastUpdated}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetSelector;
