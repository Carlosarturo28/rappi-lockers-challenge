import { Locker } from '@/types/locker';

export default function LockerCard({ locker }: { locker: Locker }) {
  return (
    <div
      className='
        bg-white border border-gray-100
        rounded-xl p-4
        shadow-sm hover:shadow-md
        transition
      '
    >
      <p className='text-base font-medium text-gray-800 mb-1'>{locker.name}</p>

      <p className='text-sm text-gray-500 mb-2 line-clamp-2'>
        {locker.address}
      </p>

      <p className='text-xs text-gray-400'>
        {locker.latitude}, {locker.longitude}
      </p>

      <p className='text-xs text-gray-400 mt-1'>
        {new Date(locker.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
