/**
 * Generate a styled PDF invoice from an order using jsPDF.
 *
 * Produces a clean, brand-consistent receipt with line items, totals, and
 * order metadata. Triggers a browser download.
 */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ReceiptOrder } from "@/components/OrderReceipt";

const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format((cents || 0) / 100);

export function generateInvoicePdf(order: ReceiptOrder, opts: { brand?: string } = {}) {
  const brand = opts.brand ?? "TAURET";
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text(brand, 40, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("INVOICE / RECEIPT", 40, 70);

  // Right side: order ref
  doc.setFontSize(9);
  const dateStr = new Date(order.created_at).toLocaleString();
  const refLines = [
    `Date: ${dateStr}`,
    `Status: ${order.status.toUpperCase()}`,
    `Ref: ${order.stripe_session_id.slice(0, 24)}…`,
  ];
  refLines.forEach((line, i) => {
    doc.text(line, pageWidth - 40, 35 + i * 14, { align: "right" });
  });

  // Customer block
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("BILL TO", 40, 130);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(order.customer_email || "—", 40, 148);

  // Line items table
  const items = order.order_items ?? [];
  autoTable(doc, {
    startY: 180,
    head: [["Item", "Unit", "Qty", "Subtotal"]],
    body: items.length > 0
      ? items.map((it) => [
          it.product_name,
          formatMoney(it.unit_amount, order.currency),
          String(it.quantity),
          formatMoney(it.subtotal, order.currency),
        ])
      : [["No items", "—", "—", "—"]],
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: "bold" },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { halign: "right", cellWidth: 80 },
      2: { halign: "right", cellWidth: 50 },
      3: { halign: "right", cellWidth: 80 },
    },
    margin: { left: 40, right: 40 },
  });

  // Total block
  // @ts-ignore - lastAutoTable is added by autotable plugin
  const finalY: number = (doc as any).lastAutoTable.finalY ?? 220;
  const totalY = finalY + 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Subtotal", pageWidth - 160, totalY);
  doc.text(formatMoney(order.amount_total, order.currency), pageWidth - 40, totalY, { align: "right" });

  doc.setLineWidth(0.5);
  doc.line(pageWidth - 200, totalY + 6, pageWidth - 40, totalY + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL", pageWidth - 160, totalY + 24);
  doc.text(formatMoney(order.amount_total, order.currency), pageWidth - 40, totalY + 24, { align: "right" });

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.text(`Thanks for shopping with ${brand}.`, 40, footerY);
  doc.text("Questions? Contact support via the help center.", 40, footerY + 12);

  const filename = `${brand.toLowerCase()}-invoice-${order.stripe_session_id.slice(0, 10)}.pdf`;
  doc.save(filename);
}
