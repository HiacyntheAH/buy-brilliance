
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import PurchaseOrderTable from '@/components/PurchaseOrderTable';

const DashboardOrders: React.FC = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Toutes les commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <PurchaseOrderTable />
      </CardContent>
    </Card>
  );
};

export default DashboardOrders;
