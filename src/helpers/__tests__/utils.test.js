import { generateCombinations, calculateTotalPossibilities } from '../utils';

describe('utils', () => {
  describe('calculateTotalPossibilities', () => {
    it('should calculate correct possibilities for 2 tiles', () => {
      expect(calculateTotalPossibilities(2)).toBe(2);
    });

    it('should calculate correct possibilities for 4 tiles', () => {
      expect(calculateTotalPossibilities(4)).toBe(60);
    });

    it('should calculate correct possibilities for 6 tiles', () => {
      expect(calculateTotalPossibilities(6)).toBe(510);
    });
  });

  describe('generateCombinations', () => {
    it('should generate valid word combinations', () => {
      const tiles = ['in', 'put'];
      const result = generateCombinations(tiles);
      expect(result).toEqual({
        twoTiles: expect.arrayContaining(['input']),
        threeTiles: [],
        fourTiles: []
      });
    });

    it('should handle empty tiles', () => {
      const tiles = [];
      const result = generateCombinations(tiles);
      expect(result).toEqual({
        twoTiles: [],
        threeTiles: [],
        fourTiles: []
      });
    });
  });
});
