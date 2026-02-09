type Props = {
  label: string;
  value: string;
};

export default function InfoRow({ label, value }: Props) {
  return (
    <div className='bg-white border border-gray-100 rounded-xl p-4 shadow-sm'>
      <p className='text-xs text-gray-500'>{label}</p>
      <p className='text-sm font-medium text-gray-900 mt-1'>{value}</p>
    </div>
  );
}
