
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export interface PurchaseOrder {
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

export const useOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.get<PurchaseOrder[]>('/orders'),
  });

  const getOrder = (id: string) => {
    return useQuery({
      queryKey: ['orders', id],
      queryFn: () => api.get<PurchaseOrder>(`/orders/${id}`),
    });
  };

  const createOrderMutation = useMutation({
    mutationFn: (newOrder: Partial<PurchaseOrder>) => 
      api.post<PurchaseOrder>('/orders', newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Commande créée avec succès');
    },
    onError: (error) => {
      toast.error(`Erreur lors de la création: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseOrder> }) => 
      api.put<PurchaseOrder>(`/orders/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', variables.id] });
      toast.success('Commande mise à jour avec succès');
    },
    onError: (error) => {
      toast.error(`Erreur lors de la mise à jour: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => api.delete<PurchaseOrder>(`/orders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Commande supprimée avec succès');
    },
    onError: (error) => {
      toast.error(`Erreur lors de la suppression: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  });

  return {
    orders,
    isLoading,
    error,
    getOrder,
    createOrder: createOrderMutation.mutate,
    updateOrder: updateOrderMutation.mutate,
    deleteOrder: deleteOrderMutation.mutate
  };
};
