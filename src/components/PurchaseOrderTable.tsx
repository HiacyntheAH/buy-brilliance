
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from './ui-components/Badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PurchaseOrder {
  id: string;
  reference: string;
  supplier: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  department: string;
}

const mockOrders: PurchaseOrder[] = [
  {
    id: '1',
    reference: 'PO-2023-001',
    supplier: 'TechSupplies Inc.',
    date: '2023-10-15',
    amount: 2500.00,
    status: 'approved',
    department: 'IT',
  },
  {
    id: '2',
    reference: 'PO-2023-002',
    supplier: 'Office Solutions',
    date: '2023-10-17',
    amount: 1250.50,
    status: 'pending',
    department: 'Marketing',
  },
  {
    id: '3',
    reference: 'PO-2023-003',
    supplier: 'Global Logistics',
    date: '2023-10-20',
    amount: 4750.75,
    status: 'completed',
    department: 'Operations',
  },
  {
    id: '4',
    reference: 'PO-2023-004',
    supplier: 'Creative Design Co.',
    date: '2023-10-22',
    amount: 3200.25,
    status: 'rejected',
    department: 'Marketing',
  },
  {
    id: '5',
    reference: 'PO-2023-005',
    supplier: 'Industrial Parts Ltd.',
    date: '2023-10-25',
    amount: 5600.00,
    status: 'approved',
    department: 'Manufacturing',
  },
  {
    id: '6',
    reference: 'PO-2023-006',
    supplier: 'Software Solutions',
    date: '2023-10-27',
    amount: 8750.50,
    status: 'pending',
    department: 'IT',
  },
  {
    id: '7',
    reference: 'PO-2023-007',
    supplier: 'Office Furniture Co.',
    date: '2023-10-30',
    amount: 3450.25,
    status: 'completed',
    department: 'Facilities',
  },
];

const statusVariantMap = {
  pending: 'warning' as const,
  approved: 'success' as const,
  rejected: 'danger' as const,
  completed: 'info' as const,
};

const statusTextMap = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
  completed: 'Complété',
};

const PurchaseOrderTable: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof PurchaseOrder | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof PurchaseOrder) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = React.useMemo(() => {
    if (!sortField) return orders;
    
    return [...orders].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [orders, sortField, sortDirection]);

  const filteredOrders = React.useMemo(() => {
    if (!searchTerm) return sortedOrders;
    
    return sortedOrders.filter(order => 
      order.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedOrders, searchTerm]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const renderSortIcon = (field: keyof PurchaseOrder) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-50" />;
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher des commandes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="text-sm font-medium">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm" className="text-sm font-medium">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm" className="text-sm font-medium">
            Nouvelle commande
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden transition-all">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort('reference')}>
                <div className="flex items-center">
                  <span>Référence</span>
                  {renderSortIcon('reference')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('supplier')}>
                <div className="flex items-center">
                  <span>Fournisseur</span>
                  {renderSortIcon('supplier')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center">
                  <span>Date</span>
                  {renderSortIcon('date')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end">
                  <span>Montant</span>
                  {renderSortIcon('amount')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('department')}>
                <div className="flex items-center">
                  <span>Département</span>
                  {renderSortIcon('department')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center">
                  <span>Statut</span>
                  {renderSortIcon('status')}
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-10 w-10 mb-2 opacity-20" />
                    <p>Aucune commande trouvée</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order, index) => (
                <TableRow 
                  key={order.id} 
                  className={`table-row-fade-in hover-lift delay-${index % 8} hover:bg-muted/20`}
                >
                  <TableCell className="font-medium">{order.reference}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.amount)}
                  </TableCell>
                  <TableCell>{order.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={statusVariantMap[order.status]} 
                      dot
                    >
                      {statusTextMap[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir détails</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseOrderTable;
