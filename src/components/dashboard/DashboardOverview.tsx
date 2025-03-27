
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard, ShoppingCart, TrendingUp, Users, FileBarChart2 } from 'lucide-react';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import StatsCard from './StatsCard';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Données pour les charts
const monthlySpending = [
  { name: 'Jan', amount: 12500 },
  { name: 'Fév', amount: 9800 },
  { name: 'Mar', amount: 15600 },
  { name: 'Avr', amount: 8400 },
  { name: 'Mai', amount: 11200 },
  { name: 'Juin', amount: 14300 },
  { name: 'Juil', amount: 19200 },
  { name: 'Août', amount: 16800 },
  { name: 'Sept', amount: 22400 },
  { name: 'Oct', amount: 18700 },
  { name: 'Nov', amount: 23500 },
  { name: 'Déc', amount: 27800 },
];

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
      
      <Card className="shadow-sm hover:shadow-md transition-all duration-300 mb-6">
        <CardHeader>
          <CardTitle>Liste des commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <PurchaseOrderTable />
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileBarChart2 className="h-4 w-4 mr-2 text-primary" />
            Analyse des dépenses mensuelles
          </CardTitle>
          <CardDescription>Total des achats par mois</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amount: {
                theme: {
                  light: "#9b87f5",
                  dark: "#9b87f5",
                },
              },
            }}
            className="aspect-[4/3]"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpending}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" name="Montant (€)" fill="var(--color-amount)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
