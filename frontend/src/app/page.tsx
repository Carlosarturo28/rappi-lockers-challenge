import Link from 'next/link';
import Image from 'next/image';

function RoleCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className='
        group
        rounded-xl
        border
        border-gray-200
        bg-white
        p-6
        transition
        hover:border-gray-300
        hover:bg-gray-50
        focus:outline-none
        focus:ring-2
        focus:ring-gray-900
      '
    >
      <h2 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h2>
      <p className='text-sm text-gray-600 leading-relaxed'>{description}</p>

      <div className='mt-4 text-sm font-medium text-gray-900'>Enter →</div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-5xl'>
        <div className='flex flex-col items-center mb-12'>
          <Image
            src='/logo.svg'
            alt='Rappi Logo'
            width={96}
            height={96}
            priority
            className='mb-6'
          />

          <h1 className='text-3xl font-semibold text-gray-900 mb-2 text-center'>
            Rappi Lockers
          </h1>
          <p className='text-gray-600 text-center max-w-xl'>
            Internal MVP to simulate locker-based order delivery.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <RoleCard
            title='Client'
            description='Create an order and check its locker status.'
            href='/client/create-order'
          />

          <RoleCard
            title='Admin'
            description='Manage lockers and system configuration.'
            href='/admin/lockers'
          />

          <RoleCard
            title='Courier'
            description='Simulate order delivery and locker assignment.'
            href='/admin/courier-actions'
          />
        </div>
      </div>
    </div>
  );
}
