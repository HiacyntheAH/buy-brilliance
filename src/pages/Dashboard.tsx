
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, CreditCard, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Tableau de bord - EnterpriseFlow";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Gérez vos commandes et suivez l'activité des achats de votre entreprise.
          </p>
          <Separator className="my-2" />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Commandes du mois
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium flex items-center">
                      +18% <ArrowUpRight className="h-3 w-3 ml-1" />
                    </span>
                    <span className="ml-1">depuis le mois dernier</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Budget utilisé
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€158,432</div>
                  <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    65% du budget annuel
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Fournisseurs actifs
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium flex items-center">
                      +4 <ArrowUpRight className="h-3 w-3 ml-1" />
                    </span>
                    <span className="ml-1">nouveaux ce trimestre</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Économies réalisées
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€42,389</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-emerald-500 font-medium flex items-center">
                      +12.5% <ArrowUpRight className="h-3 w-3 ml-1" />
                    </span>
                    <span className="ml-1">par rapport aux prévisions</span>
                  </p>
                </CardContent>
              </Card>
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
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>Gestion des fournisseurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  <p>Module de gestion des fournisseurs en cours de développement.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
