import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowUpRight, 
  CreditCard, 
  ShoppingCart, 
  TrendingUp, 
  Users
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import CreateSupplierForm from '@/components/CreateSupplierForm';
import SuppliersList from '@/components/SuppliersList';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import EnhancedAnalyticsCharts from '@/components/EnhancedAnalyticsCharts';

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Tableau de bord - EnterpriseFlow";
  }, []);

  // Animation for stats cards to appear with stagger effect
  useEffect(() => {
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-fade-in');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Gérez vos commandes et suivez l'activité des achats de votre entreprise.
          </p>
          <Separator className="my-2" />
        </div>
        
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
          </TabsContent>
          
          <TabsContent value="orders" className="animate-fade-in">
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Toutes les commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <PurchaseOrderTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suppliers" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Ajouter un fournisseur</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CreateSupplierForm />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Fournisseurs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SuppliersList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="animate-fade-in">
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Analyses et rapports</CardTitle>
              </CardHeader>
              <CardContent>
                <EnhancedAnalyticsCharts />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

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

export default Dashboard;
