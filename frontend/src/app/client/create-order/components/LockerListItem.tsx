import React from 'react';
import { Locker } from '@/types/locker';

interface LockerListItemProps {
  locker: Locker;
  isSelected: boolean;
  isClosest?: boolean;
  onSelect: (lockerId: string) => void;
}

const getDistanceColor = (distance?: number) => {
  if (distance === undefined) return 'text-gray-500';

  if (distance <= 8) return 'text-green-600';
  if (distance <= 15) return 'text-yellow-600';
  return 'text-red-600';
};

const LockerListItem: React.FC<LockerListItemProps> = ({
  locker,
  isSelected,
  isClosest,
  onSelect,
}) => {
  const distanceColor = getDistanceColor(locker.distance);

  return (
    <div
      className={`relative bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200
        ${
          isSelected
            ? 'border-2 border-green-500'
            : 'border border-gray-200 hover:shadow-lg'
        }`}
      onClick={() => onSelect(locker.id)}
    >
      {isClosest && (
        <span className='absolute -top-2 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow'>
          Closest
        </span>
      )}

      <h2 className='text-xl font-semibold mb-2 text-gray-800'>
        {locker.name}
      </h2>

      <p className='text-gray-600 mb-1'>{locker.address}</p>

      {locker.distance !== undefined && (
        <p className={`text-sm font-medium ${distanceColor}`}>
          Distance: {locker.distance.toFixed(2)} km
        </p>
      )}
    </div>
  );
};

export default LockerListItem;
