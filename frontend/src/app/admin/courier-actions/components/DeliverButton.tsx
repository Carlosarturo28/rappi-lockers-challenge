type Props = {
  onClick: () => void;
};

export default function DeliverButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className='
        bg-gray-900 hover:bg-gray-800
        text-white text-sm font-medium
        px-4 py-2
        rounded-lg
        transition
      '
    >
      Mark Delivered
    </button>
  );
}
