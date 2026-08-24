import type { Invoice } from './data';

/**
 * Send eligibility for an invoice. Sending is blocked when the customer has no
 * tax ID; the result carries a `reason` so the UI can explain the block.
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
