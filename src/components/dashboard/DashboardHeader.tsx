
import React from 'react';
import { Separator } from "@/components/ui/separator";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
      <p className="text-muted-foreground">
        Gérez vos commandes et suivez l'activité des achats de votre entreprise.
      </p>
      <Separator className="my-2" />
    </div>
  );
};

export default DashboardHeader;
