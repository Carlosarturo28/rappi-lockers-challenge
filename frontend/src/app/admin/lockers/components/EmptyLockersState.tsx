export default function EmptyLockersState() {
  return (
    <div
      className='
        bg-white border border-gray-100
        rounded-xl p-8
        text-center
        shadow-sm
      '
    >
      <p className='text-gray-600'>No lockers yet.</p>
      <p className='text-sm text-gray-400 mt-1'>
        Create your first locker to start receiving orders.
      </p>
    </div>
  );
}
