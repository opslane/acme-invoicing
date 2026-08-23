import { describe, it, expect } from 'vitest';
import { formatMoney, invoiceTotal } from '../money';

describe('formatMoney', () => {
  it('formats cents as a currency string', () => {
    expect(formatMoney(480000)).toBe('$4800.00');
    expect(formatMoney(3500)).toBe('$35.00');
  });

  it('uses the currency symbol', () => {
    expect(formatMoney(1000, 'EUR')).toBe('€10.00');
    expect(formatMoney(1000, 'GBP')).toBe('£10.00');
  });
});

describe('invoiceTotal', () => {
  it('sums line items', () => {
    expect(invoiceTotal([{ qty: 2, unitCents: 500 }, { qty: 1, unitCents: 250 }])).toBe(1250);
  });
});
