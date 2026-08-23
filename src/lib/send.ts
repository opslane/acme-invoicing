import type { Invoice } from './data';

/**
 * Send eligibility for an invoice.
 *
 * NOTE (planted bug for the "Send invoice" dead-click card): when the customer
 * has no tax ID, `sendInvoice` silently returns without sending and without
 * telling the user why. The button stays enabled and clickable (cursor:pointer),
 * so users click it repeatedly and nothing happens — no error is ever thrown, so
 * an exception tracker sees nothing. The product decision: block Send with an
 * explanation, or allow sending without a tax ID.
 */
export function canSend(invoice: Invoice): boolean {
  return Boolean(invoice.customer.taxId);
}

export function sendInvoice(invoice: Invoice): { sent: boolean } {
  if (!canSend(invoice)) {
    // BUG: silent no-op. No thrown error, no user feedback.
    return { sent: false };
  }
  return { sent: true };
}
