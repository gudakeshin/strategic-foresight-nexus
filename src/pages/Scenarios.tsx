
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListChecks, GitBranch, Timeline, ArrowRight } from 'lucide-react';
import ScenarioComparisonCard from '@/components/ScenarioComparisonCard';

interface ScenarioCard {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  probability: number;
}

const scenariosData: ScenarioCard[] = [
  {
    id: "1",
    title: "Global Economic Slowdown",
    description: "Analysis of potential market impacts from global economic slowdown across key regions",
    category: "Economic",
    createdAt: "2025-04-02",
    updatedAt: "2025-04-28",
    probability: 65
  },
  {
    id: "2",
    title: "Supply Chain Disruption",
    description: "Evaluation of supply chain resilience under various disruption scenarios",
    category: "Operations",
    createdAt: "2025-03-15",
    updatedAt: "2025-04-20",
    probability: 48
  },
  {
    id: "3",
    title: "Regulatory Changes Impact",
    description: "Assessment of upcoming regulatory changes and their potential business impact",
    category: "Regulatory",
    createdAt: "2025-04-10",
    updatedAt: "2025-04-25",
    probability: 82
  },
  {
    id: "4",
    title: "Technological Disruption",
    description: "Analysis of emerging technologies and their disruptive potential on industry",
    category: "Technology",
    createdAt: "2025-03-28",
    updatedAt: "2025-04-15",
    probability: 70
  }
];

const ScenariosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

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
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Browse and manage strategic scenarios
                </CardDescription>
                <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="economic">Economic</TabsTrigger>
                    <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
                    <TabsTrigger value="technology">Technology</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenariosData
                    .filter(scenario => activeTab === 'all' || scenario.category.toLowerCase() === activeTab)
                    .map(scenario => (
                      <Card key={scenario.id} className="bg-muted/40 hover:bg-muted transition-colors">
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
                            <Button variant="ghost" size="icon">
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
            <ScenarioComparisonCard />
            
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
                    <Timeline className="mr-2 h-4 w-4" />
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
