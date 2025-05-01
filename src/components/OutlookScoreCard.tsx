
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, Minus } from 'lucide-react';
import { IndustryOutlook, TrendDirection } from '@/lib/mock-data';

interface OutlookScoreCardProps {
  outlook: IndustryOutlook;
}

const OutlookScoreCard: React.FC<OutlookScoreCardProps> = ({ outlook }) => {
  const { industry, score, previousScore, trendDirection, riskLevel } = outlook;
  const scoreDiff = score - previousScore;

  const getTrendIcon = (trend: TrendDirection) => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <span>{industry}</span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getRiskBadgeClass(riskLevel)}`}>
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Outlook Score</p>
            <div className="text-3xl font-bold">{score}</div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {getTrendIcon(trendDirection)}
            <span className={`font-medium ${trendDirection === 'up' ? 'text-green-500' : trendDirection === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
              {Math.abs(scoreDiff)}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                score >= 70 ? 'bg-green-500' : 
                score >= 50 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutlookScoreCard;
