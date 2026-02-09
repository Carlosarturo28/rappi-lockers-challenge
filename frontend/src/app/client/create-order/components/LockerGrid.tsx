import { Locker } from '@/types/locker';
import LockerListItem from './LockerListItem';

type Props = {
  lockers: Locker[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function LockerGrid({ lockers, selectedId, onSelect }: Props) {
  const closestLockerId = lockers
    .filter((l) => l.distance !== undefined)
    .sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999))[0]?.id;

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {lockers.map((locker) => (
        <LockerListItem
          key={locker.id}
          locker={locker}
          isSelected={selectedId === locker.id}
          isClosest={locker.id === closestLockerId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
