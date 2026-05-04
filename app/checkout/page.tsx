import CheckoutForm from './checkout-form';
import CheckoutSummary from './checkout-summary';

export default function CheckoutPage() {
  return (
    <div className="container py-8 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold">תשלום</h1>
      <div className="mt-6 md:mt-8 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
        <div className="lg:order-2">
          <CheckoutSummary />
        </div>
        <div className="lg:order-1">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
