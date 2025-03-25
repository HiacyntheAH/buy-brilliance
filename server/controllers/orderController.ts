
import { Request, Response } from 'express';
import { mockOrders } from '../data/mockData';

// In a real app, this would be stored in a database
let orders = [...mockOrders];

// Get all orders
export const getAllOrders = (req: Request, res: Response) => {
  res.json(orders);
};

// Get a specific order by ID
export const getOrderById = (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.json(order);
};

// Create a new order
export const createOrder = (req: Request, res: Response) => {
  const newOrder = req.body;
  
  if (!newOrder.supplier || !newOrder.amount) {
    return res.status(400).json({ message: 'Supplier and amount are required' });
  }
  
  const orderToAdd = {
    id: String(orders.length + 1),
    order_number: `CMD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
    ordered_at: new Date().toISOString(),
    delivered_at: null,
    tracking_status: 'pending' as const,
    ...newOrder
  };
  
  orders.push(orderToAdd);
  res.status(201).json(orderToAdd);
};

// Update an existing order
export const updateOrder = (req: Request, res: Response) => {
  const orderId = req.params.id;
  const updatedData = req.body;
  
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  orders[orderIndex] = { ...orders[orderIndex], ...updatedData };
  res.json(orders[orderIndex]);
};

// Delete an order
export const deleteOrder = (req: Request, res: Response) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  const deletedOrder = orders[orderIndex];
  orders = orders.filter(o => o.id !== orderId);
  
  res.json(deletedOrder);
};
