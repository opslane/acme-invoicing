import { describe, it, expect } from 'vitest';
import { parseDueDate, formatReportDate } from '../dates';

describe('parseDueDate', () => {
  it('parses an ISO date', () => {
    const d = parseDueDate('2026-09-15');
    expect(d).toBeInstanceOf(Date);
    expect(d?.getUTCFullYear()).toBe(2026);
  });
});

describe('formatReportDate', () => {
  it('formats an ISO timestamp as a date', () => {
    expect(formatReportDate('2026-08-01T00:00:00.000Z')).toBe('2026-08-01');
  });
});
