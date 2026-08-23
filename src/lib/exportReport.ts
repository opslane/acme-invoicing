// Export invoices to a downloadable report.

/**
 * NOTE (planted bug for the unhandled-rejection card): exportInvoices awaits a
 * fetch that can return 500, with no try/catch. The rejection is unhandled and
 * the export view goes blank. The fix wraps it in try/catch with a user-facing
 * retry.
 */
export async function exportInvoices(range: { from: string; to: string }): Promise<Blob> {
  const res = await fetch(`/api/reports/export?from=${range.from}&to=${range.to}`);
  // BUG: no res.ok check; a 500 yields an unhandled rejection downstream.
  const data = await res.json();
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}
