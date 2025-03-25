
import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';

const router = express.Router();

// GET /api/orders - Get all orders
router.get('/', getAllOrders);

// GET /api/orders/:id - Get a specific order
router.get('/:id', getOrderById);

// POST /api/orders - Create a new order
router.post('/', createOrder);

// PUT /api/orders/:id - Update an order
router.put('/:id', updateOrder);

// DELETE /api/orders/:id - Delete an order
router.delete('/:id', deleteOrder);

export const orderRoutes = router;
