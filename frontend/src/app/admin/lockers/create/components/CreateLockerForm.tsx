'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { post } from '@/services/api';
import { CreateLockerPayload, Locker } from '@/types/locker';
import { Input } from './Input';

export default function CreateLockerForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateLockerPayload>({
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await post<Locker>('/lockers', formData);
      router.push('/admin/lockers');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.info?.message || 'Failed to create locker.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='
        bg-white border border-gray-100
        rounded-xl p-6
        shadow-sm
      '
    >
      {error && (
        <div className='mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-5'>
        <Input
          label='Locker Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Locker Unicentro'
          disabled={loading}
        />

        <Input
          label='Address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          placeholder='Calle 123 #45-67'
          disabled={loading}
        />

        <div className='grid grid-cols-2 gap-4'>
          <Input
            label='Latitude'
            name='latitude'
            type='number'
            value={formData.latitude}
            onChange={handleChange}
            disabled={loading}
          />

          <Input
            label='Longitude'
            name='longitude'
            type='number'
            value={formData.longitude}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='
            w-full mt-2
            bg-gray-900 hover:bg-gray-800
            text-white font-medium
            py-3 rounded-lg
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          '
        >
          {loading ? 'Creating...' : 'Create Locker'}
        </button>
      </form>
    </div>
  );
}
