
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DatasetCard from './DatasetCard';

interface Dataset {
  id: number;
  name: string;
  rows: number;
  columns: number;
  lastUpdated: string;
}

interface DatasetsListProps {
  datasets: Dataset[];
  selectedDataset: number | null;
  onSelectDataset: (id: number) => void;
}

const DatasetsList = ({ datasets, selectedDataset, onSelectDataset }: DatasetsListProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Available Datasets</CardTitle>
        <CardDescription>Select a dataset to analyze</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {datasets.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              isSelected={selectedDataset === dataset.id}
              onSelect={onSelectDataset}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetsList;
