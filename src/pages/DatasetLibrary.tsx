
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { datasets, algorithms } from '@/data/datasetsData';
import DatasetsList from '@/components/datasets/DatasetsList';
import AlgorithmSelector from '@/components/datasets/AlgorithmSelector';
import ActionsPanel from '@/components/datasets/ActionsPanel';
import SearchFilters from '@/components/datasets/SearchFilters';
import { useDataset } from '@/context/DatasetContext';
import { toast } from 'sonner';

const DatasetLibrary = () => {
  const navigate = useNavigate();
  const { selectedDataset: globalSelectedDataset, setSelectedDataset: setGlobalSelectedDataset } = useDataset();
  const [selectedDatasetId, setSelectedDatasetId] = useState<number | null>(
    globalSelectedDataset?.id || null
  );
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredDatasets = datasets.filter(dataset => 
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDataset = (id: number) => {
    setSelectedDatasetId(id);
    const dataset = datasets.find(d => d.id === id) || null;
    setGlobalSelectedDataset(dataset);
    
    toast.success("Dataset Selected", {
      description: `${dataset?.name} has been selected for analysis.`,
    });
  };

  const handleGoToAnalysis = () => {
    if (selectedDatasetId) {
      navigate('/analysis');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dataset Library</h1>
          <SearchFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <DatasetsList 
              datasets={filteredDatasets} 
              selectedDataset={selectedDatasetId}
              onSelectDataset={handleSelectDataset}
            />
          </div>

          <div className="space-y-4">
            <AlgorithmSelector 
              algorithms={algorithms}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
              disabled={!selectedDatasetId}
            />

            <ActionsPanel 
              selectedDataset={selectedDatasetId}
              selectedAlgorithm={selectedAlgorithm}
              onAnalyze={handleGoToAnalysis}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DatasetLibrary;
