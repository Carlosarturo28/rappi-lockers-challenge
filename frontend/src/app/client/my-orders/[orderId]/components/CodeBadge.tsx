type Props = {
  label: string;
  value: string;
};

export default function CodeBadge({ label, value }: Props) {
  return (
    <div className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3'>
      <p className='text-xs text-gray-500 mb-1'>{label}</p>

      <p
        className='
          font-mono
          text-lg
          tracking-wider
          text-gray-900
          font-semibold
        '
      >
        {value}
      </p>
    </div>
  );
}
