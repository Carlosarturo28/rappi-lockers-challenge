import { OrderStatus } from '@/types/order';

type Props = {
  status: OrderStatus;
};

export default function OrderStatusBadge({ status }: Props) {
  const map: Record<OrderStatus, string> = {
    completed: 'bg-green-100 text-green-700',
    delivered_in_locker: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-gray-100 text-gray-700',
    pending: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={`
        inline-flex items-center
        text-xs font-medium
        px-3 py-1
        rounded-md
        ${map[status]}
      `}
    >
      {status.replaceAll('_', ' ')}
    </span>
  );
}
