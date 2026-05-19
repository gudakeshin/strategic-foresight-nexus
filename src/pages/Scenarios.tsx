
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListChecks, GitBranch, Clock, ArrowRight } from 'lucide-react';
import ScenarioComparisonCard from '@/components/ScenarioComparisonCard';
import { scenariosData, type Scenario } from '@/lib/mock-data';

const categories = ['all', 'economic', 'operations', 'regulatory', 'technology'];

const ScenariosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const filtered = scenariosData.filter(
    s => activeTab === 'all' || s.category.toLowerCase() === activeTab
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Scenarios</h1>
            <p className="text-muted-foreground">
              Create and analyze different future scenarios to prepare strategic responses
            </p>
          </div>
          <Button className="flex gap-2">
            <PlusCircle className="h-4 w-4" />
            New Scenario
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Scenario Explorer</CardTitle>
                </div>
                <CardDescription>Browse and manage strategic scenarios</CardDescription>
                <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 mb-2">
                    {categories.map(c => (
                      <TabsTrigger key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filtered.map(scenario => (
                    <Card
                      key={scenario.id}
                      className={`transition-colors ${
                        selectedScenario?.id === scenario.id
                          ? 'bg-primary/5 border-primary'
                          : 'bg-muted/40 hover:bg-muted'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{scenario.title}</h3>
                              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                {scenario.category}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{scenario.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedScenario(scenario)}
                            aria-label={`View ${scenario.title} forecast`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-6 mt-2">
                          <div className="text-xs text-muted-foreground">
                            Last updated: {scenario.updatedAt}
                          </div>
                          <div className="text-xs flex items-center gap-1">
                            <span>Probability:</span>
                            <span className="font-medium">{scenario.probability}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <ScenarioComparisonCard
              activeScenarioId={selectedScenario?.forecastScenarioId}
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Scenario Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <ListChecks className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Compare Scenarios</span>
                      <span className="text-xs text-muted-foreground">Analyze multiple scenarios side by side</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <GitBranch className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Branch Scenarios</span>
                      <span className="text-xs text-muted-foreground">Create variations of existing scenarios</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Clock className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Time Horizon Analysis</span>
                      <span className="text-xs text-muted-foreground">View impacts across different timeframes</span>
                    </div>
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

export default ScenariosPage;
