import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Flag, Target, CheckCircle } from 'lucide-react';
import RecommendationCard, { type Recommendation } from '@/components/RecommendationCard';

const recommendationsData: Recommendation[] = [
  {
    id: '1',
    title: 'Diversify Supply Chain Networks',
    description: 'Reduce dependency on single-region suppliers by establishing alternative sourcing in at least two additional regions.',
    category: 'Operations',
    priority: 'high',
    impact: 85,
    effort: 70,
    status: 'pending',
    createdAt: '2025-04-15',
    source: 'Data Analysis',
  },
  {
    id: '2',
    title: 'Implement Predictive Maintenance',
    description: 'Deploy IoT sensors and AI-based predictive maintenance to reduce equipment downtime by 35%.',
    category: 'Technology',
    priority: 'medium',
    impact: 75,
    effort: 60,
    status: 'in-progress',
    createdAt: '2025-04-10',
    source: 'AI',
  },
  {
    id: '3',
    title: 'Develop Sustainability Initiative',
    description: 'Launch a comprehensive sustainability program to reduce carbon footprint by 20% within 18 months.',
    category: 'Strategic',
    priority: 'medium',
    impact: 65,
    effort: 80,
    status: 'pending',
    createdAt: '2025-04-05',
    source: 'Expert',
  },
  {
    id: '4',
    title: 'Explore New Market Segment',
    description: 'Target the emerging eco-conscious consumer segment with specialized product offerings.',
    category: 'Market',
    priority: 'high',
    impact: 90,
    effort: 85,
    status: 'pending',
    createdAt: '2025-04-20',
    source: 'Data Analysis',
  },
  {
    id: '5',
    title: 'Optimize Digital Customer Journey',
    description: 'Redesign the online customer experience to improve conversion rates by at least 15%.',
    category: 'Customer',
    priority: 'medium',
    impact: 80,
    effort: 65,
    status: 'in-progress',
    createdAt: '2025-03-30',
    source: 'Expert',
  },
  {
    id: '6',
    title: 'Implement Dynamic Pricing Strategy',
    description: 'Develop an AI-driven pricing model that responds to market conditions in real-time.',
    category: 'Market',
    priority: 'low',
    impact: 70,
    effort: 50,
    status: 'implemented',
    createdAt: '2025-03-15',
    source: 'AI',
  },
];

interface TabConfig {
  value: string;
  label: string;
  filter: (r: Recommendation) => boolean;
}

const tabs: TabConfig[] = [
  { value: 'all', label: 'All', filter: () => true },
  { value: 'high', label: 'High Priority', filter: r => r.priority === 'high' },
  { value: 'pending', label: 'Pending', filter: r => r.status === 'pending' },
  { value: 'in-progress', label: 'In Progress', filter: r => r.status === 'in-progress' },
  { value: 'implemented', label: 'Implemented', filter: r => r.status === 'implemented' },
];

const RecommendationsPage: React.FC = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Strategic Recommendations</h1>
          <p className="text-muted-foreground">Actionable insights to drive strategic decision making</p>
        </div>
        <Button className="flex gap-2">
          <MessageSquare className="h-4 w-4" />
          Request Recommendation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recommendationsData.length}</p>
            <p className="text-sm text-muted-foreground">Active recommendations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flag className="h-5 w-5 text-red-500" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recommendationsData.filter(r => r.priority === 'high').length}</p>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-amber-500" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recommendationsData.filter(r => r.status === 'in-progress').length}</p>
            <p className="text-sm text-muted-foreground">Currently being implemented</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Implemented
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recommendationsData.filter(r => r.status === 'implemented').length}</p>
            <p className="text-sm text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Strategic actions based on scenarios and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              {tabs.map(t => (
                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(t => (
              <TabsContent key={t.value} value={t.value} className="space-y-4">
                {recommendationsData.filter(t.filter).map(r => (
                  <RecommendationCard key={r.id} recommendation={r} />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default RecommendationsPage;
