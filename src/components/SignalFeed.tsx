
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Signal } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

interface SignalFeedProps {
  signals: Signal[];
}

const SignalFeed: React.FC<SignalFeedProps> = ({ signals }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40">High Impact</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/40">Medium Impact</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recent Signals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[500px]">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="p-4 border rounded-lg bg-card shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-base">{signal.title}</h3>
              <span className="text-xs text-muted-foreground">{formatDate(signal.date)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{signal.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">{signal.category}</Badge>
              {getImpactBadge(signal.impact)}
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Source:</span> {signal.source}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">Affected Industries:</span> {signal.industries.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SignalFeed;
