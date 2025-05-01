
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, Minus, TrendingUp, TrendingDown } from 'lucide-react';
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
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'high':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-gray-200 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-800">{industry}</CardTitle>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskBadgeClass(riskLevel)}`}>
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Outlook Score</p>
            <div className="text-3xl font-bold text-gray-900">{score}</div>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon(trendDirection)}
            <span className={`font-medium ${
              trendDirection === 'up' 
                ? 'text-green-500' 
                : trendDirection === 'down' 
                ? 'text-red-500' 
                : 'text-gray-500'
            }`}>
              {Math.abs(scoreDiff)}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getScoreColorClass(score)}`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Bearish</span>
            <span>Neutral</span>
            <span>Bullish</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutlookScoreCard;
