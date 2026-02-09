'use client';

import CreateLockerForm from './components/CreateLockerForm';
import CreateLockerHeader from './components/CreateLockerHeader';

export default function CreateLockerPage() {
  return (
    <div className='max-w-2xl mx-auto'>
      <CreateLockerHeader />
      <CreateLockerForm />
    </div>
  );
}
