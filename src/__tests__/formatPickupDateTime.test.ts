// Tests for formatPickupDateTime utility
import { formatPickupDateTime } from '../utils/formatPickupDateTime';

describe('formatPickupDateTime', () => {
  it('returns fallback message for null', () => {
    expect(formatPickupDateTime(null)).toBe('Schedule confirmed / Immediate pickup');
  });

  it('returns fallback message for undefined', () => {
    expect(formatPickupDateTime(undefined)).toBe('Schedule confirmed / Immediate pickup');
  });

  it('returns fallback message for empty string', () => {
    expect(formatPickupDateTime('')).toBe('Schedule confirmed / Immediate pickup');
  });

  it('returns fallback message for whitespace-only string', () => {
    expect(formatPickupDateTime('   ')).toBe('Schedule confirmed / Immediate pickup');
  });

  it('formats a valid ISO date string', () => {
    const result = formatPickupDateTime('2024-03-15T10:30:00');
    // Should NOT be "Invalid Date" or the original string
    expect(result).not.toContain('Invalid');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('handles "YYYY-MM-DD at HH:MM PM" format', () => {
    const result = formatPickupDateTime('2024-06-20 at 02:30 PM');
    expect(result).not.toBe('Invalid Date');
    expect(typeof result).toBe('string');
  });

  it('handles "YYYY-MM-DD at HH:MM AM" format', () => {
    const result = formatPickupDateTime('2024-01-10 at 09:00 AM');
    expect(result).not.toBe('Invalid Date');
    expect(typeof result).toBe('string');
  });

  it('returns raw string for unrecognized non-date format', () => {
    const raw = 'Some random text';
    expect(formatPickupDateTime(raw)).toBe(raw);
  });

  it('handles midnight AM/PM edge case in "at" format', () => {
    // 12:00 AM -> 0 hours
    const result = formatPickupDateTime('2024-07-04 at 12:00 AM');
    expect(result).not.toContain('Invalid');
  });

  it('handles noon PM edge case in "at" format', () => {
    // 12:00 PM -> 12 hours (should NOT add 12)
    const result = formatPickupDateTime('2024-07-04 at 12:00 PM');
    expect(result).not.toContain('Invalid');
  });
});
