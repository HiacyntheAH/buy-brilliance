
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import CreateSupplierForm from '@/components/CreateSupplierForm';
import SuppliersList from '@/components/SuppliersList';

const DashboardSuppliers: React.FC = () => {
  return (
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
  );
};

export default DashboardSuppliers;
