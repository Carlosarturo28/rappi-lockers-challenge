import OrderItemRow from './OrderItemRow';
import PriceBreakdown from './PriceBreakdown';
import PaymentMethodRow from './PaymentMethodRow';

type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

type Props = {
  items: Item[];
};

export default function OrderSummaryCard({ items }: Props) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const delivery = 3.5;
  const tax = subtotal * 0.1;

  return (
    <div className='bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-8'>
      <h3 className='text-lg font-semibold mb-3 text-gray-800'>Your Order</h3>

      {items.map((item) => (
        <OrderItemRow key={item.id} {...item} />
      ))}

      <PriceBreakdown subtotal={subtotal} delivery={delivery} tax={tax} />

      <PaymentMethodRow brand='Visa' last4='4242' imageUrl='/visa.jpg' />
    </div>
  );
}
