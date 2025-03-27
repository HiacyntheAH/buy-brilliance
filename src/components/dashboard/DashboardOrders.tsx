
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';
import CreateOrderForm from '@/components/CreateOrderForm';

const DashboardOrders: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une commande</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateOrderForm />
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>Toutes les commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <PurchaseOrderTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOrders;
