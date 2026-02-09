import Link from 'next/link';
import { Order } from '@/types/order';
import { StatusBadge } from './StatusBadge';

const items = ['2x Cheese Burger', '1x Pepperoni Pizza'];

export function OrderCard({ order }: { order: Order }) {
  return (
    <div className='bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition'>
      <div className='flex justify-between mb-2'>
        <p className='text-lg font-medium text-gray-800'>Urban Bites</p>

        <StatusBadge status={order.status} />
      </div>

      <div className='mb-2'>
        <p className='text-sm text-gray-500 line-clamp-2'>
          {items.slice(0, 3).join(', ')}
        </p>
      </div>

      <p className='text-xs text-gray-400'>
        Locker: {order.locker?.name || 'N/A'}
      </p>

      <p className='text-xs text-gray-400'>
        {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <p className='font-mono text-xs text-gray-600'>Order ID: {order.id}</p>

      <Link
        href={`/client/my-orders/${order.id}`}
        className='inline-block mt-3 text-sm font-medium text-gray-800 hover:underline'
      >
        View details →
      </Link>
    </div>
  );
}
