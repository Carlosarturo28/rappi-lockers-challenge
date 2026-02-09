'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGeolocation } from './hooks/useGeolocation';
import { useLockers } from './hooks/useLockers';
import { useOrderCreation } from './hooks/useOrderCreation';
import RestaurantHeader from './components/RestaurantHeader';
import OrderSummaryCard from './components/OrderSummaryCard';
import ConfirmOrderButton from './components/ConfirmOrderButton';
import LockerDeliverySection from './components/LockerDeliverySection';

const mockItems = [
  {
    id: '1',
    name: 'Cheese Burger',
    quantity: 2,
    price: 8.5,
    imageUrl: '/burger.jpg',
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    quantity: 1,
    price: 14,
    imageUrl: '/pizza.jpeg',
  },
];

export default function SelectLockerPage() {
  const router = useRouter();

  const geo = useGeolocation();
  const { isLoading: lockersLoading } = useLockers(geo.location ?? undefined);

  const {
    createOrder,
    loading: orderLoading,
    error: orderError,
  } = useOrderCreation();

  const [selectedLockerId, setSelectedLockerId] = useState<string | null>(null);

  const isLoadingOverall = geo.isLoading || lockersLoading;

  const handleConfirm = async () => {
    if (!selectedLockerId) return;

    const orderId = await createOrder(selectedLockerId);
    if (orderId) {
      router.push(`/client/my-orders/${orderId}`);
    }
  };

  return (
    <div>
      <RestaurantHeader
        name='Urban Bites'
        category='Burgers & Pizza'
        eta='25–35 min'
        imageUrl='/banner.png'
        rating={4.7}
      />

      <OrderSummaryCard items={mockItems} />
      <LockerDeliverySection onLockerSelected={setSelectedLockerId} />

      <ConfirmOrderButton
        onClick={handleConfirm}
        disabled={
          !selectedLockerId || orderLoading || isLoadingOverall || !geo.location
        }
        loading={orderLoading}
      />

      {orderError && <p>{orderError}</p>}
    </div>
  );
}
