import { OrderStatus } from '@/types/order';

export function StatusBadge({ status }: { status: OrderStatus }) {
  console.log('Status:', status);
  const styles =
    status === OrderStatus.COMPLETED
      ? 'bg-green-100 text-green-800'
      : status === OrderStatus.DELIVERED_IN_LOCKER
        ? 'bg-blue-100 text-blue-800'
        : 'bg-yellow-100 text-yellow-800';

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles}`}>
      {status.replaceAll('_', ' ')}
    </span>
  );
}
