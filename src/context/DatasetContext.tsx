
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Dataset } from '@/types/datasets';

interface DatasetContextType {
  selectedDataset: Dataset | null;
  setSelectedDataset: (dataset: Dataset | null) => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export function DatasetProvider({ children }: { children: ReactNode }) {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  
  return (
    <DatasetContext.Provider value={{ selectedDataset, setSelectedDataset }}>
      {children}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  const context = useContext(DatasetContext);
  if (context === undefined) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
}
