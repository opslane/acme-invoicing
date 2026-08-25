import type { Invoice } from './data';

/**
 * Send eligibility for an invoice.
 *
 * Invoices cannot be sent while the customer has no tax ID: downstream
 * compliance requires one on every issued invoice. The UI disables Send and
 * surfaces the reason from `sendBlockedReason` instead of silently no-op'ing.
 */
export function sendBlockedReason(invoice: Invoice): string | null {
  if (!invoice.customer.taxId) {
    return "Add the customer's tax ID to send this invoice.";
  }
  return null;
}

export function canSend(invoice: Invoice): boolean {
  return sendBlockedReason(invoice) === null;
}

export function sendInvoice(invoice: Invoice): { sent: boolean; reason?: string } {
  const reason = sendBlockedReason(invoice);
  if (reason) {
    return { sent: false, reason };
  }
  return { sent: true };
}
