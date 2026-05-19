
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { forecastScenarios } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface ScenarioComparisonCardProps {
  activeScenarioId?: string;
}

const impactClass = {
  positive: 'bg-green-100 text-green-800',
  negative: 'bg-red-100 text-red-800',
  neutral: 'bg-blue-100 text-blue-800',
};

const indicatorLabel: Record<string, { name: string; unit: string }> = {
  gdp_growth:   { name: 'GDP Growth Rate',   unit: '%' },
  inflation:    { name: 'Inflation Rate',     unit: '%' },
  unemployment: { name: 'Unemployment Rate', unit: '%' },
};

const ScenarioComparisonCard: React.FC<ScenarioComparisonCardProps> = ({ activeScenarioId }) => {
  const defaultTab = activeScenarioId ?? 'baseline';
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync when the parent changes the selection
  React.useEffect(() => {
    if (activeScenarioId) setActiveTab(activeScenarioId);
  }, [activeScenarioId]);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Scenario Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="baseline">Baseline</TabsTrigger>
            <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
            <TabsTrigger value="pessimistic">Pessimistic</TabsTrigger>
          </TabsList>

          {forecastScenarios.map((scenario) => (
            <TabsContent key={scenario.id} value={scenario.id} className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{scenario.name}</h3>
                <Badge variant="outline" className={impactClass[scenario.impact]}>
                  {scenario.impact.charAt(0).toUpperCase() + scenario.impact.slice(1)} Impact
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{scenario.description}</p>

              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Probability</span>
                  <span className="text-sm">{scenario.probability}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-primary"
                    style={{ width: `${scenario.probability}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Key Forecast Values:</h4>
                {scenario.indicators.map((ind) => {
                  const lastValue = ind.forecast_values[ind.forecast_values.length - 1]?.value;
                  const meta = indicatorLabel[ind.indicator_id] ?? {
                    name: ind.indicator_id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    unit: '',
                  };
                  return (
                    <div key={ind.indicator_id} className="flex justify-between items-center">
                      <span className="text-sm">{meta.name}</span>
                      <span className="text-sm font-medium">{lastValue}{meta.unit}</span>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScenarioComparisonCard;
