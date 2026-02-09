'use client';

import { Order } from '@/types/order';
import { useCourierOrders } from './hooks/useCourierOrders';
import CourierHeader from './components/CourierHeader';
import CourierOrderCard from './components/CourierOrderCard';

export default function CourierActionsPage() {
  const { orders, loading, error, deliveryStatus, deliverOrder } =
    useCourierOrders();

  return (
    <div className='max-w-4xl mx-auto'>
      <CourierHeader />

      {error && (
        <div className='mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3'>
          {error}
        </div>
      )}

      {deliveryStatus && (
        <div className='mb-4 text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-3'>
          {deliveryStatus}
        </div>
      )}

      {loading ? (
        <p className='text-sm text-gray-500'>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className='text-sm text-gray-500'>No pending deliveries.</p>
      ) : (
        <div className='space-y-4'>
          {orders.map((order: Order) => (
            <CourierOrderCard
              key={order.id}
              order={order}
              onDeliver={() => deliverOrder(order.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
