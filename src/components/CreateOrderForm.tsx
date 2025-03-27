
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useOrders } from '@/hooks/useOrders';

const formSchema = z.object({
  supplier: z.string({
    required_error: "Veuillez sélectionner un fournisseur",
  }),
  amount: z.string().min(1, { message: "Montant requis" }).refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: "Le montant doit être un nombre positif" }
  ),
  department: z.string({
    required_error: "Veuillez sélectionner un département",
  }),
  tracking_status: z.string({
    required_error: "Veuillez sélectionner un statut",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateOrderForm: React.FC = () => {
  const { createOrder } = useOrders();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      amount: "",
      department: "",
      tracking_status: "pending",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    
    // Convert the form values to the format expected by the API
    const orderData = {
      supplier: values.supplier,
      supplier_id: `SUP-${Math.floor(Math.random() * 10000)}`, // Example ID generation
      amount: parseFloat(values.amount),
      department: values.department,
      tracking_status: values.tracking_status as 'pending' | 'shipped' | 'delivered' | 'cancelled',
      order_number: `ORD-${Math.floor(Math.random() * 100000)}`,
      ordered_at: new Date().toISOString(),
      request_id: `REQ-${Math.floor(Math.random() * 10000)}`,
    };

    createOrder(orderData);
    toast.success("Commande créée avec succès!");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fournisseur</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
                    <SelectItem value="Office Depot">Office Depot</SelectItem>
                    <SelectItem value="Manufacturing Partners">Manufacturing Partners</SelectItem>
                    <SelectItem value="Logistics Pro">Logistics Pro</SelectItem>
                    <SelectItem value="Services Inc.">Services Inc.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Département</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant (€)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tracking_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="shipped">Expédiée</SelectItem>
                    <SelectItem value="delivered">Livrée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Créer la commande</Button>
      </form>
    </Form>
  );
};

export default CreateOrderForm;
