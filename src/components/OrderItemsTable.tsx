
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface OrderItemsTableProps {
  orderId: string;
  orderNumber: string;
}

// Données fictives pour les articles de commande
const mockOrderItems: Record<string, OrderItem[]> = {
  '1': [
    {
      id: '101',
      order_id: '1',
      product_id: 'PROD-001',
      product_name: 'Ordinateur portable pro',
      quantity: 2,
      unit_price: 1200,
      total_price: 2400
    },
    {
      id: '102',
      order_id: '1',
      product_id: 'PROD-002',
      product_name: 'Souris sans fil ergonomique',
      quantity: 2,
      unit_price: 50,
      total_price: 100
    }
  ],
  '2': [
    {
      id: '201',
      order_id: '2',
      product_id: 'PROD-003',
      product_name: 'Papier A4 (carton)',
      quantity: 5,
      unit_price: 15.50,
      total_price: 77.50
    },
    {
      id: '202',
      order_id: '2',
      product_id: 'PROD-004',
      product_name: 'Stylos premium (lot de 50)',
      quantity: 3,
      unit_price: 45,
      total_price: 135
    },
    {
      id: '203',
      order_id: '2',
      product_id: 'PROD-005',
      product_name: 'Classeurs de bureau',
      quantity: 10,
      unit_price: 12.50,
      total_price: 125
    }
  ]
};

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ orderId, orderNumber }) => {
  // Dans une application réelle, on récupérerait les données depuis l'API
  const orderItems = mockOrderItems[orderId] || [];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const orderTotal = orderItems.reduce((total, item) => total + item.total_price, 0);

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <div>
          <CardTitle>Articles de la commande {orderNumber}</CardTitle>
          <CardDescription>{orderItems.length} articles</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {orderItems.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
            <Package className="h-10 w-10 mb-2 opacity-20" />
            <p>Aucun article trouvé pour cette commande</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead className="text-center">Quantité</TableHead>
                    <TableHead className="text-right">Prix unitaire</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id} className="hover-lift hover:bg-muted/20 transition-all duration-200">
                      <TableCell className="font-medium">{item.product_name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unit_price)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(item.total_price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 bg-muted/10">
                    <TableCell colSpan={3} className="text-right font-bold">Total de la commande</TableCell>
                    <TableCell className="text-right font-bold text-primary">{formatCurrency(orderTotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderItemsTable;
