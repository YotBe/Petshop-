import CheckoutForm from './checkout-form';
import CheckoutSummary from './checkout-summary';

export default function CheckoutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </div>
  );
}
