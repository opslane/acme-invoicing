import { describe, it, expect } from 'vitest';
import { formatReportDate } from '../dates';

// Regression: a bad range value used to throw "RangeError: Invalid time value".
describe('formatReportDate invalid input', () => {
  it('does not throw on an invalid value', () => {
    expect(() => formatReportDate('not-a-date')).not.toThrow();
    expect(formatReportDate('not-a-date')).toBe('—');
  });
});
