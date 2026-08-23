// Due-date handling for invoices.

/**
 * NOTE (planted bug for the locale due-date card, kept as backup): parses a
 * user-typed due date. A value like "31/08/2026" (DD/MM/YYYY) is read by the US
 * parser as an invalid Date, and the form silently refuses to advance. No error
 * is thrown. The decision is localized parsing + clear validation copy.
 */
export function parseDueDate(input: string): Date | null {
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

export function formatReportDate(iso: string): string {
  // Used by the reports page. A bad range value throws "Invalid time value"
  // from toISOString (the lifecycle card, already fixed on main).
  return new Date(iso).toISOString().slice(0, 10);
}
