// Currency formatting for invoice amounts.

/**
 * Format a minor-unit amount (cents) as a currency string.
 *
 * NOTE (planted bug for the null-deref card): a draft invoice can have a null
 * `amount` before any line items are added. `amount.toFixed` then throws
 * "Cannot read properties of null (reading 'toFixed')". The fix is a null guard.
 */
export function formatMoney(amountCents: number, currency = 'USD'): string {
  const value = amountCents / 100;
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  // BUG: no guard for null/undefined amountCents.
  return `${symbol}${(value as number).toFixed(2)}`;
}

export function invoiceTotal(lineItems: { qty: number; unitCents: number }[]): number {
  return lineItems.reduce((sum, li) => sum + li.qty * li.unitCents, 0);
}
