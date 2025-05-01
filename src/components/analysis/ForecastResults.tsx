
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ForecastResultsProps {
  forecastData: any[];
  featureImportanceData: any[];
}

const ForecastResults = ({ forecastData, featureImportanceData }: ForecastResultsProps) => {
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Forecast Results</CardTitle>
            <CardDescription>Model predictions with confidence intervals</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
        <Tabs defaultValue="revenue" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="revenue">Revenue Forecast</TabsTrigger>
            <TabsTrigger value="costs">Cost Forecast</TabsTrigger>
            <TabsTrigger value="features">Feature Importance</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="revenue" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={forecastData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} name="Actual Revenue" />
              <Area type="monotone" dataKey="forecast" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Forecasted Revenue" />
              <Area type="monotone" dataKey="upper" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.3} name="Upper Bound" />
              <Area type="monotone" dataKey="lower" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.3} name="Lower Bound" />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="costs" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={forecastData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} name="Actual Costs" />
              <Area type="monotone" dataKey="forecast" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="Forecasted Costs" />
              <Area type="monotone" dataKey="upper" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.3} name="Upper Bound" />
              <Area type="monotone" dataKey="lower" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.3} name="Lower Bound" />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="features" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={featureImportanceData}
              layout="vertical"
              margin={{
                top: 20,
                right: 30,
                left: 100,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 1]} />
              <YAxis dataKey="feature" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="importance" name="Importance Score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default ForecastResults;
