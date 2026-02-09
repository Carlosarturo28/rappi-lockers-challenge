import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Order, OrderStatus } from '../entities/Order';
import { Locker } from '../entities/Locker';
import { v4 as uuidv4 } from 'uuid'; // Used for potential unique IDs if not handled by DB

const orderRepository = AppDataSource.getRepository(Order);
const lockerRepository = AppDataSource.getRepository(Locker);

// Simplified for MVP, assumes a userId for creating an order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, lockerId } = req.body;

    if (!userId || !lockerId) {
      return res.status(400).json({
        message: 'userId and lockerId are required to create an order.',
      });
    }

    const locker = await lockerRepository.findOneBy({ id: lockerId });
    if (!locker) {
      return res.status(404).json({ message: 'Selected locker not found.' });
    }

    const newOrder = orderRepository.create({
      userId,
      lockerId,
      status: OrderStatus.IN_PROGRESS, // Order is created and awaiting delivery
    });
    await orderRepository.save(newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order.' });
  }
};

export const deliverOrderToLocker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Order ID

    const order = await orderRepository.findOneBy({ id: id as string });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (order.status !== OrderStatus.IN_PROGRESS) {
      return res.status(400).json({
        message: `Order status is "${order.status}", not "in_progress". Cannot deliver.`,
      });
    }

    // Assign a simple slot number (e.g., A1, B2)
    // In a real application, this would involve more sophisticated logic
    // checking actual locker capacity and available physical slots.
    order.slotNumber = `SLOT-${Math.floor(Math.random() * 99) + 1}`; // e.g., SLOT-1 to SLOT-99
    order.accessCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase(); // Random 8-char alphanumeric code
    order.status = OrderStatus.DELIVERED_IN_LOCKER;
    order.deliveredAt = new Date();

    await orderRepository.save(order);

    res.json({ message: 'Order delivered to locker successfully!', order });
  } catch (error) {
    console.error('Error delivering order to locker:', error);
    res.status(500).json({ message: 'Failed to deliver order to locker.' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Assuming userId comes from URL param for MVP

    const orders = await orderRepository.find({
      where: { userId: userId as string },
      relations: ['locker'], // Load related locker data
      order: { createdAt: 'DESC' },
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: 'No orders found for this user.' });
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Failed to fetch user orders.' });
  }
};

export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Order ID

    const order = await orderRepository.findOne({
      where: { id: id as string },
      relations: ['locker'], // Load related locker data
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Failed to fetch order details.' });
  }
};

// Simulate user collecting order (changes status to COMPLETED)
export const collectOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Order ID
    const order = await orderRepository.findOneBy({ id: id as string });

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (order.status !== OrderStatus.DELIVERED_IN_LOCKER) {
      return res.status(400).json({
        message: 'Order is not delivered in locker status. Cannot collect.',
      });
    }

    order.status = OrderStatus.COMPLETED;
    await orderRepository.save(order);

    res.json({ message: 'Order collected successfully!', order });
  } catch (error) {
    console.error('Error collecting order:', error);
    res.status(500).json({ message: 'Failed to collect order.' });
  }
};
