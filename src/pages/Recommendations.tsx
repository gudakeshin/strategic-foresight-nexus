import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Clock, Target, Flag, CheckCircle, ArrowRight } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  impact: number;
  effort: number;
  status: 'pending' | 'in-progress' | 'implemented' | 'rejected';
  createdAt: string;
  source: 'AI' | 'Expert' | 'Data Analysis';
}

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
    source: 'Data Analysis'
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
    source: 'AI'
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
    source: 'Expert'
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
    source: 'Data Analysis'
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
    source: 'Expert'
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
    source: 'AI'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    case 'low':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'implemented':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-amber-100 text-amber-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RecommendationsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Strategic Recommendations</h1>
            <p className="text-muted-foreground">
              Actionable insights to drive strategic decision making
            </p>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Strategic actions based on scenarios and insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high">High Priority</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="implemented">Implemented</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {recommendationsData.map(recommendation => (
                  <Card key={recommendation.id} className="bg-muted/40 hover:bg-muted transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{recommendation.title}</h3>
                            <Badge 
                              variant="outline" 
                              className={getPriorityColor(recommendation.priority)}
                            >
                              {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(recommendation.status)}
                            >
                              {recommendation.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Category</p>
                          <Badge variant="outline" className="bg-gray-100">
                            {recommendation.category}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Impact/Effort</p>
                          <div className="text-sm">
                            <span className="font-medium text-green-600">{recommendation.impact}%</span>
                            <span className="text-muted-foreground"> / </span>
                            <span className="font-medium text-amber-600">{recommendation.effort}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Created</p>
                            <div className="flex items-center text-sm gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{recommendation.createdAt}</span>
                            </div>
                          </div>
                          <div>
                            <Badge className="bg-blue-100 text-blue-800">
                              {recommendation.source}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="high" className="space-y-4">
                {recommendationsData
                  .filter(rec => rec.priority === 'high')
                  .map(recommendation => (
                    <Card key={recommendation.id} className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{recommendation.title}</h3>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(recommendation.priority)}
                              >
                                {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getStatusColor(recommendation.status)}
                              >
                                {recommendation.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Category</p>
                            <Badge variant="outline" className="bg-gray-100">
                              {recommendation.category}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Impact/Effort</p>
                            <div className="text-sm">
                              <span className="font-medium text-green-600">{recommendation.impact}%</span>
                              <span className="text-muted-foreground"> / </span>
                              <span className="font-medium text-amber-600">{recommendation.effort}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Created</p>
                              <div className="flex items-center text-sm gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{recommendation.createdAt}</span>
                              </div>
                            </div>
                            <div>
                              <Badge className="bg-blue-100 text-blue-800">
                                {recommendation.source}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {recommendationsData
                  .filter(rec => rec.status === 'pending')
                  .map(recommendation => (
                    <Card key={recommendation.id} className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{recommendation.title}</h3>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(recommendation.priority)}
                              >
                                {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getStatusColor(recommendation.status)}
                              >
                                {recommendation.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Category</p>
                            <Badge variant="outline" className="bg-gray-100">
                              {recommendation.category}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Impact/Effort</p>
                            <div className="text-sm">
                              <span className="font-medium text-green-600">{recommendation.impact}%</span>
                              <span className="text-muted-foreground"> / </span>
                              <span className="font-medium text-amber-600">{recommendation.effort}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Created</p>
                              <div className="flex items-center text-sm gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{recommendation.createdAt}</span>
                              </div>
                            </div>
                            <div>
                              <Badge className="bg-blue-100 text-blue-800">
                                {recommendation.source}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="in-progress" className="space-y-4">
                {recommendationsData
                  .filter(rec => rec.status === 'in-progress')
                  .map(recommendation => (
                    <Card key={recommendation.id} className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{recommendation.title}</h3>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(recommendation.priority)}
                              >
                                {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getStatusColor(recommendation.status)}
                              >
                                {recommendation.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Category</p>
                            <Badge variant="outline" className="bg-gray-100">
                              {recommendation.category}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Impact/Effort</p>
                            <div className="text-sm">
                              <span className="font-medium text-green-600">{recommendation.impact}%</span>
                              <span className="text-muted-foreground"> / </span>
                              <span className="font-medium text-amber-600">{recommendation.effort}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Created</p>
                              <div className="flex items-center text-sm gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{recommendation.createdAt}</span>
                              </div>
                            </div>
                            <div>
                              <Badge className="bg-blue-100 text-blue-800">
                                {recommendation.source}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="implemented" className="space-y-4">
                {recommendationsData
                  .filter(rec => rec.status === 'implemented')
                  .map(recommendation => (
                    <Card key={recommendation.id} className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{recommendation.title}</h3>
                              <Badge
                                variant="outline"
                                className={getPriorityColor(recommendation.priority)}
                              >
                                {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getStatusColor(recommendation.status)}
                              >
                                {recommendation.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Category</p>
                            <Badge variant="outline" className="bg-gray-100">
                              {recommendation.category}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Impact/Effort</p>
                            <div className="text-sm">
                              <span className="font-medium text-green-600">{recommendation.impact}%</span>
                              <span className="text-muted-foreground"> / </span>
                              <span className="font-medium text-amber-600">{recommendation.effort}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Created</p>
                              <div className="flex items-center text-sm gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{recommendation.createdAt}</span>
                              </div>
                            </div>
                            <div>
                              <Badge className="bg-blue-100 text-blue-800">
                                {recommendation.source}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecommendationsPage;
