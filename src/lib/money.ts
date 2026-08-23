// Currency formatting for invoice amounts (amounts are in whole currency units).

/**
 * Format a monetary amount as a currency string.
 *
 * NOTE (planted bug for the null-deref card): a draft line item can have a null
 * amount before it is priced. `amount.toFixed` then throws
 * "Cannot read properties of null (reading 'toFixed')". The fix is a null guard.
 */
export function formatMoney(amount: number | null, currency = 'USD'): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  // BUG: no guard for a null amount.
  return `${symbol}${(amount as number).toFixed(2)}`;
}

export function invoiceTotal(lineItems: { qty: number; unit: number }[]): number {
  return lineItems.reduce((sum, li) => sum + li.qty * li.unit, 0);
}
