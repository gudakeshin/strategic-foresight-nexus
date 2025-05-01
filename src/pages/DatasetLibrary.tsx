
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Database, FileSpreadsheet, SearchIcon, SliderHorizontal } from 'lucide-react';

// Mock datasets
const datasets = [
  { id: 1, name: 'Global Economic Indicators', rows: 5842, columns: 27, lastUpdated: '2023-11-15' },
  { id: 2, name: 'Industry Performance Metrics', rows: 3921, columns: 15, lastUpdated: '2023-12-01' },
  { id: 3, name: 'Consumer Sentiment Index', rows: 2145, columns: 12, lastUpdated: '2024-01-10' },
  { id: 4, name: 'Supply Chain Disruptions', rows: 1503, columns: 18, lastUpdated: '2024-02-20' },
  { id: 5, name: 'Market Volatility Indicators', rows: 4218, columns: 22, lastUpdated: '2024-03-05' },
  { id: 6, name: 'Regulatory Change Impact', rows: 987, columns: 14, lastUpdated: '2024-03-28' }
];

// Algorithms with their details
const algorithms = [
  { 
    id: 1, 
    name: 'ARIMA / SARIMA', 
    bestFor: 'Time series with trend & seasonality', 
    keyStrengths: 'Interpretable, strong for univariate forecasts with stationary or seasonal patterns',
    rank: 1
  },
  { 
    id: 2, 
    name: 'Prophet (by Facebook)', 
    bestFor: 'Business forecasting with seasonality and holidays', 
    keyStrengths: 'Easy to use, handles missing data & seasonality automatically, great for business applications',
    rank: 2
  },
  {
    id: 3,
    name: 'XGBoost / LightGBM',
    bestFor: 'Structured/tabular data forecasting',
    keyStrengths: 'High accuracy, handles non-linearities, strong with feature engineering',
    rank: 3
  },
  {
    id: 4,
    name: 'LSTM (Long Short-Term Memory)',
    bestFor: 'Complex time series with long-term dependencies',
    keyStrengths: 'Learns complex temporal relationships, strong in deep learning models',
    rank: 4
  },
  {
    id: 5,
    name: 'Random Forest Regressor',
    bestFor: 'Non-linear forecasting for tabular datasets',
    keyStrengths: 'Robust to overfitting, works well with fewer tuning needs and non-linear data',
    rank: 5
  }
];

const DatasetLibrary = () => {
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredDatasets = datasets.filter(dataset => 
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDataset = (id: number) => {
    setSelectedDataset(id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dataset Library</h1>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search datasets..."
                className="pl-8 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="outline" size="sm">
              <SliderHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Available Datasets</CardTitle>
                <CardDescription>Select a dataset to analyze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredDatasets.map((dataset) => (
                    <div 
                      key={dataset.id}
                      onClick={() => handleSelectDataset(dataset.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedDataset === dataset.id ? 'border-primary bg-primary/5' : 'border-gray-200'
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
                          variant={selectedDataset === dataset.id ? "default" : "outline"}
                        >
                          {selectedDataset === dataset.id ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Choose Algorithm</CardTitle>
                <CardDescription>Select an algorithm for your analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Select 
                  value={selectedAlgorithm} 
                  onValueChange={setSelectedAlgorithm}
                  disabled={!selectedDataset}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map((algorithm) => (
                      <SelectItem key={algorithm.id} value={algorithm.name}>
                        {algorithm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedAlgorithm && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-medium mb-2 text-gray-800">Algorithm Details</h4>
                    {algorithms.find(a => a.name === selectedAlgorithm) && (
                      <div className="text-sm space-y-2">
                        <p><span className="font-medium">Rank:</span> {algorithms.find(a => a.name === selectedAlgorithm)?.rank}</p>
                        <p><span className="font-medium">Best For:</span> {algorithms.find(a => a.name === selectedAlgorithm)?.bestFor}</p>
                        <p><span className="font-medium">Key Strengths:</span> {algorithms.find(a => a.name === selectedAlgorithm)?.keyStrengths}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DatasetLibrary;
