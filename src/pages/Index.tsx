
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import OutlookScoreCard from '@/components/OutlookScoreCard';
import SignalFeed from '@/components/SignalFeed';
import IndicatorChart from '@/components/IndicatorChart';
import ScenarioComparisonCard from '@/components/ScenarioComparisonCard';
import { economicIndicators, industryOutlooks, recentSignals } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, ArrowUpRight, BarChart, LineChart, Globe, Lightbulb } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [selectedIndicator, setSelectedIndicator] = useState(economicIndicators[0].id);
  
  const currentIndicator = economicIndicators.find(i => i.id === selectedIndicator) || economicIndicators[0];
  
  const primaryIndicators = economicIndicators.filter(i => i.categories.includes('primary'));
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Strategic Foresight Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Unified insights for strategic decision-making
        </p>
      </div>
      
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Key Economic Indicators</CardTitle>
            </div>
            <CardDescription>Real-time monitoring of primary economic signals</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
              {primaryIndicators.slice(0, 4).map((indicator) => (
                <div key={indicator.id} className="p-4 flex flex-col">
                  <span className="text-sm text-muted-foreground font-medium">{indicator.name}</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {indicator.value}{indicator.unit}
                    </span>
                    <span className={`text-sm flex items-center ${
                      indicator.trendDirection === 'up' 
                        ? 'text-green-600' 
                        : indicator.trendDirection === 'down' 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                    }`}>
                      {indicator.trendDirection === 'up' && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
                      {indicator.trendDirection === 'down' && <ArrowUpRight className="h-3 w-3 mr-0.5 rotate-90" />}
                      {Math.abs(indicator.value - indicator.previousValue).toFixed(1)}{indicator.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Industry Outlook Cards */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Industry Outlook Scores
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industryOutlooks.slice(0, 6).map((outlook) => (
            <OutlookScoreCard key={outlook.industry} outlook={outlook} />
          ))}
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Economic Indicator Chart */}
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Economic Indicators</CardTitle>
                </div>
                <Select
                  value={selectedIndicator}
                  onValueChange={setSelectedIndicator}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select indicator" />
                  </SelectTrigger>
                  <SelectContent>
                    {economicIndicators.map((indicator) => (
                      <SelectItem key={indicator.id} value={indicator.id}>
                        {indicator.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <IndicatorChart indicator={currentIndicator} />
            </CardContent>
          </Card>
          
          {/* Scenario Comparison */}
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Scenario Analysis</CardTitle>
              </div>
              <CardDescription>
                Compare potential future scenarios and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ScenarioComparisonCard />
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Real-time Signals */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Market Signals</CardTitle>
              </div>
              <CardDescription>
                Real-time intelligence on market shifts and relevant events
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <SignalFeed signals={recentSignals} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
