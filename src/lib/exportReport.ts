// Export invoices to a downloadable report.

export class ExportError extends Error {}

/** Export the month's invoices. Throws a friendly ExportError on failure. */
export async function exportInvoices(range: { from: string; to: string }): Promise<Blob> {
  const res = await fetch(`/api/reports/export?from=${range.from}&to=${range.to}`);
  if (!res.ok) {
    throw new ExportError(`Export failed (${res.status}). Please try again.`);
  }
  const data = await res.json();
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}
