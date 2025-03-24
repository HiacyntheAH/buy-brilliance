
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import OrderItemsTable from '@/components/OrderItemsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Building, Calendar, Truck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/ui-components/Badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

// Données fictives basées sur la structure de la base de données montrée dans l'image
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
];

const trackingStatusMap = {
  pending: {
    label: 'En attente',
    variant: 'warning' as const,
  },
  shipped: {
    label: 'Expédiée',
    variant: 'info' as const,
  },
  delivered: {
    label: 'Livrée',
    variant: 'success' as const,
  },
  cancelled: {
    label: 'Annulée',
    variant: 'danger' as const,
  }
};

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<PurchaseOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setLoading(true);
    setTimeout(() => {
      const foundOrder = mockOrders.find(o => o.id === id);
      setOrder(foundOrder || null);
      setLoading(false);
      
      if (foundOrder) {
        document.title = `Commande ${foundOrder.order_number} - EnterpriseFlow`;
      } else {
        document.title = 'Commande non trouvée - EnterpriseFlow';
      }
    }, 500);
  }, [id]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    
    const date = new Date(dateStr);
    return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </Link>
          
          <div className="flex flex-col items-center justify-center h-64">
            <h1 className="text-2xl font-bold mb-2">Commande non trouvée</h1>
            <p className="text-muted-foreground">La commande que vous recherchez n'existe pas ou a été supprimée.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div>
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Commande {order.order_number}</h1>
              <p className="text-muted-foreground mt-1">
                Demande associée: <span className="font-medium">{order.request_id}</span>
              </p>
            </div>
            
            <Badge 
              variant={trackingStatusMap[order.tracking_status].variant}
              className="w-fit text-sm px-3 py-1"
            >
              {trackingStatusMap[order.tracking_status].label}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Détails de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Informations fournisseur
                    </h3>
                    <div className="mt-2 border-l-2 border-primary/40 pl-4">
                      <p className="font-medium">{order.supplier}</p>
                      <p className="text-sm text-muted-foreground">ID: {order.supplier_id}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Département
                    </h3>
                    <div className="mt-2 border-l-2 border-primary/40 pl-4">
                      <p className="font-medium">{order.department}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Dates
                    </h3>
                    <div className="mt-2 border-l-2 border-primary/40 pl-4 space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Date de commande</p>
                        <p className="font-medium">{formatDate(order.ordered_at)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date de livraison</p>
                        <p className="font-medium">{formatDate(order.delivered_at)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Suivi de commande
                    </h3>
                    <div className="mt-2 border-l-2 border-primary/40 pl-4">
                      <p className="font-medium">{trackingStatusMap[order.tracking_status].label}</p>
                      {order.tracking_status === 'pending' && (
                        <p className="text-xs text-muted-foreground">En attente d'expédition</p>
                      )}
                      {order.tracking_status === 'shipped' && (
                        <p className="text-xs text-muted-foreground">En cours de livraison</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Gérer cette commande</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Télécharger la facture
              </Button>
              
              <Button className="w-full justify-start" variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Mettre à jour le statut
              </Button>
              
              {order.tracking_status !== 'cancelled' && order.tracking_status !== 'delivered' && (
                <Button className="w-full justify-start" variant="destructive">
                  Annuler la commande
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <OrderItemsTable orderId={order.id} orderNumber={order.order_number} />
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
