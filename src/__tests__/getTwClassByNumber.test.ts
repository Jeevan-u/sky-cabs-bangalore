// Tests for getTwClassByNumber utility
import getTwClassByNumber from '../utils/getTwClassByNumber';

describe('getTwClassByNumber - grid-cols', () => {
  it('returns base grid-cols class with no screen prefix', () => {
    expect(getTwClassByNumber(3, 'grid-cols')).toBe('grid-cols-3');
    expect(getTwClassByNumber(1, 'grid-cols')).toBe('grid-cols-1');
    expect(getTwClassByNumber(12, 'grid-cols')).toBe('grid-cols-12');
  });

  it('returns empty string for out-of-range index', () => {
    expect(getTwClassByNumber(0, 'grid-cols')).toBe('');
    expect(getTwClassByNumber(13, 'grid-cols')).toBe('');
  });

  it('returns sm: prefixed grid class', () => {
    expect(getTwClassByNumber(4, 'grid-cols', 'sm')).toBe('sm:grid-cols-4');
  });

  it('returns md: prefixed grid class', () => {
    expect(getTwClassByNumber(6, 'grid-cols', 'md')).toBe('md:grid-cols-6');
  });

  it('returns lg: prefixed grid class', () => {
    expect(getTwClassByNumber(2, 'grid-cols', 'lg')).toBe('lg:grid-cols-2');
  });

  it('returns xl: prefixed grid class', () => {
    expect(getTwClassByNumber(5, 'grid-cols', 'xl')).toBe('xl:grid-cols-5');
  });

  it('returns 2xl: prefixed grid class', () => {
    expect(getTwClassByNumber(8, 'grid-cols', '2xl')).toBe('2xl:grid-cols-8');
  });

  it('returns undefined for "gap" type (not implemented)', () => {
    // The function only has grid-cols logic; gap returns undefined
    expect(getTwClassByNumber(3, 'gap')).toBeUndefined();
  });
});
