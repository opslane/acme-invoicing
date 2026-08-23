import { describe, it, expect } from 'vitest';
import { canChangeCurrency, changeCurrency } from '../currency';
import type { Invoice } from '../data';

const empty: Invoice = {
  id: 'inv_1', number: 'INV-1',
  customer: { name: 'Acme', email: 'a@acme.test', taxId: 'EU1' },
  currency: 'USD', lineItems: [], dueDate: '2026-09-01', status: 'draft',
};
const withItems: Invoice = { ...empty, lineItems: [{ description: 'x', qty: 1, unitCents: 100 }] };

describe('canChangeCurrency', () => {
  it('is allowed only before line items exist', () => {
    expect(canChangeCurrency(empty)).toBe(true);
    expect(canChangeCurrency(withItems)).toBe(false);
  });
});

describe('changeCurrency', () => {
  it('changes currency on an empty invoice', () => {
    expect(changeCurrency(empty, 'EUR').currency).toBe('EUR');
  });
});
