import Link from 'next/link';

export default function CreateLockerHeader() {
  return (
    <div className='mb-6'>
      <Link
        href='/admin/lockers'
        className='text-sm text-gray-500 hover:text-gray-700 transition'
      >
        ← Back to lockers
      </Link>

      <h1 className='text-2xl font-semibold text-gray-800 mt-2'>
        Create Locker
      </h1>
      <p className='text-sm text-gray-500'>Add a new delivery location</p>
    </div>
  );
}
