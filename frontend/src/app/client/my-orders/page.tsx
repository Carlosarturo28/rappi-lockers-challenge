'use client';

import { useUserOrders } from './hooks/useUserOrders';
import { OrderCard } from './components/OrderCard';

export default function MyOrdersPage() {
  const MOCK_USER_ID = 'mock-user-123';
  const { orders, loading, error } = useUserOrders(MOCK_USER_ID);

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>My Orders</h1>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4'>
          {error}
        </div>
      )}

      {loading ? (
        <p className='text-gray-500'>Loading your orders…</p>
      ) : orders.length === 0 ? (
        <p className='text-gray-500'>
          You have no orders yet. Go select a locker.
        </p>
      ) : (
        <div className='space-y-4'>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
