
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

export const mockOrders: PurchaseOrder[] = [
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
