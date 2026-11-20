// Tests for isInViewport utility
import isInViewport from '../utils/isInViewport';

describe('isInViewport', () => {
  const mockElement = (rect: Partial<DOMRect>): HTMLElement => {
    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
      ...rect,
    });
    return el;
  };

  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
  });

  it('returns true when element is fully within viewport', () => {
    const el = mockElement({ top: 10, left: 10, bottom: 200, right: 200 });
    expect(isInViewport(el)).toBe(true);
  });

  it('returns false when element is below viewport', () => {
    const el = mockElement({ top: 900, left: 0, bottom: 1000, right: 100 });
    expect(isInViewport(el)).toBe(false);
  });

  it('returns false when element is above viewport (top < 0)', () => {
    const el = mockElement({ top: -50, left: 0, bottom: -10, right: 100 });
    expect(isInViewport(el)).toBe(false);
  });

  it('returns false when element is to the right of viewport', () => {
    const el = mockElement({ top: 0, left: 1100, bottom: 100, right: 1200 });
    expect(isInViewport(el)).toBe(false);
  });

  it('returns false when element is to the left of viewport (left < 0)', () => {
    const el = mockElement({ top: 0, left: -10, bottom: 100, right: 50 });
    expect(isInViewport(el)).toBe(false);
  });
});
