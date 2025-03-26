
import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Edit, 
  Trash2,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  products?: string[];
  lastOrder?: string;
  totalOrders?: number;
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
    products: ['Laptops', 'Monitors', 'Keyboards'],
    lastOrder: '2023-10-15',
    totalOrders: 12
  },
  {
    id: 'supp-002',
    name: 'Office Solutions',
    email: 'info@officesolutions.fr',
    phone: '+33 6 12 34 56 78',
    address: '45 Rue du Commerce, 69002 Lyon, France',
    category: 'Office',
    status: 'active',
    products: ['Paper', 'Printers', 'Ink cartridges'],
    lastOrder: '2023-09-28',
    totalOrders: 8
  },
  {
    id: 'supp-003',
    name: 'Global Logistics',
    email: 'contact@globallogistics.fr',
    phone: '+33 4 56 78 90 12',
    address: '78 Boulevard Haussmann, 75008 Paris, France',
    category: 'Logistics',
    status: 'inactive',
    products: ['Shipping services', 'Packaging', 'Transport'],
    lastOrder: '2023-08-10',
    totalOrders: 5
  },
  {
    id: 'supp-004',
    name: 'Food Distribution Co.',
    email: 'contact@fooddistribution.fr',
    phone: '+33 7 11 22 33 44',
    address: '15 Avenue des Champs-Élysées, 75008 Paris, France',
    category: 'Food',
    status: 'active',
    products: ['Fresh produce', 'Dairy', 'Beverages'],
    lastOrder: '2023-10-22',
    totalOrders: 18
  },
  {
    id: 'supp-005',
    name: 'Medical Supplies Ltd.',
    email: 'info@medicalsupplies.fr',
    phone: '+33 6 55 66 77 88',
    address: '55 Rue de la Santé, 75013 Paris, France',
    category: 'Medical',
    status: 'active',
    products: ['Gloves', 'Masks', 'Sanitizers'],
    lastOrder: '2023-10-18',
    totalOrders: 15
  },
  {
    id: 'supp-006',
    name: 'Construction Materials',
    email: 'sales@constructionmaterials.fr',
    phone: '+33 1 98 76 54 32',
    address: '22 Rue du Bâtiment, 69003 Lyon, France',
    category: 'Construction',
    status: 'inactive',
    products: ['Cement', 'Steel', 'Wood'],
    lastOrder: '2023-07-05',
    totalOrders: 3
  },
  {
    id: 'supp-007',
    name: 'Textile Manufacturers',
    email: 'info@textilemanufacturers.fr',
    phone: '+33 4 11 22 33 44',
    address: '88 Rue du Textile, 59000 Lille, France',
    category: 'Textile',
    status: 'active',
    products: ['Cotton', 'Silk', 'Wool'],
    lastOrder: '2023-09-30',
    totalOrders: 10
  }
];

const SuppliersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleEdit = (id: string) => {
    console.log('Edit supplier', id);
    toast.info(`Modification du fournisseur ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('Delete supplier', id);
    toast.success(`Fournisseur ${id} supprimé`);
  };

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const filteredSuppliers = mockSuppliers
    .filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(supplier => categoryFilter === 'all' || supplier.category.toLowerCase() === categoryFilter.toLowerCase())
    .filter(supplier => statusFilter === 'all' || supplier.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'category') {
        return sortDirection === 'asc' 
          ? a.category.localeCompare(b.category) 
          : b.category.localeCompare(a.category);
      } else if (sortBy === 'totalOrders' && a.totalOrders !== undefined && b.totalOrders !== undefined) {
        return sortDirection === 'asc' 
          ? a.totalOrders - b.totalOrders 
          : b.totalOrders - a.totalOrders;
      }
      return 0;
    });

  const uniqueCategories = Array.from(new Set(mockSuppliers.map(s => s.category)));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Liste des fournisseurs</h3>
          <p className="text-sm text-muted-foreground">
            {filteredSuppliers.length} fournisseurs trouvés
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Exporter
          </Button>
          <Button size="sm">Actualiser</Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un fournisseur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Toutes les catégories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>
          
          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleSort('name')}
            className="flex items-center gap-1"
          >
            Nom <ArrowUpDown className="h-3.5 w-3.5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleSort('category')}
            className="flex items-center gap-1"
          >
            Catégorie <ArrowUpDown className="h-3.5 w-3.5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleSort('totalOrders')}
            className="flex items-center gap-1"
          >
            Commandes <ArrowUpDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredSuppliers.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-muted-foreground">Aucun fournisseur ne correspond à votre recherche</p>
          </div>
        ) : (
          filteredSuppliers.map((supplier) => (
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
                  
                  {supplier.products && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Produits fournis:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {supplier.products.map(product => (
                          <span key={product} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {supplier.lastOrder && (
                      <span>Dernière commande: {supplier.lastOrder}</span>
                    )}
                    {supplier.totalOrders !== undefined && (
                      <span>Total des commandes: {supplier.totalOrders}</span>
                    )}
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
          ))
        )}
      </div>
    </div>
  );
};

export default SuppliersList;
