'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const loginAsAdmin = () => {
    document.cookie = 'role=admin; path=/';
    router.push('/admin/lockers');
  };

  const loginAsUser = () => {
    document.cookie = 'role=user; path=/';
    router.push('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white border p-8 rounded-lg shadow w-80'>
        <h1 className='text-xl font-semibold mb-6'>Login</h1>

        <button
          onClick={loginAsAdmin}
          className='w-full bg-green-600 text-white py-2 rounded mb-3'
        >
          Login as Admin
        </button>

        <button onClick={loginAsUser} className='w-full border py-2 rounded'>
          Login as Client
        </button>
      </div>
    </div>
  );
}
