
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SignalFeed from '@/components/SignalFeed';
import { Zap, Filter, BarChart, TrendingUp, TrendingDown } from 'lucide-react';
import { recentSignals } from '@/lib/mock-data';

type Category = 'all' | 'economic' | 'political' | 'technological';
type ImpactLevel = 'high' | 'medium' | 'low';

const SignalsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImpacts, setSelectedImpacts] = useState<ImpactLevel[]>(['high', 'medium', 'low']);

  const toggleImpact = (level: ImpactLevel) => {
    setSelectedImpacts(prev =>
      prev.includes(level) ? prev.filter(i => i !== level) : [...prev, level]
    );
  };

  const filteredSignals = recentSignals.filter(signal => {
    const categoryMatch =
      activeCategory === 'all' ||
      signal.category.toLowerCase().includes(activeCategory);
    const impactMatch = selectedImpacts.includes(signal.impact);
    return categoryMatch && impactMatch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Signals</h1>
            <p className="text-muted-foreground">
              Monitor early warning indicators and emerging trends
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filter Signals
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-3">
                <p className="text-sm font-medium">Filter by Impact Level</p>
                {(['high', 'medium', 'low'] as ImpactLevel[]).map(level => (
                  <div key={level} className="flex items-center gap-2">
                    <Checkbox
                      id={`impact-${level}`}
                      checked={selectedImpacts.includes(level)}
                      onCheckedChange={() => toggleImpact(level)}
                    />
                    <Label htmlFor={`impact-${level}`} className="capitalize cursor-pointer">
                      {level}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Signal Highlights
                  </CardTitle>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                    {recentSignals.length} New
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SignalFeed limit={5} signals={filteredSignals} />
                <Button variant="link" className="mt-2 p-0 h-auto">
                  View all signals
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Signal Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Signals</p>
                    <p className="text-2xl font-semibold">248</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Critical Signals</p>
                    <p className="text-2xl font-semibold text-red-500">18</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">New (7d)</p>
                    <p className="text-2xl font-semibold text-primary">32</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      Positive signals
                    </span>
                    <span className="text-sm font-medium">37%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '37%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center gap-1">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      Negative signals
                    </span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Signal Feed</CardTitle>
                <CardDescription>
                  Latest signals from all monitored sources
                </CardDescription>
                <Tabs
                  defaultValue="all"
                  className="mt-4"
                  onValueChange={(val) => setActiveCategory(val as Category)}
                >
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="economic">Economic</TabsTrigger>
                    <TabsTrigger value="political">Political</TabsTrigger>
                    <TabsTrigger value="technological">Technological</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" />
                  <TabsContent value="economic" />
                  <TabsContent value="political" />
                  <TabsContent value="technological" />
                </Tabs>
              </CardHeader>
              <CardContent>
                <SignalFeed limit={10} signals={filteredSignals} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SignalsPage;
