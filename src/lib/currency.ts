import type { Invoice } from './data';

/**
 * Currency selection rules.
 *
 * NOTE (planted bug for the currency-lock card): once an invoice has line
 * items, the currency selector is disabled with no explanation. Users try to
 * change it, nothing responds, and they abandon or work around it. No error is
 * thrown. The product+finance decision: convert existing amounts, reset the
 * line items, or prohibit the change with a clear message.
 */
export function canChangeCurrency(invoice: Invoice): boolean {
  return invoice.lineItems.length === 0;
}

export function changeCurrency(invoice: Invoice, next: string): Invoice {
  if (!canChangeCurrency(invoice)) {
    // BUG: silently ignored once line items exist.
    return invoice;
  }
  return { ...invoice, currency: next };
}
