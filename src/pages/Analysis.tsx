
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart3, Brain, Database, LineChart, SlidersHorizontal, Upload, ArrowLeft } from 'lucide-react';
import { Algorithm } from '@/types/datasets';
import DatasetSelector from '@/components/analysis/DatasetSelector';
import CompanyInputs from '@/components/analysis/CompanyInputs';
import AlgorithmConfigPanel from '@/components/analysis/AlgorithmConfigPanel';
import ForecastResults from '@/components/analysis/ForecastResults';
import InsightPanel from '@/components/analysis/InsightPanel';
import { Button } from '@/components/ui/button';
import { datasets, algorithms } from '@/data/datasetsData';
import { useDataset } from '@/context/DatasetContext';
import { toast } from '@/components/ui/use-toast';

const Analysis = () => {
  const navigate = useNavigate();
  const { selectedDataset: globalSelectedDataset } = useDataset();
  const [selectedDataset, setSelectedDataset] = useState<number | null>(globalSelectedDataset?.id || null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [forecastHorizon, setForecastHorizon] = useState<number>(12);
  const [granularity, setGranularity] = useState<string>("monthly");
  const [company, setCompany] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [isModelRun, setIsModelRun] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("config");

  // Check if user came directly to analysis page without selecting a dataset
  useEffect(() => {
    if (!globalSelectedDataset && !selectedDataset) {
      toast({
        title: "No Dataset Selected",
        description: "Please select a dataset from the library first.",
        variant: "destructive",
      });
    }
  }, [globalSelectedDataset, selectedDataset]);

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
    setIsModelRun(true);
    setActiveTab("results");
    toast({
      title: "Model Running",
      description: "Your forecast model is now generating results.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/datasets')}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Datasets
              </Button>
            </div>
            <h1 className="text-3xl font-semibold">Economic Analysis & Forecasting</h1>
            <p className="text-muted-foreground">
              Analyze economic impacts on business performance with AI-powered forecasting
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="config">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!isModelRun}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="insights" disabled={!isModelRun}>
              <Brain className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Panel - Inputs */}
              <div className="lg:col-span-1 space-y-6">
                <DatasetSelector 
                  selectedDataset={selectedDataset}
                  onSelectDataset={setSelectedDataset}
                  datasets={datasets}
                  preselectedDataset={globalSelectedDataset}
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
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Run Forecast Model
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Custom Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel - Preview & Info */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Dataset Preview</CardTitle>
                    <CardDescription>
                      {selectedDataset ? 
                        `Viewing ${datasets.find(d => d.id === selectedDataset)?.name}` : 
                        "Select a dataset to preview its contents"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px] overflow-y-auto">
                    {selectedDataset ? (
                      <div className="space-y-6">
                        <div className="bg-muted/50 p-4 rounded-md">
                          <h3 className="font-medium mb-2">Dataset Information</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Rows:</p>
                              <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.rows}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Columns:</p>
                              <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.columns}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Updated:</p>
                              <p className="font-medium">{datasets.find(d => d.id === selectedDataset)?.lastUpdated}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Sample Data Points</h3>
                          <div className="border rounded-md overflow-x-auto">
                            <table className="min-w-full divide-y divide-border">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">GDP Growth</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Inflation</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Unemployment</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Interest Rate</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <tr key={i}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">2023-{i < 10 ? `0${i}` : i}-01</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 5 - 0.5).toFixed(2)}%</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 8 + 1).toFixed(2)}%</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 10 + 3).toFixed(2)}%</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 7 + 2).toFixed(2)}%</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <Database className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No Dataset Selected</h3>
                          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                            Select a dataset from the library or use the selector on the left panel
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            {isModelRun && (
              <ForecastResults 
                forecastData={forecastData} 
                featureImportanceData={featureImportanceData} 
              />
            )}
          </TabsContent>

          <TabsContent value="insights">
            {isModelRun && (
              <InsightPanel 
                selectedAlgorithm={selectedAlgorithm}
                company={company}
                industry={industry}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
