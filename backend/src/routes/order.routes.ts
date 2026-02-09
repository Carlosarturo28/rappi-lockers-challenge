import { Router } from 'express';
import {
  createOrder,
  deliverOrderToLocker,
  getUserOrders,
  getOrderDetails,
  collectOrder,
} from '../controllers/order.controller';

const router = Router();

// Client: Create a new order, associating it with a locker
router.post('/', createOrder);
// Courier (Admin): Mark an order as delivered to a locker
router.post('/:id/deliver', deliverOrderToLocker);
// Client: Simulate user collecting an order from a locker
router.post('/:id/collect', collectOrder);
// Client: Get all orders for a specific user
router.get('/user/:userId', getUserOrders);
// Client/Admin: Get details for a specific order
router.get('/:id', getOrderDetails);

export default router;
