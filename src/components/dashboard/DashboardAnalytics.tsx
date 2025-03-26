
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import EnhancedAnalyticsCharts from '@/components/EnhancedAnalyticsCharts';

const DashboardAnalytics: React.FC = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Analyses et rapports</CardTitle>
      </CardHeader>
      <CardContent>
        <EnhancedAnalyticsCharts />
      </CardContent>
    </Card>
  );
};

export default DashboardAnalytics;
