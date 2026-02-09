import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='text-white p-4 shadow-md'>
        <nav className='container mx-auto flex justify-between items-center'>
          <Link href='/' className='text-xl font-bold'>
            <Image
              src='/logo.svg'
              alt='Rappi Logo'
              width={80}
              height={20}
              priority
            />
          </Link>
          <ul className='flex space-x-4'>
            <li>
              <Link
                href='/admin/lockers'
                className='font-medium hover:text-green-500 text-gray-700'
              >
                Lockers
              </Link>
            </li>
            <li>
              <Link
                href='/admin/courier-actions'
                className='font-medium hover:text-green-500 text-gray-700'
              >
                Courier Actions
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='container mx-auto p-6'>{children}</main>
    </div>
  );
}
