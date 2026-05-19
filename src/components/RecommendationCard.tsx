import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';

export interface Recommendation {
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

const priorityClass: Record<Recommendation['priority'], string> = {
  high: 'bg-red-100 text-red-800 hover:bg-red-200',
  medium: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  low: 'bg-green-100 text-green-800 hover:bg-green-200',
};

const statusClass: Record<Recommendation['status'], string> = {
  implemented: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-amber-100 text-amber-800',
  rejected: 'bg-red-100 text-red-800',
};

const formatStatus = (s: Recommendation['status']) =>
  s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation: r }) => (
  <Card className="bg-muted/40 hover:bg-muted transition-colors">
    <CardContent className="p-4">
      <div className="flex justify-between mb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium">{r.title}</h3>
            <Badge variant="outline" className={priorityClass[r.priority]}>
              {r.priority.charAt(0).toUpperCase() + r.priority.slice(1)} Priority
            </Badge>
            <Badge variant="outline" className={statusClass[r.status]}>
              {formatStatus(r.status)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{r.description}</p>
        </div>
        <Button variant="ghost" size="icon">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Category</p>
          <Badge variant="outline" className="bg-gray-100">{r.category}</Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Impact / Effort</p>
          <div className="text-sm">
            <span className="font-medium text-green-600">{r.impact}%</span>
            <span className="text-muted-foreground"> / </span>
            <span className="font-medium text-amber-600">{r.effort}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Created</p>
            <div className="flex items-center text-sm gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{r.createdAt}</span>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">{r.source}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default RecommendationCard;
