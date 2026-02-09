import { Order } from '@/types/order';
import Link from 'next/link';
import DeliverButton from './DeliverButton';

type Props = {
  order: Order;
  onDeliver: () => void;
};

export default function CourierOrderCard({ order, onDeliver }: Props) {
  return (
    <div className='bg-white border border-gray-100 rounded-xl p-5 shadow-sm'>
      <div className='flex justify-between items-start mb-3'>
        <div>
          <p className='text-xs text-gray-400'>Order ID</p>
          <p className='text-sm font-medium text-gray-700'>
            {order.id.substring(0, 8)}...
          </p>
        </div>

        <span className='text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full'>
          In Progress
        </span>
      </div>

      <div className='text-sm text-gray-600 mb-4'>
        <p className='font-medium text-gray-800'>{order.locker?.name}</p>
        <p className='text-xs text-gray-500'>{order.locker?.address}</p>
      </div>

      <div className='flex items-center gap-4'>
        <DeliverButton onClick={onDeliver} />

        <Link
          href={`/client/my-orders/${order.id}`}
          className='
      text-sm
      text-gray-500
      hover:text-gray-800
      transition
      px-1 py-2
      flex items-center
    '
        >
          View details
        </Link>
      </div>
    </div>
  );
}
