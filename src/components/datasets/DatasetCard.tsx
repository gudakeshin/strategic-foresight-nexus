
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Dataset {
  id: number;
  name: string;
  rows: number;
  columns: number;
  lastUpdated: string;
}

interface DatasetCardProps {
  dataset: Dataset;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const DatasetCard = ({ dataset, isSelected, onSelect }: DatasetCardProps) => {
  return (
    <div 
      onClick={() => onSelect(dataset.id)}
      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'border-primary bg-primary/5' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          <div>
            <h4 className="font-medium text-gray-800">{dataset.name}</h4>
            <p className="text-xs text-gray-500">
              {dataset.rows.toLocaleString()} rows • {dataset.columns} columns • Updated: {dataset.lastUpdated}
            </p>
          </div>
        </div>
        <Button 
          size="sm" 
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </div>
    </div>
  );
};

export default DatasetCard;
