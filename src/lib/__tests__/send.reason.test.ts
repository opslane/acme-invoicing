import { describe, it, expect } from 'vitest';
import { sendInvoice } from '../send';
import type { Invoice } from '../data';

const noTax: Invoice = {
  id: 'inv_1', number: 'INV-1',
  customer: { name: 'Acme', email: 'a@acme.test', taxId: null },
  currency: 'USD', lineItems: [{ description: 'x', qty: 1, unit: 1 }],
  dueDate: '2026-09-01', status: 'draft',
};

// Regression: Send used to no-op with no reason, so the UI could not explain it.
describe('sendInvoice without a tax id', () => {
  it('reports why it did not send', () => {
    const r = sendInvoice(noTax);
    expect(r.sent).toBe(false);
    expect(r.reason).toBe('missing_tax_id');
  });
});
