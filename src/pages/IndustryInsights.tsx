
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, TrendingUp, TrendingDown, Calendar, ExternalLink } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const marketTrendData = [
  { month: 'Jan', competition: 30, yourMarket: 40, industry: 35 },
  { month: 'Feb', competition: 32, yourMarket: 43, industry: 36 },
  { month: 'Mar', competition: 34, yourMarket: 45, industry: 37 },
  { month: 'Apr', competition: 36, yourMarket: 47, industry: 38 },
  { month: 'May', competition: 34, yourMarket: 48, industry: 39 },
  { month: 'Jun', competition: 32, yourMarket: 50, industry: 39 },
  { month: 'Jul', competition: 34, yourMarket: 49, industry: 40 },
  { month: 'Aug', competition: 38, yourMarket: 48, industry: 41 },
  { month: 'Sep', competition: 40, yourMarket: 47, industry: 42 },
  { month: 'Oct', competition: 42, yourMarket: 46, industry: 43 },
  { month: 'Nov', competition: 46, yourMarket: 48, industry: 44 },
  { month: 'Dec', competition: 49, yourMarket: 52, industry: 45 },
];

const marketShareData = [
  { name: 'Your Company', value: 32, color: '#2563eb' },
  { name: 'Competitor A', value: 25, color: '#64748b' },
  { name: 'Competitor B', value: 18, color: '#94a3b8' },
  { name: 'Competitor C', value: 15, color: '#cbd5e1' },
  { name: 'Others', value: 10, color: '#e2e8f0' },
];

const industryNewsItems = [
  {
    id: 1,
    title: 'New Regulations Impact Manufacturing Sector',
    source: 'Industry Today',
    date: '2025-04-28',
    category: 'Regulatory',
    impact: 'negative',
  },
  {
    id: 2,
    title: 'Tech Innovation Drives Market Growth',
    source: 'Future Markets',
    date: '2025-04-25',
    category: 'Technology',
    impact: 'positive',
  },
  {
    id: 3,
    title: 'Supply Chain Improvements Expected in Q3',
    source: 'Supply Chain Weekly',
    date: '2025-04-22',
    category: 'Operations',
    impact: 'positive',
  },
  {
    id: 4,
    title: 'Consumer Behavior Shift in Key Demographics',
    source: 'Market Analysis',
    date: '2025-04-20',
    category: 'Consumer',
    impact: 'neutral',
  },
];

const IndustryInsightsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Industry Insights</h1>
          <p className="text-muted-foreground">
            Market trends, competitor analysis, and industry forecasts
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Market Growth Trends</CardTitle>
                  <CardDescription>Year-over-year comparison with industry benchmarks</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={marketTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="yourMarket" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} name="Your Market" />
                      <Line type="monotone" dataKey="competition" stroke="#64748b" name="Competition Avg." />
                      <Line type="monotone" dataKey="industry" stroke="#94a3b8" strokeDasharray="3 3" name="Industry Avg." />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Industry News</CardTitle>
                  <CardDescription>Latest developments affecting your market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {industryNewsItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-1 pb-3 border-b last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <Badge 
                            className={`
                              ${item.impact === 'positive' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : item.impact === 'negative'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }
                            `}
                            variant="outline"
                          >
                            {item.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{item.source}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-xs" size="sm">
                    View All Industry News
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Market Positioning</CardTitle>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200" variant="outline">
                      <TrendingUp className="mr-1 h-3 w-3" /> 
                      Improving
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Market Share</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Growth Rate</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Innovation Index</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>Market growth by geographic region</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={marketTrendData}
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
                      <Area type="monotone" dataKey="yourMarket" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="competitors">
            <h2>Competitor Analysis Content</h2>
            <p>This tab will contain detailed competitor analysis.</p>
          </TabsContent>
          
          <TabsContent value="trends">
            <h2>Market Trends Content</h2>
            <p>This tab will contain detailed market trend analysis.</p>
          </TabsContent>
          
          <TabsContent value="forecast">
            <h2>Forecast Content</h2>
            <p>This tab will contain industry forecasts and projections.</p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default IndustryInsightsPage;
