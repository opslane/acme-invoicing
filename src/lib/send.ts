import type { Invoice } from './data';

/**
 * Send eligibility for an invoice. Sending requires the customer to have a
 * tax ID; an ineligible invoice is never sent, and the result says why.
 */
export function canSend(invoice: Invoice): boolean {
  return Boolean(invoice.customer.taxId);
}

export function sendInvoice(invoice: Invoice): { sent: boolean; reason?: 'missing_tax_id' } {
  if (!canSend(invoice)) {
    return { sent: false, reason: 'missing_tax_id' };
  }
  return { sent: true };
}
