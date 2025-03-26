
import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the charts
const monthlySpending = [
  { name: 'Jan', amount: 12500 },
  { name: 'Fév', amount: 15200 },
  { name: 'Mar', amount: 18900 },
  { name: 'Avr', amount: 13600 },
  { name: 'Mai', amount: 16700 },
  { name: 'Juin', amount: 22300 },
  { name: 'Juil', amount: 19800 },
  { name: 'Août', amount: 24100 },
  { name: 'Sep', amount: 17500 },
  { name: 'Oct', amount: 14900 },
  { name: 'Nov', amount: 21200 },
  { name: 'Déc', amount: 26500 },
];

const categoryDistribution = [
  { name: 'Technologie', value: 35 },
  { name: 'Fournitures', value: 25 },
  { name: 'Services', value: 20 },
  { name: 'Logistique', value: 15 },
  { name: 'Fabrication', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28AFF'];

const supplierPerformance = [
  { name: 'TechSupplies', quality: 4.2, delivery: 3.8, price: 3.5 },
  { name: 'Office Sol.', quality: 3.9, delivery: 4.5, price: 4.0 },
  { name: 'Global Log.', quality: 3.2, delivery: 4.7, price: 3.8 },
  { name: 'Creative Des.', quality: 4.7, delivery: 3.5, price: 3.2 },
  { name: 'Industrial', quality: 3.6, delivery: 3.9, price: 4.5 },
];

const AnalyticsCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="spending" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="spending">Dépenses</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dépenses mensuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySpending}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} €`, 'Montant']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="amount" name="Montant (€)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="border rounded-md p-4">
                  <p className="text-muted-foreground text-sm">Total Annuel</p>
                  <p className="text-2xl font-bold mt-1">
                    {monthlySpending.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} €
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <p className="text-muted-foreground text-sm">Moyenne Mensuelle</p>
                  <p className="text-2xl font-bold mt-1">
                    {Math.round(monthlySpending.reduce((sum, item) => sum + item.amount, 0) / monthlySpending.length).toLocaleString()} €
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <p className="text-muted-foreground text-sm">Mois Max</p>
                  <p className="text-2xl font-bold mt-1">
                    {Math.max(...monthlySpending.map(item => item.amount)).toLocaleString()} €
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution par catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Répartition des dépenses</h4>
                  <p className="text-muted-foreground text-sm">
                    La technologie représente la plus grande partie de nos dépenses, suivie par les fournitures de bureau et les services externes.
                  </p>
                  <div className="space-y-3 mt-4">
                    {categoryDistribution.map((cat, index) => (
                      <div key={cat.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{cat.name}</span>
                          <span className="text-sm text-muted-foreground">{cat.value}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${cat.value}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des fournisseurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={supplierPerformance}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="quality" 
                      name="Qualité" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="delivery" 
                      name="Livraison" 
                      stroke="#82ca9d" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      name="Prix" 
                      stroke="#ffc658" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="mb-2">
                  <span className="font-medium">Note :</span> Performance évaluée sur une échelle de 1 à 5 (5 étant excellent).
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Qualité : Qualité des produits ou services fournis</li>
                  <li>Livraison : Respect des délais de livraison</li>
                  <li>Prix : Rapport qualité-prix</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsCharts;
