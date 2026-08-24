import type { Invoice } from './data';

/**
 * Send eligibility for an invoice.
 *
 * Sending requires the customer to have a tax ID. When it is missing,
 * `sendInvoice` blocks the send and reports `reason: 'missing_tax_id'` so the
 * UI can explain why Send is unavailable instead of doing nothing.
 */
export function canSend(invoice: Invoice): boolean {
  return Boolean(invoice.customer.taxId);
}

export interface SendResult {
  sent: boolean;
  reason?: 'missing_tax_id';
}

export function sendInvoice(invoice: Invoice): SendResult {
  if (!canSend(invoice)) {
    return { sent: false, reason: 'missing_tax_id' };
  }
  return { sent: true };
}
