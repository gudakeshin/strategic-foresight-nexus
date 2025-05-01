
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';
import { EconomicIndicator, forecastScenarios } from '@/lib/mock-data';

interface IndicatorChartProps {
  indicator: EconomicIndicator;
}

const IndicatorChart: React.FC<IndicatorChartProps> = ({ indicator }) => {
  const [viewType, setViewType] = useState("historical");
  
  const trendIcon = indicator.trendDirection === 'up' ? 
    <ArrowUp className="h-4 w-4 text-green-500" /> :
    indicator.trendDirection === 'down' ?
    <ArrowDown className="h-4 w-4 text-red-500" /> :
    <Minus className="h-4 w-4 text-gray-500" />;

  // Get the baseline forecast for this indicator
  const baselineScenario = forecastScenarios.find(s => s.id === 'baseline');
  const baselineForecast = baselineScenario?.indicators.find(
    i => i.indicator_id === indicator.id
  )?.forecast_values || [];

  // Get the optimistic forecast for this indicator
  const optimisticScenario = forecastScenarios.find(s => s.id === 'optimistic');
  const optimisticForecast = optimisticScenario?.indicators.find(
    i => i.indicator_id === indicator.id
  )?.forecast_values || [];

  // Get the pessimistic forecast for this indicator
  const pessimisticScenario = forecastScenarios.find(s => s.id === 'pessimistic');
  const pessimisticForecast = pessimisticScenario?.indicators.find(
    i => i.indicator_id === indicator.id
  )?.forecast_values || [];

  // Combine historical and forecast data for the forecast view
  const combinedData = [...indicator.data];

  // Find the most recent date in historical data
  const latestDate = new Date(indicator.data[indicator.data.length - 1]?.date || '');
  
  // Add a vertical reference line at the forecast start
  const forecastStartDate = latestDate.toISOString().slice(0, 10);

  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  const chartColors = {
    primary: '#0A84FF',
    optimistic: '#34C759',
    pessimistic: '#FF3B30',
    grid: '#f0f0f0',
    tooltip: '#1C2A4E'
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{indicator.name}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{indicator.value}{indicator.unit}</span>
            <div className="flex items-center gap-1">
              {trendIcon}
              <span className={`text-sm font-medium ${getTrendClass(indicator.trendDirection)}`}>
                {indicator.trendDirection === 'up' ? '+' : indicator.trendDirection === 'down' ? '-' : ''}
                {Math.abs(indicator.value - indicator.previousValue).toFixed(1)}{indicator.unit}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="historical" 
          onValueChange={setViewType}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="historical" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={indicator.data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatDate}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `${value}${indicator.unit}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}${indicator.unit}`, indicator.name]}
                    labelFormatter={formatDate}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={chartColors.primary} 
                    fillOpacity={1}
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="forecast" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatDate}
                    allowDuplicatedCategory={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `${value}${indicator.unit}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}${indicator.unit}`, indicator.name]}
                    labelFormatter={formatDate}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <ReferenceLine 
                    x={forecastStartDate} 
                    stroke="#666" 
                    strokeDasharray="3 3"
                    label={{ value: 'Current', position: 'top', fill: '#666', fontSize: 10 }} 
                  />
                  
                  <Line 
                    name="Historical" 
                    data={indicator.data} 
                    dataKey="value" 
                    stroke={chartColors.primary} 
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    isAnimationActive={true}
                  />
                  
                  <Line 
                    name="Baseline" 
                    data={baselineForecast} 
                    dataKey="value" 
                    stroke={chartColors.primary} 
                    strokeDasharray="5 5" 
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    isAnimationActive={true}
                  />
                  
                  <Line 
                    name="Optimistic" 
                    data={optimisticForecast} 
                    dataKey="value" 
                    stroke={chartColors.optimistic} 
                    strokeDasharray="3 3" 
                    strokeWidth={1.5}
                    dot={{ r: 0 }}
                    isAnimationActive={true}
                  />
                  
                  <Line 
                    name="Pessimistic" 
                    data={pessimisticForecast} 
                    dataKey="value" 
                    stroke={chartColors.pessimistic}
                    strokeDasharray="3 3" 
                    strokeWidth={1.5}
                    dot={{ r: 0 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IndicatorChart;
