
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendLabel?: string;
  trendUp?: boolean;
  progress?: number;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, value, trend, trendLabel, trendUp, progress, icon, className 
}) => {
  return (
    <Card className={`hover-lift transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {progress !== undefined && (
          <>
            <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% du budget annuel
            </p>
          </>
        )}
        
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className={`${trendUp ? 'text-emerald-500' : 'text-rose-500'} font-medium flex items-center`}>
              {trend} <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
            {trendLabel && <span className="ml-1">{trendLabel}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
