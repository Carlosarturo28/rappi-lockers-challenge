type Props = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function ConfirmOrderButton({
  onClick,
  disabled,
  loading,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='cursor-pointer w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {loading ? 'Creating Order...' : 'Confirm Order'}
    </button>
  );
}
