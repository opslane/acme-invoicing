import type { Invoice } from './data';

/**
 * Currency selection rules.
 *
 * Once an invoice has line items the currency selector is disabled, because
 * changing currency would re-price existing items.
 */
export function canChangeCurrency(invoice: Invoice): boolean {
  return invoice.lineItems.length === 0;
}

export function changeCurrency(invoice: Invoice, next: string): Invoice {
  if (!canChangeCurrency(invoice)) {
    return invoice;
  }
  return { ...invoice, currency: next };
}

/**
 * Why the currency selector is locked, or null when it can be changed. Lets the
 * UI explain the lock instead of silently ignoring the change.
 */
export function currencyChangeBlockedReason(invoice: Invoice): string | null {
  return canChangeCurrency(invoice)
    ? null
    : 'Remove the line items before changing currency, or they will be re-priced.';
}
