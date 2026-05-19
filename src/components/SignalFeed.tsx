
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Signal } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';

interface SignalFeedProps {
  signals?: Signal[];
  limit?: number;
}

const SignalFeed: React.FC<SignalFeedProps> = ({ signals = [], limit }) => {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

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

  const displayedSignals = limit ? signals.slice(0, limit) : signals;

  return (
    <>
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
                    onClick={() => setSelectedSignal(signal)}
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

      <Sheet open={selectedSignal !== null} onOpenChange={(open) => { if (!open) setSelectedSignal(null); }}>
        <SheetContent className="w-[420px] sm:w-[540px] overflow-y-auto">
          {selectedSignal && (
            <>
              <SheetHeader className="mb-4">
                <SheetTitle className="text-xl">{selectedSignal.title}</SheetTitle>
              </SheetHeader>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    {selectedSignal.category}
                  </Badge>
                  {getImpactBadge(selectedSignal.impact)}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Date</p>
                    <p className="font-medium">{formatDate(selectedSignal.date)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Source</p>
                    <p className="font-medium">{selectedSignal.source}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs mb-1">Signal Strength</p>
                  <div className="flex items-center gap-3">
                    <Progress value={selectedSignal.signal_strength} className="flex-1" />
                    <span className="text-sm font-medium w-10 text-right">{selectedSignal.signal_strength}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs mb-2">Description</p>
                  <p className="text-sm leading-relaxed">{selectedSignal.description}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs mb-2">Affected Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSignal.industries.map((ind) => (
                      <Badge key={ind} variant="outline" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedSignal.related_indicators.length > 0 && (
                  <div>
                    <p className="text-muted-foreground text-xs mb-2">Related Indicators</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSignal.related_indicators.map((ind) => (
                        <Badge key={ind} variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                          {ind.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SignalFeed;
