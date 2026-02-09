import Image from 'next/image';

type Props = {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

export default function OrderItemRow({
  name,
  quantity,
  price,
  imageUrl,
}: Props) {
  return (
    <div className='flex items-center justify-between py-3 border-b border-gray-100'>
      <div className='flex items-center gap-3'>
        <Image
          src={imageUrl}
          width={50}
          height={50}
          alt={name}
          className='w-14 h-14 object-cover rounded-lg border border-gray-200'
        />
        <div>
          <p className='font-medium text-gray-800'>
            {quantity}× {name}
          </p>
          <p className='text-sm text-gray-500'>${price.toFixed(2)} each</p>
        </div>
      </div>

      <p className='font-semibold text-gray-800'>
        ${(price * quantity).toFixed(2)}
      </p>
    </div>
  );
}
