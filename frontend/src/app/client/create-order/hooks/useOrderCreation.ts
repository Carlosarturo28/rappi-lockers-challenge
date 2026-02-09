import { useState } from 'react';
import { post } from '@/services/api';

export function useOrderCreation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (lockerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const mockUserId = 'mock-user-123';
      const order = await post<{ id: string }>(`/orders`, {
        userId: mockUserId,
        lockerId,
      });
      return order.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.info?.message || 'Failed to create order.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}
