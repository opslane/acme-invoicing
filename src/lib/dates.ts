// Due-date handling for invoices.

/** Parse a user-typed due date. */
export function parseDueDate(input: string): Date | null {
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

/** Format an ISO timestamp as a report date, tolerating a bad range value. */
export function formatReportDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toISOString().slice(0, 10);
}
