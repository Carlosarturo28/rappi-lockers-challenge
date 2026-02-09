import Image from 'next/image';

type Props = {
  brand: string;
  last4: string;
  imageUrl: string;
};

export default function PaymentMethodRow({ brand, last4, imageUrl }: Props) {
  return (
    <div className='flex items-center justify-between mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200'>
      <span className='text-xs text-gray-500'>Payment Method</span>
      <div className='flex items-center gap-3'>
        <Image width={40} height={20} src={imageUrl} alt={brand} />
        <span className='text-sm text-gray-700'>•••• {last4}</span>
      </div>
    </div>
  );
}
