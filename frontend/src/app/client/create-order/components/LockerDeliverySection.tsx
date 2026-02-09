'use client';

import { useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLockers } from '../hooks/useLockers';
import LockerGrid from './LockerGrid';

type Props = {
  onLockerSelected: (lockerId: string | null) => void;
};

export default function LockerDeliverySection({ onLockerSelected }: Props) {
  const {
    location,
    error: locationError,
    isLoading: isLoadingLocation,
    isUsingDefault,
    retry,
  } = useGeolocation();

  const {
    lockers,
    isLoading: lockersLoading,
    error: lockersError,
  } = useLockers(location ?? undefined);

  const [selectedLockerId, setSelectedLockerId] = useState<string | null>(null);

  const isLoadingOverall = isLoadingLocation || lockersLoading;

  const handleSelect = (id: string) => {
    setSelectedLockerId(id);
    onLockerSelected(id);
  };

  return (
    <section className='mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>
        Deliver to a Locker (Optional)
      </h2>

      <p className='text-sm text-gray-500 mb-4'>
        Prefer not to receive the order at your address? Choose a nearby locker
        and pick it up later.
      </p>

      {locationError && (
        <div className='bg-orange-100 border border-orange-300 text-orange-800 px-4 py-3 rounded mb-4'>
          <span>{locationError}</span>
          <button
            onClick={retry}
            className='ml-2 text-sm font-medium underline cursor-pointer hover:font-bold'
          >
            Retry location
          </button>
        </div>
      )}

      {lockersError && (
        <div className='bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded mb-4'>
          {lockersError}
        </div>
      )}

      {isLoadingOverall && (
        <p className='text-gray-500'>Finding nearby lockers...</p>
      )}

      {!isLoadingOverall && lockers.length > 0 && (
        <>
          {isUsingDefault && (
            <p className='text-xs text-gray-400 mb-2'>
              Showing lockers from a default location.
            </p>
          )}

          <LockerGrid
            lockers={lockers}
            selectedId={selectedLockerId}
            onSelect={handleSelect}
          />
        </>
      )}

      {!isLoadingOverall && lockers.length === 0 && (
        <p className='text-gray-500 text-sm'>
          No lockers found near your location.
        </p>
      )}
    </section>
  );
}
