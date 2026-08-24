import type { Invoice } from './data';

/** Send eligibility for an invoice. */
export function canSend(invoice: Invoice): boolean {
  return Boolean(invoice.customer.taxId);
}

export interface SendResult {
  sent: boolean;
  reason?: 'missing_tax_id';
}

/**
 * Send an invoice. When the customer has no tax ID we now return a reason so
 * the UI can explain why Send is unavailable, instead of silently doing nothing.
 */
export function sendInvoice(invoice: Invoice): SendResult {
  if (!canSend(invoice)) {
    return { sent: false, reason: 'missing_tax_id' };
  }
  return { sent: true };
}
