type Props = {
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
};

export default function CollectOrderButton({
  onClick,
  disabled,
  loading,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className='
        w-full mt-6
        bg-green-600 hover:bg-green-700
        text-white font-semibold
        py-3 px-6 rounded-xl
        shadow-md transition
        disabled:opacity-50 disabled:cursor-not-allowed
      '
    >
      {loading ? 'Collecting...' : 'Mark as Collected'}
    </button>
  );
}
