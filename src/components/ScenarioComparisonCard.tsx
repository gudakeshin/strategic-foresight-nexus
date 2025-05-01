
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { forecastScenarios } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ScenarioComparisonCard: React.FC = () => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Scenario Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="baseline">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="baseline">Baseline</TabsTrigger>
            <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
            <TabsTrigger value="pessimistic">Pessimistic</TabsTrigger>
          </TabsList>
          
          {forecastScenarios.map((scenario) => (
            <TabsContent key={scenario.id} value={scenario.id} className="mt-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{scenario.name}</h3>
                <Badge 
                  variant="outline" 
                  className={`
                    ${scenario.impact === 'positive' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : scenario.impact === 'negative'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }
                  `}
                >
                  {scenario.impact.charAt(0).toUpperCase() + scenario.impact.slice(1)} Impact
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
              
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Probability</span>
                  <span className="text-sm">{scenario.probability}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-insight-blue"
                    style={{ width: `${scenario.probability}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Key Forecast Values:</h4>
                {scenario.indicators.map((indicator) => {
                  const lastValue = indicator.forecast_values[indicator.forecast_values.length - 1]?.value;
                  const indicatorId = indicator.indicator_id;
                  
                  let displayName: string;
                  let unit: string;
                  
                  switch(indicatorId) {
                    case 'gdp_growth':
                      displayName = 'GDP Growth Rate';
                      unit = '%';
                      break;
                    case 'inflation':
                      displayName = 'Inflation Rate';
                      unit = '%';
                      break;
                    case 'unemployment':
                      displayName = 'Unemployment Rate';
                      unit = '%';
                      break;
                    default:
                      displayName = indicatorId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      unit = '';
                  }
                  
                  return (
                    <div key={indicatorId} className="flex justify-between items-center">
                      <span className="text-sm">{displayName}</span>
                      <span className="text-sm font-medium">{lastValue}{unit}</span>
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
