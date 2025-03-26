
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { CreditCard, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import StatsCard from './StatsCard';

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Commandes du mois" 
          value="127"
          trend="+18%"
          icon={<ShoppingCart className="h-4 w-4 text-primary" />}
          trendUp={true}
          className="stats-card opacity-0"
        />
        
        <StatsCard 
          title="Budget utilisé" 
          value="€158,432"
          progress={65}
          icon={<CreditCard className="h-4 w-4 text-primary" />}
          className="stats-card opacity-0"
        />
        
        <StatsCard 
          title="Fournisseurs actifs" 
          value="48"
          trend="+4"
          trendLabel="nouveaux ce trimestre"
          icon={<Users className="h-4 w-4 text-primary" />}
          trendUp={true}
          className="stats-card opacity-0"
        />
        
        <StatsCard 
          title="Économies réalisées" 
          value="€42,389"
          trend="+12.5%"
          trendLabel="par rapport aux prévisions"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          trendUp={true}
          className="stats-card opacity-0"
        />
      </div>
      
      <Card className="shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle>Liste des commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <PurchaseOrderTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
