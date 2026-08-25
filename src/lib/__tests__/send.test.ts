import { describe, it, expect } from 'vitest';
import { canSend, sendInvoice, sendBlockedReason } from '../send';
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

describe('sendBlockedReason', () => {
  it('is null when the invoice can be sent', () => {
    expect(sendBlockedReason(base)).toBeNull();
  });

  it('explains the missing tax id', () => {
    expect(sendBlockedReason(noTax)).toBe("Add the customer's tax ID to send this invoice.");
  });
});

describe('sendInvoice', () => {
  it('sends when eligible', () => {
    expect(sendInvoice(base)).toEqual({ sent: true });
  });

  it('does not send without a tax id and says why', () => {
    expect(sendInvoice(noTax)).toEqual({
      sent: false,
      reason: "Add the customer's tax ID to send this invoice.",
    });
  });
});
