import { useEffect, useState } from 'react';
import { get } from '@/services/api';
import { Locker } from '@/types/locker';

export function useLockers(location?: { latitude: number; longitude: number }) {
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchLockers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await get<Locker[]>(
          `/lockers?latitude=${location.latitude}&longitude=${location.longitude}`,
        );
        setLockers(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.info?.message || 'Failed to load lockers.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLockers();
  }, [location]);

  return { lockers, isLoading, error };
}
