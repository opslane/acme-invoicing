import { describe, it, expect, vi, afterEach } from 'vitest';
import { exportInvoices, ExportError } from '../exportReport';

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

// Regression: a 500 used to produce an unhandled rejection and a blank export.
describe('exportInvoices on a server error', () => {
  it('throws a friendly ExportError on 500', async () => {
    globalThis.fetch = vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) })) as unknown as typeof fetch;
    await expect(exportInvoices({ from: 'a', to: 'b' })).rejects.toBeInstanceOf(ExportError);
    await expect(exportInvoices({ from: 'a', to: 'b' })).rejects.toThrow(/try again/i);
  });
});
