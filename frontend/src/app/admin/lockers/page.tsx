import { get } from '@/services/api';
import { Locker } from '@/types/locker';
import LockersHeader from './components/LockersHeader';
import EmptyLockersState from './components/EmptyLockersState';
import LockerCard from './components/LockerCard';

async function getLockers(): Promise<Locker[]> {
  try {
    return await get<Locker[]>('/lockers');
  } catch (error) {
    console.error('Failed to fetch lockers:', error);
    return [];
  }
}

export default async function AdminLockersPage() {
  const lockers = await getLockers();

  return (
    <div className='max-w-5xl mx-auto'>
      <LockersHeader />

      {lockers.length === 0 ? (
        <EmptyLockersState />
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {lockers.map((locker) => (
            <LockerCard key={locker.id} locker={locker} />
          ))}
        </div>
      )}
    </div>
  );
}
