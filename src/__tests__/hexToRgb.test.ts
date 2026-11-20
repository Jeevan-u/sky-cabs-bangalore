// Tests for hexToRGB utility
import hexToRGB from '../utils/hexToRgb';

describe('hexToRGB', () => {
  it('converts 6-digit hex to rgb', () => {
    expect(hexToRGB('#ffffff')).toBe('rgb(255,255,255)');
  });

  it('converts black 6-digit hex', () => {
    expect(hexToRGB('#000000')).toBe('rgb(0,0,0)');
  });

  it('converts a standard color hex', () => {
    // #ff4c4c => r=255, g=76, b=76
    expect(hexToRGB('#ff4c4c')).toBe('rgb(255,76,76)');
  });

  it('converts 3-digit hex to rgb (shorthand)', () => {
    // #fff => r=ff, g=ff, b=ff => 255,255,255
    expect(hexToRGB('#fff')).toBe('rgb(255,255,255)');
  });

  it('converts 3-digit hex #036 -> rgb(0,51,102)', () => {
    // #036 => r=00, g=33, b=66 => 0,51,102
    expect(hexToRGB('#036')).toBe('rgb(0,51,102)');
  });
});
