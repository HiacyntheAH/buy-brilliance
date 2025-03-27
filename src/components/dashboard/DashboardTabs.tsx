
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from './DashboardOverview';

const DashboardTabs: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4 bg-muted/50 p-1">
        <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Vue d'ensemble
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <DashboardOverview />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
