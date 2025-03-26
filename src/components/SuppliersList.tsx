
import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from 'sonner';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
}

const mockSuppliers: Supplier[] = [
  {
    id: 'supp-001',
    name: 'TechSupplies Inc.',
    email: 'contact@techsupplies.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Avenue de la République, 75011 Paris, France',
    category: 'Technology',
    status: 'active',
  },
  {
    id: 'supp-002',
    name: 'Office Solutions',
    email: 'info@officesolutions.fr',
    phone: '+33 6 12 34 56 78',
    address: '45 Rue du Commerce, 69002 Lyon, France',
    category: 'Office',
    status: 'active',
  },
  {
    id: 'supp-003',
    name: 'Global Logistics',
    email: 'contact@globallogistics.fr',
    phone: '+33 4 56 78 90 12',
    address: '78 Boulevard Haussmann, 75008 Paris, France',
    category: 'Logistics',
    status: 'inactive',
  },
];

const SuppliersList: React.FC = () => {
  const handleEdit = (id: string) => {
    console.log('Edit supplier', id);
    toast.info(`Modification du fournisseur ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('Delete supplier', id);
    toast.success(`Fournisseur ${id} supprimé`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Liste des fournisseurs</h3>
          <p className="text-sm text-muted-foreground">
            {mockSuppliers.length} fournisseurs trouvés
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Exporter
          </Button>
          <Button size="sm">Actualiser</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockSuppliers.map((supplier) => (
          <div 
            key={supplier.id}
            className="border rounded-md p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">{supplier.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    supplier.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {supplier.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>{supplier.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex sm:flex-col gap-2 self-start ml-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(supplier.id)}
                  className="h-8"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Modifier
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(supplier.id)}
                  className="h-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersList;
