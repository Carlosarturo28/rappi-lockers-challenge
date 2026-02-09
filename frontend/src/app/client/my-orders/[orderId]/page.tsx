'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

import { OrderStatus } from '@/types/order';

import { useOrderDetails } from './hooks/useOrderDetails';
import { useCollectOrder } from './hooks/useCollectOrder';

import OrderStatusBadge from './components/OrderStatusBadge';
import InfoRow from './components/InfoRow';
import LockerInfoCard from './components/LockerInfoCard';
import CollectOrderButton from './components/CollectOrderButton';

export default function OrderDetailsPage() {
  const { orderId } = useParams();

  const { order, setOrder, loading, error } = useOrderDetails(orderId);

  const { collect, loading: collectLoading, statusMessage } = useCollectOrder();

  if (loading) return <p className='text-center py-8'>Loading...</p>;
  if (error) return <p className='text-center py-8 text-red-600'>{error}</p>;
  if (!order) return <p className='text-center py-8'>Order not found.</p>;

  return (
    <div className='max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md'>
      <div className='mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>Order Details</h1>

        <p className='text-xs text-gray-400 mt-1'>Order ID: {order.id}</p>
      </div>

      {statusMessage && (
        <div className='bg-green-100 border border-green-400 px-4 py-3 rounded mb-4'>
          {statusMessage}
        </div>
      )}

      <div className='grid md:grid-cols-2 gap-4 mb-6'>
        <div>
          <p className='text-sm text-gray-500'>Status</p>
          <OrderStatusBadge status={order.status} />
        </div>

        <InfoRow
          label='Created At'
          value={new Date(order.createdAt).toLocaleString()}
        />
      </div>

      <LockerInfoCard
        name={order.locker.name}
        address={order.locker.address}
        slotNumber={order.slotNumber ?? undefined}
        accessCode={order.accessCode ?? undefined}
        status={order.status}
      />

      {order.status === OrderStatus.DELIVERED_IN_LOCKER && (
        <CollectOrderButton
          loading={collectLoading}
          onClick={() => collect(order, (updated) => setOrder(updated))}
        />
      )}

      <div className='mt-4'>
        <Link
          href='/client/my-orders'
          className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition'
        >
          ← Go back to orders
        </Link>
      </div>
    </div>
  );
}
