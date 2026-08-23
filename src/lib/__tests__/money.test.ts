import { describe, it, expect } from 'vitest';
import { formatMoney, invoiceTotal } from '../money';

describe('formatMoney', () => {
  it('formats an amount as a currency string', () => {
    expect(formatMoney(4800)).toBe('$4800.00');
    expect(formatMoney(35)).toBe('$35.00');
  });

  it('uses the currency symbol', () => {
    expect(formatMoney(10, 'EUR')).toBe('€10.00');
    expect(formatMoney(10, 'GBP')).toBe('£10.00');
  });
});

describe('invoiceTotal', () => {
  it('sums line items', () => {
    expect(invoiceTotal([{ qty: 2, unit: 5 }, { qty: 1, unit: 2.5 }])).toBe(12.5);
  });
});
