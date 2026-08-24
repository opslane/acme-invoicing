import { describe, it, expect } from 'vitest';
import { formatMoney } from '../money';

// Regression: a draft line item with a null amount used to throw
// "Cannot read properties of null (reading 'toFixed')".
describe('formatMoney null amount', () => {
  it('does not throw and renders zero', () => {
    expect(() => formatMoney(null)).not.toThrow();
    expect(formatMoney(null)).toBe('$0.00');
  });
});
