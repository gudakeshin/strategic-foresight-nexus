
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

function isoDateDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

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

const industryNewsItems = [
  {
    id: 1,
    title: 'New Regulations Impact Manufacturing Sector',
    source: 'Industry Today',
    date: isoDateDaysAgo(21),
    category: 'Regulatory',
    impact: 'negative',
  },
  {
    id: 2,
    title: 'Tech Innovation Drives Market Growth',
    source: 'Future Markets',
    date: isoDateDaysAgo(24),
    category: 'Technology',
    impact: 'positive',
  },
  {
    id: 3,
    title: 'Supply Chain Improvements Expected in Q3',
    source: 'Supply Chain Weekly',
    date: isoDateDaysAgo(27),
    category: 'Operations',
    impact: 'positive',
  },
  {
    id: 4,
    title: 'Consumer Behavior Shift in Key Demographics',
    source: 'Market Analysis',
    date: isoDateDaysAgo(29),
    category: 'Consumer',
    impact: 'neutral',
  },
];

const competitors = [
  { company: 'Competitor A', marketShare: '25%', growthRate: '8%', strengths: 'Brand recognition, distribution', threat: 'Medium' },
  { company: 'Competitor B', marketShare: '18%', growthRate: '15%', strengths: 'Innovation, R&D investment', threat: 'High' },
  { company: 'Competitor C', marketShare: '15%', growthRate: '5%', strengths: 'Cost leadership', threat: 'Low' },
  { company: 'New Entrant', marketShare: '4%', growthRate: '45%', strengths: 'Technology-first, agility', threat: 'High' },
];

const threatBadge = (level: string) => {
  if (level === 'High') return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">{level}</Badge>;
  if (level === 'Medium') return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">{level}</Badge>;
  return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">{level}</Badge>;
};

const trends = [
  {
    name: 'AI & Automation',
    direction: 'Rising',
    description: 'Accelerating adoption across all sectors as productivity gains compound',
    impact: 82,
    industries: ['Technology', 'Manufacturing', 'Finance'],
  },
  {
    name: 'Sustainability Mandates',
    direction: 'Emerging',
    description: 'Regulatory push driving ESG investment and green supply chain transformation',
    impact: 68,
    industries: ['Energy', 'Manufacturing', 'Retail'],
  },
  {
    name: 'Supply Chain Reshoring',
    direction: 'Rising',
    description: 'Companies moving production closer to home markets to improve resilience',
    impact: 74,
    industries: ['Manufacturing', 'Retail', 'Technology'],
  },
];

const directionBadge = (direction: string) => {
  if (direction === 'Rising') return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Rising</Badge>;
  if (direction === 'Declining') return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Declining</Badge>;
  return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Emerging</Badge>;
};

const today = new Date();
const forecastRows = [
  { month: 'Jun 2026', gdp: '3.1%', inflation: '2.8%', marketGrowth: '4.2%', confidence: 'High' },
  { month: 'Jul 2026', gdp: '3.2%', inflation: '2.7%', marketGrowth: '4.4%', confidence: 'High' },
  { month: 'Aug 2026', gdp: '3.0%', inflation: '2.9%', marketGrowth: '4.1%', confidence: 'Medium' },
  { month: 'Sep 2026', gdp: '3.3%', inflation: '2.6%', marketGrowth: '4.6%', confidence: 'Medium' },
  { month: 'Oct 2026', gdp: '3.4%', inflation: '2.5%', marketGrowth: '4.8%', confidence: 'Medium' },
  { month: 'Nov 2026', gdp: '3.5%', inflation: '2.4%', marketGrowth: '5.0%', confidence: 'Low' },
];

const confidenceBadge = (level: string) => {
  if (level === 'High') return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">High</Badge>;
  if (level === 'Medium') return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Medium</Badge>;
  return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Low</Badge>;
};

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

          <TabsContent value="competitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>Market share, growth rates, and threat assessment for key competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-border text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Market Share</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Growth Rate</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Strengths</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Threat Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {competitors.map((c) => (
                        <tr key={c.company} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-medium">{c.company}</td>
                          <td className="px-4 py-3">{c.marketShare}</td>
                          <td className="px-4 py-3">{c.growthRate}</td>
                          <td className="px-4 py-3 text-muted-foreground">{c.strengths}</td>
                          <td className="px-4 py-3">{threatBadge(c.threat)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Response</CardTitle>
                <CardDescription>Recommended actions to maintain and improve your competitive position</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">Accelerate R&D investment to counter Competitor B's innovation advantage, targeting a 20% increase in new product launches over the next 12 months.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">Strengthen distribution partnerships and channel incentives to defend market share against Competitor A's broad reach, particularly in tier-2 markets.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">Establish a dedicated agility task force to monitor and rapidly respond to the New Entrant's technology-first strategies before they gain additional traction.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trends.map((trend) => (
                <Card key={trend.name}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{trend.name}</CardTitle>
                      {directionBadge(trend.direction)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Sector Impact</span>
                        <span className="font-medium">{trend.impact}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${trend.impact}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Affected Industries</p>
                      <div className="flex flex-wrap gap-1.5">
                        {trend.industries.map(ind => (
                          <Badge key={ind} variant="outline" className="text-xs">{ind}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>12-Month Economic Forecast</CardTitle>
                <CardDescription>Forward-looking projections for key economic indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-border text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Month</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">GDP Growth</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Inflation</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Market Growth</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {forecastRows.map((row) => (
                        <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-medium">{row.month}</td>
                          <td className="px-4 py-3">{row.gdp}</td>
                          <td className="px-4 py-3">{row.inflation}</td>
                          <td className="px-4 py-3">{row.marketGrowth}</td>
                          <td className="px-4 py-3">{confidenceBadge(row.confidence)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Assumptions</CardTitle>
                <CardDescription>Underlying assumptions driving this forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">Central bank maintains a gradual rate-cutting cycle through 2026, with no emergency policy reversals, supporting moderate GDP expansion and easing inflation toward the 2.4% target.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">Global supply chain conditions continue to normalize with no major geopolitical shocks, allowing inventory restocking to proceed and supporting positive market growth forecasts.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm">Consumer spending remains resilient, underpinned by a stable labor market with unemployment holding below 4.5%, sustaining demand-side growth drivers throughout the forecast horizon.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default IndustryInsightsPage;
