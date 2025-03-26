
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowUpRight, 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Monthly spending data
const monthlySpendingData = [
  { name: 'Jan', amount: 4000, previous: 3200 },
  { name: 'Fév', amount: 3500, previous: 3800 },
  { name: 'Mar', amount: 5500, previous: 4200 },
  { name: 'Avr', amount: 4900, previous: 5100 },
  { name: 'Mai', amount: 6000, previous: 4800 },
  { name: 'Jun', amount: 5200, previous: 5500 },
  { name: 'Jul', amount: 4800, previous: 4600 },
  { name: 'Aoû', amount: 5800, previous: 5200 },
  { name: 'Sep', amount: 7000, previous: 5800 },
  { name: 'Oct', amount: 6500, previous: 6200 },
  { name: 'Nov', amount: 5500, previous: 6500 },
  { name: 'Déc', amount: 6800, previous: 6000 },
];

// Spending by category data
const spendingByCategoryData = [
  { name: 'Technologies', value: 32500, percent: 35 },
  { name: 'Fournitures', value: 18600, percent: 20 },
  { name: 'Services', value: 15800, percent: 17 },
  { name: 'Logistique', value: 12500, percent: 13 },
  { name: 'Marketing', value: 8400, percent: 9 },
  { name: 'Autres', value: 5600, percent: 6 },
];

// Top supplier data
const topSupplierData = [
  { name: 'TechSupplies Inc.', performance: 92, orders: 12, amount: 25800 },
  { name: 'Office Solutions', performance: 87, orders: 8, amount: 12400 },
  { name: 'Food Distribution Co.', performance: 95, orders: 18, amount: 32600 },
  { name: 'Medical Supplies Ltd.', performance: 89, orders: 15, amount: 28900 },
  { name: 'Textile Manufacturers', performance: 82, orders: 10, amount: 18500 },
];

// Budget forecast data
const budgetForecastData = [
  { name: 'T1', budget: 45000, actual: 42500, forecast: 45000 },
  { name: 'T2', budget: 55000, actual: 58000, forecast: 60000 },
  { name: 'T3', budget: 65000, actual: 62000, forecast: 68000 },
  { name: 'T4', budget: 75000, actual: 49000, forecast: 73000 },
];

// Order status data 
const orderStatusData = [
  { name: 'Livrées', value: 65 },
  { name: 'En cours', value: 25 },
  { name: 'En attente', value: 8 },
  { name: 'Annulées', value: 2 },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF', '#FF6B6B'];

const EnhancedAnalyticsCharts: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>('year');
  const [showPreviousYear, setShowPreviousYear] = useState<boolean>(true);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background shadow-md rounded p-3 border">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} €
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium">Tableau de bord analytique des achats</h3>
          <p className="text-muted-foreground">
            Visualisez les tendances et les performances des fournisseurs
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
            <option value="custom">Personnalisé</option>
          </select>
          
          {dateRange === 'custom' && (
            <div className="flex gap-2">
              <Input type="date" className="h-10 w-36" />
              <span className="self-center">à</span>
              <Input type="date" className="h-10 w-36" />
            </div>
          )}
          
          <Button variant="outline" size="sm">Appliquer</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Dépenses mensuelles</CardTitle>
              <CardDescription>Comparaison par mois</CardDescription>
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreviousYear(!showPreviousYear)}
                className={!showPreviousYear ? "opacity-50" : ""}
              >
                Année précédente
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySpendingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="amount" name="Dépenses (€)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  {showPreviousYear && (
                    <Bar dataKey="previous" name="Année précédente (€)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Dépenses par catégorie</CardTitle>
            <CardDescription>Répartition du budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendingByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} €`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-2">
              {spendingByCategoryData.map((category, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <span 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {category.name}
                  </div>
                  <span className="font-medium">{category.value.toLocaleString()} €</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" /> Performance fournisseurs
          </TabsTrigger>
          <TabsTrigger value="forecast" className="flex items-center gap-1">
            <LineChartIcon className="h-4 w-4" /> Prévisions
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-1">
            <PieChartIcon className="h-4 w-4" /> Statut des commandes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total des dépenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">195,400 €</div>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  +12% <ArrowUpRight className="h-3 w-3 ml-1" />
                  <span className="text-muted-foreground ml-1">vs l'année dernière</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Commandes par mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  +8% <ArrowUpRight className="h-3 w-3 ml-1" />
                  <span className="text-muted-foreground ml-1">vs mois dernier</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Coût moyen par commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,652 €</div>
                <p className="text-xs text-rose-500 flex items-center mt-1">
                  -3% <ArrowUpRight className="h-3 w-3 ml-1" />
                  <span className="text-muted-foreground ml-1">vs trimestre dernier</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des fournisseurs</CardTitle>
              <CardDescription>Classement basé sur la qualité, les délais et le prix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topSupplierData.map((supplier, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium">{supplier.name}</span>
                        <div className="text-sm text-muted-foreground flex gap-3 mt-1">
                          <span>{supplier.orders} commandes</span>
                          <span>{supplier.amount.toLocaleString()} €</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          supplier.performance > 90 ? 'text-emerald-600' : 
                          supplier.performance > 80 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {supplier.performance}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          supplier.performance > 90 ? 'bg-emerald-500' : 
                          supplier.performance > 80 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${supplier.performance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prévisions budgétaires</CardTitle>
              <CardDescription>Comparaison budget / dépenses réelles / prévisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={budgetForecastData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="budget" 
                      name="Budget planifié" 
                      stroke="#8884d8" 
                      fill="#c4b5fd" 
                      activeDot={{ r: 8 }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      name="Dépenses réelles" 
                      stroke="#4f46e5" 
                      fill="#818cf8" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      name="Prévisions" 
                      stroke="#0f766e" 
                      fill="#0d9488" 
                      strokeDasharray="5 5" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statut des commandes</CardTitle>
              <CardDescription>Répartition actuelle des commandes par statut</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-center">
              <div className="h-[250px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full md:w-1/2 space-y-3 mt-4 md:mt-0">
                {orderStatusData.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{status.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${status.value}%`, 
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                      <span className="font-medium">{status.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsCharts;
