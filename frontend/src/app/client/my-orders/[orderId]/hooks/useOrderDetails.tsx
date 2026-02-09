import { useEffect, useState } from 'react';
import { get } from '@/services/api';
import { Order } from '@/types/order';

export function useOrderDetails(orderId?: string | string[]) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedOrder = await get<Order>(`/orders/${orderId}`);
        setOrder(fetchedOrder);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(`Failed to fetch order ${orderId}:`, err);
        setError(err.info?.message || 'Failed to load order.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return {
    order,
    setOrder,
    loading,
    error,
  };
}
