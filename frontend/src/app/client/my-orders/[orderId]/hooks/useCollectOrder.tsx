import { useState } from 'react';
import { post } from '@/services/api';
import { Order, OrderStatus } from '@/types/order';

export function useCollectOrder() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const collect = async (
    order: Order,
    onSuccess?: (updated: Order) => void,
  ) => {
    if (order.status !== OrderStatus.DELIVERED_IN_LOCKER) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      await post(`/orders/${order.id}/collect`, {});
      setStatusMessage('Order successfully collected!');

      const updatedOrder = {
        ...order,
        status: OrderStatus.COMPLETED,
      };

      onSuccess?.(updatedOrder);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Collect order failed:', err);
      setStatusMessage(
        `Failed to collect order: ${err.info?.message || 'Unknown error.'}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    collect,
    loading,
    statusMessage,
  };
}
