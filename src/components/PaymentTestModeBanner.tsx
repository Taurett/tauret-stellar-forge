const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith("pk_test_")) return null;

  return (
    <div className="w-full bg-warning/15 border-b border-warning/40 px-4 py-2 text-center text-xs font-tech uppercase tracking-[0.2em] text-warning-foreground/90 fixed top-0 left-0 z-[100]">
      Test mode · all payments in the preview are simulated.{" "}
      <a
        href="https://docs.lovable.dev/features/payments#test-and-live-environments"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-medium"
      >
        Learn more
      </a>
    </div>
  );
}
