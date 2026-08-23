// Currency formatting for invoice amounts (amounts are in whole currency units).

/** Format a monetary amount as a currency string. */
export function formatMoney(amount: number | null, currency = 'USD'): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  // A draft line item can have a null amount before it is priced; default to 0.
  return `${symbol}${(amount ?? 0).toFixed(2)}`;
}

export function invoiceTotal(lineItems: { qty: number; unit: number }[]): number {
  return lineItems.reduce((sum, li) => sum + li.qty * li.unit, 0);
}
