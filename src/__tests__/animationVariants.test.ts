// Tests for animationVariants utility
import { variants } from '../utils/animationVariants';

describe('animationVariants', () => {
  describe('with defaults (x=1000, opacity=0)', () => {
    const v = variants();

    it('center state has x=0 and opacity=1', () => {
      expect(v.center).toEqual({ x: 0, opacity: 1 });
    });

    it('enter from positive direction slides in from right (+x)', () => {
      const enterState = v.enter(1);
      expect(enterState.x).toBe(1000);
      expect(enterState.opacity).toBe(0);
    });

    it('enter from negative direction slides in from left (-x)', () => {
      const enterState = v.enter(-1);
      expect(enterState.x).toBe(-1000);
      expect(enterState.opacity).toBe(0);
    });

    it('exit to negative direction slides out to right (+x)', () => {
      const exitState = v.exit(-1);
      expect(exitState.x).toBe(1000);
      expect(exitState.opacity).toBe(0);
    });

    it('exit to positive direction slides out to left (-x)', () => {
      const exitState = v.exit(1);
      expect(exitState.x).toBe(-1000);
      expect(exitState.opacity).toBe(0);
    });
  });

  describe('with custom x and opacity', () => {
    const v = variants(500, 0.5);

    it('uses custom x value', () => {
      expect(v.enter(1).x).toBe(500);
      expect(v.enter(-1).x).toBe(-500);
    });

    it('uses custom opacity value', () => {
      expect(v.enter(1).opacity).toBe(0.5);
      expect(v.exit(1).opacity).toBe(0.5);
    });
  });
});
