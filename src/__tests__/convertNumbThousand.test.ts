// Tests for convertNumbThousand utility
import convertNumbThousand from '../utils/convertNumbThousand';

describe('convertNumbThousand', () => {
  it('returns "0" for undefined input', () => {
    expect(convertNumbThousand(undefined)).toBe('0');
  });

  it('returns "0" for 0 (falsy)', () => {
    expect(convertNumbThousand(0)).toBe('0');
  });

  it('formats 1000 with comma separator', () => {
    const result = convertNumbThousand(1000);
    expect(result).toMatch(/1,000/);
  });

  it('formats 1000000 as 1,000,000', () => {
    const result = convertNumbThousand(1000000);
    expect(result).toMatch(/1,000,000/);
  });

  it('handles numbers under 1000 without comma', () => {
    const result = convertNumbThousand(500);
    expect(result).toBe('500');
  });

  it('handles negative numbers', () => {
    const result = convertNumbThousand(-1500);
    expect(result).toMatch(/-?1,500/);
  });

  it('handles decimal numbers', () => {
    const result = convertNumbThousand(1234.56);
    expect(result).toContain('1,234');
  });
});
