import { useEffect, useState } from 'react';
import { get } from '@/services/api';
import { Order } from '@/types/order';

export function useUserOrders(userId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await get<Order[]>(`/orders/user/${userId}`);
        setOrders(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(err.info?.message || 'Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, loading, error };
}
