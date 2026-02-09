import Link from 'next/link';

export default function LockersHeader() {
  return (
    <div className='flex items-center justify-between mb-6'>
      <div>
        <h1 className='text-2xl font-semibold text-gray-800'>Lockers</h1>
        <p className='text-sm text-gray-500'>Manage delivery lockers</p>
      </div>

      <Link
        href='/admin/lockers/create'
        className='
          bg-gray-900 hover:bg-gray-800
          text-white text-sm font-medium
          px-4 py-2 rounded-lg
          transition
        '
      >
        Create Locker
      </Link>
    </div>
  );
}
