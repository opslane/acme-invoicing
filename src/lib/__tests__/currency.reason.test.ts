import { describe, it, expect } from 'vitest';
import { currencyChangeBlockedReason } from '../currency';
import type { Invoice } from '../data';

const base: Invoice = {
  id: 'inv_1', number: 'INV-1',
  customer: { name: 'Acme', email: 'a@acme.test', taxId: 'EU1' },
  currency: 'USD', lineItems: [], dueDate: '2026-09-01', status: 'draft',
};
const withItems: Invoice = { ...base, lineItems: [{ description: 'x', qty: 1, unit: 1 }] };

// Regression: the selector locked with no explanation once line items existed.
describe('currencyChangeBlockedReason', () => {
  it('explains the lock only when line items exist', () => {
    expect(currencyChangeBlockedReason(base)).toBeNull();
    expect(currencyChangeBlockedReason(withItems)).toMatch(/re-priced/);
  });
});
