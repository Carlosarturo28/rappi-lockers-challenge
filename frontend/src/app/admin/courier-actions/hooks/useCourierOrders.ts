'use client';

import { useEffect, useState } from 'react';
import { get, post } from '@/services/api';
import { Order, OrderStatus } from '@/types/order';

const MOCK_USER_ID = 'mock-user-123';

export function useCourierOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetched = await get<Order[]>(`/orders/user/${MOCK_USER_ID}`);
      setOrders(fetched.filter((o) => o.status === OrderStatus.IN_PROGRESS));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.info?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const deliverOrder = async (orderId: string) => {
    setDeliveryStatus(null);
    try {
      await post(`/orders/${orderId}/deliver`, {});
      setDeliveryStatus(`Order delivered to locker.`);
      fetchOrders();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setDeliveryStatus(err.info?.message || 'Delivery failed.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    deliveryStatus,
    deliverOrder,
  };
}
