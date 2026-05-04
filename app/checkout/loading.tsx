export default function CheckoutLoading() {
  return (
    <div className="container py-8 md:py-10">
      <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 md:mt-8 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
        <div className="lg:order-2">
          <div className="h-44 animate-pulse rounded-xl border border-slate-200 bg-white" />
        </div>
        <div className="lg:order-1 space-y-6">
          <div className="h-32 animate-pulse rounded-xl border border-slate-200 bg-white" />
          <div className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white" />
          <div className="h-44 animate-pulse rounded-xl border border-slate-200 bg-white" />
          <div className="h-12 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
