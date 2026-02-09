import { Locker } from './locker';

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED_IN_LOCKER = 'delivered_in_locker',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Order {
  id: string;
  userId: string;
  lockerId: string;
  locker: Locker;
  status: OrderStatus;
  slotNumber: string | null;
  accessCode: string | null;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string | null;
}
