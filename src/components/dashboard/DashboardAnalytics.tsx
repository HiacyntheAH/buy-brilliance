
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import EnhancedAnalyticsCharts from '@/components/EnhancedAnalyticsCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Download, FileBarChart2, TrendingUp, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Pie, PieChart, Cell } from 'recharts';

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

const categorySpending = [
  { name: 'Technologie', value: 42 },
  { name: 'Fournitures', value: 28 },
  { name: 'Services', value: 16 },
  { name: 'Logistique', value: 9 },
  { name: 'Autre', value: 5 },
];

const COLORS = ['#9b87f5', '#33C3F0', '#F97316', '#D946EF', '#8E9196'];

const supplierPerformance = [
  { name: 'TechSupplies Inc.', rating: 4.8, orders: 12, onTime: 95, quality: 92 },
  { name: 'Office Solutions', rating: 4.2, orders: 8, onTime: 88, quality: 85 },
  { name: 'Global Logistics', rating: 3.7, orders: 5, onTime: 72, quality: 78 },
  { name: 'Food Distribution Co.', rating: 4.6, orders: 18, onTime: 91, quality: 90 },
  { name: 'Medical Supplies Ltd.', rating: 4.5, orders: 15, onTime: 94, quality: 89 },
];

const DashboardAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('year');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Analyses et Rapports</h2>
          <p className="text-muted-foreground">Visualisez les tendances et les performances d'achat</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Exporter
          </Button>
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
            <option value="all">Toutes les données</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="spending">Dépenses</TabsTrigger>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <EnhancedAnalyticsCharts />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  Dépenses mensuelles
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
                  <BarChart data={monthlySpending}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" name="Montant (€)" fill="var(--color-amount)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <FileBarChart2 className="h-4 w-4 mr-2 text-primary" />
                  Répartition par catégorie
                </CardTitle>
                <CardDescription>Dépenses par catégorie de produits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categorySpending.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des dépenses</CardTitle>
              <CardDescription>
                Visualisation détaillée des dépenses de l'entreprise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    theme: {
                      light: "#7E69AB",
                      dark: "#9b87f5",
                    },
                  },
                }}
                className="aspect-[3/2]"
              >
                <LineChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Montant (€)" 
                    stroke="var(--color-amount)" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Performance des fournisseurs
              </CardTitle>
              <CardDescription>
                Évaluation des fournisseurs par critères de performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Fournisseur</th>
                      <th className="py-3 px-4 text-left font-medium">Note</th>
                      <th className="py-3 px-4 text-left font-medium">Commandes</th>
                      <th className="py-3 px-4 text-left font-medium">Livraison à temps</th>
                      <th className="py-3 px-4 text-left font-medium">Qualité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierPerformance.map((supplier) => (
                      <tr key={supplier.name} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{supplier.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className={`font-medium ${
                              supplier.rating >= 4.5 ? 'text-green-600' : 
                              supplier.rating >= 4.0 ? 'text-blue-600' : 
                              supplier.rating >= 3.5 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {supplier.rating}
                            </span>
                            <div className="w-24 h-2 bg-gray-200 rounded ml-2">
                              <div 
                                className={`h-full rounded ${
                                  supplier.rating >= 4.5 ? 'bg-green-500' : 
                                  supplier.rating >= 4.0 ? 'bg-blue-500' : 
                                  supplier.rating >= 3.5 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(supplier.rating / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{supplier.orders}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="mr-2">{supplier.onTime}%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded">
                              <div 
                                className={`h-full rounded ${
                                  supplier.onTime >= 90 ? 'bg-green-500' : 
                                  supplier.onTime >= 80 ? 'bg-blue-500' : 
                                  supplier.onTime >= 70 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${supplier.onTime}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="mr-2">{supplier.quality}%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded">
                              <div 
                                className={`h-full rounded ${
                                  supplier.quality >= 90 ? 'bg-green-500' : 
                                  supplier.quality >= 80 ? 'bg-blue-500' : 
                                  supplier.quality >= 70 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${supplier.quality}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAnalytics;
