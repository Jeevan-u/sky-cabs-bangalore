// Tests for fleet data shape (data layer)
import { SKY_CABS_FLEET } from '../data/skyCabsFleet';

describe('SKY_CABS_FLEET data', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(SKY_CABS_FLEET)).toBe(true);
    expect(SKY_CABS_FLEET.length).toBeGreaterThan(0);
  });

  it('every vehicle has required fields', () => {
    SKY_CABS_FLEET.forEach((vehicle) => {
      expect(vehicle).toHaveProperty('id');
      expect(vehicle).toHaveProperty('name');
      expect(vehicle).toHaveProperty('category');
      expect(vehicle).toHaveProperty('capacity');
      expect(vehicle).toHaveProperty('perKmRate');
      expect(vehicle).toHaveProperty('airportFlatRate');
      expect(vehicle).toHaveProperty('local8hr80km');
      expect(vehicle).toHaveProperty('features');
      expect(vehicle).toHaveProperty('ac');
    });
  });

  it('every vehicle id is a non-empty string', () => {
    SKY_CABS_FLEET.forEach((v) => {
      expect(typeof v.id).toBe('string');
      expect(v.id.length).toBeGreaterThan(0);
    });
  });

  it('all perKmRate values are positive numbers', () => {
    SKY_CABS_FLEET.forEach((v) => {
      expect(typeof v.perKmRate).toBe('number');
      expect(v.perKmRate).toBeGreaterThan(0);
    });
  });

  it('all airportFlatRate values are positive numbers', () => {
    SKY_CABS_FLEET.forEach((v) => {
      expect(v.airportFlatRate).toBeGreaterThan(0);
    });
  });

  it('every vehicle features array is non-empty', () => {
    SKY_CABS_FLEET.forEach((v) => {
      expect(Array.isArray(v.features)).toBe(true);
      expect(v.features.length).toBeGreaterThan(0);
    });
  });

  it('vehicle IDs are unique', () => {
    const ids = SKY_CABS_FLEET.map((v) => v.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all ac fields are boolean', () => {
    SKY_CABS_FLEET.forEach((v) => {
      expect(typeof v.ac).toBe('boolean');
    });
  });

  it('contains expected vehicle categories', () => {
    const categories = SKY_CABS_FLEET.map((v) => v.category);
    const validCategories = ['Sedan', 'SUV', 'Premium SUV', 'Tempo Traveller', 'Luxury Coach'];
    categories.forEach((cat) => {
      expect(validCategories).toContain(cat);
    });
  });
});
