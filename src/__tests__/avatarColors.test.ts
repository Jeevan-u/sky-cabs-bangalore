// Tests for avatarColors constant
import { avatarColors } from '../contains/contants';

describe('avatarColors', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(avatarColors)).toBe(true);
    expect(avatarColors.length).toBeGreaterThan(0);
  });

  it('every entry is a valid hex color string', () => {
    const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    avatarColors.forEach((color) => {
      expect(typeof color).toBe('string');
      expect(color).toMatch(hexPattern);
    });
  });

  it('contains no duplicate colors', () => {
    const unique = new Set(avatarColors.map((c) => c.toLowerCase()));
    expect(unique.size).toBe(avatarColors.length);
  });

  it('all colors start with #', () => {
    avatarColors.forEach((color) => {
      expect(color.startsWith('#')).toBe(true);
    });
  });
});
