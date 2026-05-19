
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Signal } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface SignalFeedProps {
  signals?: Signal[];
  limit?: number;
}

const SignalFeed: React.FC<SignalFeedProps> = ({ signals = [], limit }) => {
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
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Medium Impact</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Low Impact</Badge>;
      default:
        return null;
    }
  };

  // Apply the limit if provided
  const displayedSignals = limit ? signals.slice(0, limit) : signals;

  return (
    <div className="space-y-4 overflow-auto max-h-[600px] pr-1">
      {displayedSignals.map((signal) => (
        <Card
          key={signal.id}
          className="border border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md"
        >
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-semibold text-gray-800">{signal.title}</CardTitle>
              <span className="text-xs text-gray-500 font-medium">{formatDate(signal.date)}</span>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <p className="text-sm text-gray-600 mb-3">{signal.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-800 hover:bg-gray-100">
                {signal.category}
              </Badge>
              {getImpactBadge(signal.impact)}
            </div>
            <div className="mt-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Source:</span> {signal.source}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center text-primary text-xs font-medium hover:underline"
                  onClick={() => {}}
                >
                  View Details <ExternalLink className="ml-1 h-3 w-3" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Affected Industries:</span> {signal.industries.join(', ')}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SignalFeed;
