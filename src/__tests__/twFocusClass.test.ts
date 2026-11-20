// Tests for twFocusClass utility
import twFocusClass from '../utils/twFocusClass';

describe('twFocusClass', () => {
  it('returns "focus:outline-none" by default (no ring)', () => {
    expect(twFocusClass()).toBe('focus:outline-none');
  });

  it('returns "focus:outline-none" when hasRing is false', () => {
    expect(twFocusClass(false)).toBe('focus:outline-none');
  });

  it('returns full ring class string when hasRing is true', () => {
    const result = twFocusClass(true);
    expect(result).toContain('focus:outline-none');
    expect(result).toContain('focus:ring-2');
    expect(result).toContain('focus:ring-offset-2');
    expect(result).toContain('focus:ring-primary-6000');
    expect(result).toContain('dark:focus:ring-offset-0');
  });
});
