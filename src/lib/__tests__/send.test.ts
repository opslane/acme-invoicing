import { describe, it, expect } from 'vitest';
import { canSend, sendInvoice } from '../send';
import type { Invoice } from '../data';

const base: Invoice = {
  id: 'inv_1', number: 'INV-1',
  customer: { name: 'Acme', email: 'a@acme.test', taxId: 'EU123' },
  currency: 'USD', lineItems: [{ description: 'x', qty: 1, unit: 100 }],
  dueDate: '2026-09-01', status: 'draft',
};
const noTax: Invoice = { ...base, customer: { ...base.customer, taxId: null } };

describe('canSend', () => {
  it('is true with a tax id and false without', () => {
    expect(canSend(base)).toBe(true);
    expect(canSend(noTax)).toBe(false);
  });
});

describe('sendInvoice', () => {
  it('sends when eligible', () => {
    expect(sendInvoice(base)).toEqual({ sent: true });
  });

  it('blocks with a missing_tax_id reason when the customer has no tax id', () => {
    expect(sendInvoice(noTax)).toEqual({ sent: false, reason: 'missing_tax_id' });
  });
});
