/**
 * InvoiceDownloadButton — generate & download a PDF receipt for an order.
 */
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateInvoicePdf } from "@/lib/invoicePdf";
import type { ReceiptOrder } from "@/components/OrderReceipt";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  order: ReceiptOrder;
  className?: string;
}

const InvoiceDownloadButton = ({ order, className }: Props) => {
  const { t } = useLanguage();
  return (
    <Button
      variant="outline"
      onClick={() => generateInvoicePdf(order)}
      className={`glass border-primary/30 font-tech uppercase tracking-widest clip-angle ${className ?? ""}`}
    >
      <Download className="w-4 h-4 mr-2" />
      {t("invoice.download") || "Download PDF"}
    </Button>
  );
};

export default InvoiceDownloadButton;
