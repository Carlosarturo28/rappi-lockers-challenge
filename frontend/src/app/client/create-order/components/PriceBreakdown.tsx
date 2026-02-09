type Props = {
  subtotal: number;
  delivery: number;
  tax: number;
};

export default function PriceBreakdown({ subtotal, delivery, tax }: Props) {
  const total = subtotal + delivery + tax;

  return (
    <div className='mt-4 text-sm text-gray-700 space-y-1'>
      <Row label='Subtotal' value={subtotal} />
      <Row label='Delivery' value={delivery} />
      <Row label='Tax' value={tax} />
      <div className='border-t border-gray-200 mt-2 pt-2 font-semibold text-gray-900 flex justify-between'>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className='flex justify-between'>
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}
