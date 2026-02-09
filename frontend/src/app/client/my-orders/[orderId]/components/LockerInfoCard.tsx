import { OrderStatus } from '@/types/order';
import CodeBadge from './CodeBadge';

type Props = {
  name: string;
  address: string;
  slotNumber?: string;
  accessCode?: string;
  status: OrderStatus;
};

export default function LockerInfoCard({
  name,
  address,
  slotNumber,
  accessCode,
  status,
}: Props) {
  return (
    <div className='bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-2'>
      <h3 className='text-lg font-semibold text-gray-800'>
        Locker Information
      </h3>

      <p className='text-sm text-gray-900'>{name}</p>
      <p className='text-sm text-gray-500'>{address}</p>

      {slotNumber && <CodeBadge label='Slot' value={slotNumber} />}

      {accessCode && <CodeBadge label='Access Code' value={accessCode} />}

      {!slotNumber && !accessCode && status === OrderStatus.IN_PROGRESS && (
        <p className='text-xs text-gray-400 italic'>
          Slot and code will appear once delivered.
        </p>
      )}
    </div>
  );
}
