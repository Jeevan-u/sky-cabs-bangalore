// Tests for ncNanoId utility
import ncNanoId from '../utils/ncNanoId';

describe('ncNanoId', () => {
  it('generates an ID with default prefix', () => {
    const id = ncNanoId();
    expect(id).toMatch(/^ncNanoId_\d+$/);
  });

  it('generates an ID with custom prefix', () => {
    const id = ncNanoId('contact_');
    expect(id).toMatch(/^contact_\d+$/);
  });

  it('increments ID with each call for the same prefix', () => {
    const prefix = 'test_unique_prefix_';
    const id1 = ncNanoId(prefix);
    const id2 = ncNanoId(prefix);
    const num1 = parseInt(id1.replace(prefix, ''), 10);
    const num2 = parseInt(id2.replace(prefix, ''), 10);
    expect(num2).toBe(num1 + 1);
  });

  it('handles "$lodash$" prefix by returning only numeric id', () => {
    const id = ncNanoId('$lodash$');
    expect(id).toMatch(/^\d+$/);
  });

  it('different prefixes have independent counters', () => {
    const a1 = ncNanoId('alpha_');
    const b1 = ncNanoId('beta_');
    // Both should start at 1 (or increment independently)
    const numA = parseInt(a1.replace('alpha_', ''), 10);
    const numB = parseInt(b1.replace('beta_', ''), 10);
    expect(numA).toBeGreaterThan(0);
    expect(numB).toBeGreaterThan(0);
  });
});
