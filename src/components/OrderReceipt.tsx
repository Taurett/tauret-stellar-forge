/**
 * OrderReceipt — Styled HTML invoice/receipt block, also print-friendly.
 * Used by /checkout/return (post-purchase) and /orders/:id (history view).
 */
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ReceiptItem {
  product_name: string;
  unit_amount: number; // cents
  quantity: number;
  subtotal: number;    // cents
}

export interface ReceiptOrder {
  id?: string;
  stripe_session_id: string;
  customer_email: string | null;
  amount_total: number;
  currency: string;
  status: string;
  created_at: string;
  order_items: ReceiptItem[];
}

const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100);

const OrderReceipt = ({ order }: { order: ReceiptOrder }) => {
  const { t } = useLanguage();
  const items = order.order_items ?? [];
  const dateLabel = new Date(order.created_at).toLocaleString();

  return (
    <article className="glass clip-angle-lg border border-primary/20 p-6 md:p-10 print:bg-white print:text-black print:border-black/10 print:shadow-none">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.4em] text-primary mb-2">
            TAURET · Receipt
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black">
            <span className="text-aurora print:!text-black">Order Confirmation</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-2">{dateLabel}</p>
        </div>
        <div className="text-right space-y-1">
          <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Status
          </div>
          <div className="font-tech text-sm uppercase tracking-widest text-primary">
            {order.status}
          </div>
        </div>
      </header>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <dt className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
            Customer
          </dt>
          <dd className="break-all">{order.customer_email || "—"}</dd>
        </div>
        <div>
          <dt className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
            Reference
          </dt>
          <dd className="font-mono text-[11px] break-all">{order.stripe_session_id}</dd>
        </div>
      </dl>

      <div className="border-t border-border/60 print:border-black/30">
        <div className="hidden sm:grid grid-cols-12 gap-2 py-3 font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-b border-border/60 print:border-black/20">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-right">Unit</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>
        {items.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No line items
          </div>
        ) : (
          items.map((it, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-2 py-4 border-b border-border/30 last:border-b-0 print:border-black/10 text-sm"
            >
              <div className="col-span-12 sm:col-span-6 font-medium">
                {it.product_name}
              </div>
              <div className="col-span-4 sm:col-span-2 text-right text-muted-foreground sm:text-foreground">
                {formatMoney(it.unit_amount, order.currency)}
              </div>
              <div className="col-span-4 sm:col-span-2 text-right">
                ×{it.quantity}
              </div>
              <div className="col-span-4 sm:col-span-2 text-right font-tech font-bold">
                {formatMoney(it.subtotal, order.currency)}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end mt-6">
        <div className="w-full sm:w-72 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatMoney(order.amount_total, order.currency)}</span>
          </div>
          <div className="flex justify-between text-lg font-tech font-black border-t border-border/60 pt-2 print:border-black/30">
            <span>Total</span>
            <span className="text-aurora print:!text-black">
              {formatMoney(order.amount_total, order.currency)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end print:hidden">
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="glass border-primary/30 font-tech uppercase tracking-widest clip-angle"
        >
          <Printer className="w-4 h-4 mr-2" />
          {t("checkout.return.print") || "Print / Save PDF"}
        </Button>
      </div>
    </article>
  );
};

export default OrderReceipt;
