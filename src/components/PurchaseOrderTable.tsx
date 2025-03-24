import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Filter, Download, Truck, Package, Eye } from 'lucide-react';
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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface PurchaseOrder {
  id: string;
  order_number: string;
  supplier_id: string;
  supplier: string;
  request_id: string;
  ordered_at: string;
  delivered_at: string | null;
  tracking_status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  amount: number;
  department: string;
}

const mockOrders: PurchaseOrder[] = [
  {
    id: '1',
    order_number: 'CMD-2023-001',
    supplier_id: 'SUPP-123',
    supplier: 'TechSupplies Inc.',
    request_id: 'REQ-001',
    ordered_at: '2023-10-15T10:30:00',
    delivered_at: '2023-10-20T14:45:00',
    tracking_status: 'delivered',
    amount: 2500.00,
    department: 'IT',
  },
  {
    id: '2',
    order_number: 'CMD-2023-002',
    supplier_id: 'SUPP-456',
    supplier: 'Office Solutions',
    request_id: 'REQ-002',
    ordered_at: '2023-10-17T08:15:00',
    delivered_at: null,
    tracking_status: 'pending',
    amount: 1250.50,
    department: 'Marketing',
  },
  {
    id: '3',
    order_number: 'CMD-2023-003',
    supplier_id: 'SUPP-789',
    supplier: 'Global Logistics',
    request_id: 'REQ-003',
    ordered_at: '2023-10-20T11:45:00',
    delivered_at: '2023-10-25T09:30:00',
    tracking_status: 'delivered',
    amount: 4750.75,
    department: 'Operations',
  },
  {
    id: '4',
    order_number: 'CMD-2023-004',
    supplier_id: 'SUPP-101',
    supplier: 'Creative Design Co.',
    request_id: 'REQ-004',
    ordered_at: '2023-10-22T13:20:00',
    delivered_at: null,
    tracking_status: 'cancelled',
    amount: 3200.25,
    department: 'Marketing',
  },
  {
    id: '5',
    order_number: 'CMD-2023-005',
    supplier_id: 'SUPP-112',
    supplier: 'Industrial Parts Ltd.',
    request_id: 'REQ-005',
    ordered_at: '2023-10-25T15:10:00',
    delivered_at: null,
    tracking_status: 'shipped',
    amount: 5600.00,
    department: 'Manufacturing',
  },
  {
    id: '6',
    order_number: 'CMD-2023-006',
    supplier_id: 'SUPP-131',
    supplier: 'Software Solutions',
    request_id: 'REQ-006',
    ordered_at: '2023-10-27T09:45:00',
    delivered_at: null,
    tracking_status: 'pending',
    amount: 8750.50,
    department: 'IT',
  },
  {
    id: '7',
    order_number: 'CMD-2023-007',
    supplier_id: 'SUPP-142',
    supplier: 'Office Furniture Co.',
    request_id: 'REQ-007',
    ordered_at: '2023-10-30T10:30:00',
    delivered_at: '2023-11-05T14:15:00',
    tracking_status: 'delivered',
    amount: 3450.25,
    department: 'Facilities',
  },
];

const trackingStatusMap = {
  pending: {
    label: 'En attente',
    variant: 'warning' as const,
    icon: <Package className="h-3.5 w-3.5 mr-1" />
  },
  shipped: {
    label: 'Expédiée',
    variant: 'info' as const,
    icon: <Truck className="h-3.5 w-3.5 mr-1" />
  },
  delivered: {
    label: 'Livrée',
    variant: 'success' as const,
    icon: <Eye className="h-3.5 w-3.5 mr-1" />
  },
  cancelled: {
    label: 'Annulée',
    variant: 'danger' as const,
    icon: null
  }
};

const PurchaseOrderTable: React.FC = () => {
  const navigate = useNavigate();
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
    
    const lowercasedSearch = searchTerm.toLowerCase();
    return sortedOrders.filter(order => 
      order.order_number.toLowerCase().includes(lowercasedSearch) ||
      order.supplier.toLowerCase().includes(lowercasedSearch) ||
      order.department.toLowerCase().includes(lowercasedSearch)
    );
  }, [sortedOrders, searchTerm]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    
    const date = new Date(dateStr);
    return format(date, 'dd/MM/yyyy à HH:mm', { locale: fr });
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

  const handleViewDetails = (orderId: string) => {
    navigate(`/orders/${orderId}`);
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
              <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort('order_number')}>
                <div className="flex items-center">
                  <span>N° de commande</span>
                  {renderSortIcon('order_number')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('supplier')}>
                <div className="flex items-center">
                  <span>Fournisseur</span>
                  {renderSortIcon('supplier')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('ordered_at')}>
                <div className="flex items-center">
                  <span>Date de commande</span>
                  {renderSortIcon('ordered_at')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('delivered_at')}>
                <div className="flex items-center">
                  <span>Date de livraison</span>
                  {renderSortIcon('delivered_at')}
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
              <TableHead className="cursor-pointer" onClick={() => handleSort('tracking_status')}>
                <div className="flex items-center">
                  <span>Statut</span>
                  {renderSortIcon('tracking_status')}
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
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
                  className={`table-row-fade-in hover-lift delay-${index % 8} hover:bg-muted/20 cursor-pointer`}
                  onClick={() => handleViewDetails(order.id)}
                >
                  <TableCell className="font-medium">{order.order_number}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{formatDate(order.ordered_at)}</TableCell>
                  <TableCell>{formatDate(order.delivered_at)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.amount)}
                  </TableCell>
                  <TableCell>{order.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={trackingStatusMap[order.tracking_status].variant} 
                      className="flex items-center"
                    >
                      {trackingStatusMap[order.tracking_status].icon}
                      {trackingStatusMap[order.tracking_status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(order.id)}>
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>Voir les articles</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Annuler la commande
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
