import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MessageSquare, Flag, Target, CheckCircle } from 'lucide-react';
import RecommendationCard, { type Recommendation } from '@/components/RecommendationCard';
import { toast } from 'sonner';

const initialRecommendations: Recommendation[] = [
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

const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestTopic, setRequestTopic] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestPriority, setRequestPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [requestType, setRequestType] = useState<'AI' | 'Expert' | 'Data Analysis'>('AI');

  const handleSubmitRequest = () => {
    if (!requestTopic.trim()) return;

    const today = new Date().toISOString().slice(0, 10);
    const newRec: Recommendation = {
      id: String(Date.now()),
      title: requestTopic,
      description: requestDescription || 'Requested recommendation pending analysis.',
      category: 'Strategic',
      priority: requestPriority,
      impact: 50,
      effort: 50,
      status: 'pending',
      createdAt: today,
      source: requestType,
    };

    setRecommendations(prev => [newRec, ...prev]);
    setShowRequestDialog(false);
    setRequestTopic('');
    setRequestDescription('');
    setRequestPriority('medium');
    setRequestType('AI');
    toast.success('Recommendation requested successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Strategic Recommendations</h1>
            <p className="text-muted-foreground">Actionable insights to drive strategic decision making</p>
          </div>
          <Button className="flex gap-2" onClick={() => setShowRequestDialog(true)}>
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
              <p className="text-3xl font-bold">{recommendations.length}</p>
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
              <p className="text-3xl font-bold">{recommendations.filter(r => r.priority === 'high').length}</p>
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
              <p className="text-3xl font-bold">{recommendations.filter(r => r.status === 'in-progress').length}</p>
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
              <p className="text-3xl font-bold">{recommendations.filter(r => r.status === 'implemented').length}</p>
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
                  {recommendations.filter(t.filter).map(r => (
                    <RecommendationCard key={r.id} recommendation={r} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Request Recommendation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="req-topic">Topic</Label>
              <Input
                id="req-topic"
                placeholder="What topic do you need a recommendation on?"
                value={requestTopic}
                onChange={e => setRequestTopic(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="req-description">Description</Label>
              <Textarea
                id="req-description"
                placeholder="Provide additional context or specific questions..."
                value={requestDescription}
                onChange={e => setRequestDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="req-priority">Priority</Label>
                <Select
                  value={requestPriority}
                  onValueChange={v => setRequestPriority(v as 'high' | 'medium' | 'low')}
                >
                  <SelectTrigger id="req-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="req-type">Type</Label>
                <Select
                  value={requestType}
                  onValueChange={v => setRequestType(v as 'AI' | 'Expert' | 'Data Analysis')}
                >
                  <SelectTrigger id="req-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                    <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitRequest} disabled={!requestTopic.trim()}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default RecommendationsPage;
