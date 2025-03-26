
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from './DashboardOverview';
import DashboardOrders from './DashboardOrders';
import DashboardSuppliers from './DashboardSuppliers';
import DashboardAnalytics from './DashboardAnalytics';

const DashboardTabs: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4 bg-muted/50 p-1">
        <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Vue d'ensemble
        </TabsTrigger>
        <TabsTrigger value="orders" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Commandes
        </TabsTrigger>
        <TabsTrigger value="suppliers" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Fournisseurs
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
          Analyses
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <DashboardOverview />
      </TabsContent>
      
      <TabsContent value="orders" className="animate-fade-in">
        <DashboardOrders />
      </TabsContent>
      
      <TabsContent value="suppliers" className="animate-fade-in">
        <DashboardSuppliers />
      </TabsContent>
      
      <TabsContent value="analytics" className="animate-fade-in">
        <DashboardAnalytics />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
