
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import { Database, BarChart, SliderHorizontal, FileUp, ExternalLink } from 'lucide-react';
import { datasets, algorithms } from '@/data/datasetsData';
import DatasetSelector from '@/components/analysis/DatasetSelector';
import CompanyInputs from '@/components/analysis/CompanyInputs';
import AlgorithmConfigPanel from '@/components/analysis/AlgorithmConfigPanel';
import ForecastResults from '@/components/analysis/ForecastResults';
import InsightPanel from '@/components/analysis/InsightPanel';

const Analysis = () => {
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [forecastHorizon, setForecastHorizon] = useState<number>(12);
  const [granularity, setGranularity] = useState<string>("monthly");
  const [company, setCompany] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [isModelRun, setIsModelRun] = useState<boolean>(false);

  // Mock forecast data
  const forecastData = [
    { month: 'Jan', actual: 4000, forecast: 4200, lower: 3800, upper: 4600 },
    { month: 'Feb', actual: 4200, forecast: 4300, lower: 3900, upper: 4700 },
    { month: 'Mar', actual: 4100, forecast: 4400, lower: 4000, upper: 4800 },
    { month: 'Apr', actual: 4400, forecast: 4600, lower: 4200, upper: 5000 },
    { month: 'May', actual: 4700, forecast: 4800, lower: 4400, upper: 5200 },
    { month: 'Jun', actual: 5000, forecast: 5100, lower: 4700, upper: 5500 },
    { month: 'Jul', forecast: 5300, lower: 4900, upper: 5700 },
    { month: 'Aug', forecast: 5500, lower: 5100, upper: 5900 },
    { month: 'Sep', forecast: 5400, lower: 5000, upper: 5800 },
    { month: 'Oct', forecast: 5600, lower: 5200, upper: 6000 },
    { month: 'Nov', forecast: 5800, lower: 5400, upper: 6200 },
    { month: 'Dec', forecast: 6000, lower: 5600, upper: 6400 },
  ];
  
  // Mock feature importance data
  const featureImportanceData = [
    { feature: 'Interest Rate', importance: 0.32 },
    { feature: 'Inflation', importance: 0.28 },
    { feature: 'GDP Growth', importance: 0.18 },
    { feature: 'Unemployment', importance: 0.12 },
    { feature: 'Consumer Confidence', importance: 0.10 },
  ];

  const handleRunModel = () => {
    // In a real app, this would trigger the model execution
    setIsModelRun(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Economic Analysis & Forecasting</h1>
            <p className="text-muted-foreground">
              Analyze economic impacts on business performance with AI-powered forecasting
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <DatasetSelector 
              selectedDataset={selectedDataset}
              onSelectDataset={setSelectedDataset}
              datasets={datasets}
            />

            <CompanyInputs
              company={company}
              setCompany={setCompany}
              industry={industry}
              setIndustry={setIndustry}
            />

            <AlgorithmConfigPanel
              algorithms={algorithms}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
              forecastHorizon={forecastHorizon}
              setForecastHorizon={setForecastHorizon}
              granularity={granularity}
              setGranularity={setGranularity}
            />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    disabled={!selectedDataset || !selectedAlgorithm || !company || !industry}
                    onClick={handleRunModel}
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Run Forecast Model
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Custom Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 space-y-6">
            {isModelRun ? (
              <>
                <ForecastResults 
                  forecastData={forecastData} 
                  featureImportanceData={featureImportanceData} 
                />
                
                <InsightPanel 
                  selectedAlgorithm={selectedAlgorithm}
                  company={company}
                  industry={industry}
                />
              </>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="mb-4">
                    <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Configure your analysis parameters</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Select a dataset, enter company information, and choose a forecasting 
                    algorithm to see the analysis results.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
