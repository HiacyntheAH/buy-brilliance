
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Calendar, FileBarChart } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </span>
      </div>
      <p className="text-muted-foreground">
        Gérez vos commandes et suivez l'activité des achats de votre entreprise.
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileBarChart className="h-4 w-4" />
        <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default DashboardHeader;
