import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gray-50'>
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
                href='/'
                className='font-medium hover:text-green-500 text-gray-700'
              >
                Go home
              </Link>
            </li>
            <li>
              <Link
                href='/client/create-order'
                className='font-medium hover:text-green-500 text-gray-700'
              >
                Create order
              </Link>
            </li>
            <li>
              <Link
                href='/client/my-orders'
                className='font-medium hover:text-green-500 text-gray-700'
              >
                My Orders
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='container mx-auto p-6'>{children}</main>
    </div>
  );
}
