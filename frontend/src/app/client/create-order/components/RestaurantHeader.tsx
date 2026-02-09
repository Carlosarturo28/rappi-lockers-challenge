import Image from 'next/image';

type Props = {
  name: string;
  category: string;
  eta: string;
  imageUrl: string;
  rating?: number;
};

export default function RestaurantHeader({
  name,
  category,
  eta,
  imageUrl,
  rating,
}: Props) {
  return (
    <div className='mb-6 bg-white shadow-sm rounded-xl p-4 border border-gray-100 flex gap-4 items-center'>
      <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-200'>
        <Image width={280} height={280} src={imageUrl} alt={name} />
      </div>

      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>

          {rating !== undefined && (
            <span className='text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md'>
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className='text-sm text-gray-500'>{category}</p>
        <p className='text-sm text-green-600 mt-1'>ETA: {eta}</p>
      </div>
    </div>
  );
}
