import words from 'an-array-of-english-words';

const dictionary = new Set(words);

/**
 * Calculate factorial of a number
 * @param {number} num 
 * @returns {number}
 */
function factorial(num) {
  if (num < 0) return 0;
  if (num <= 1) return 1;
  return num * factorial(num - 1);
}

/**
 * Calculate total number of possible combinations before dictionary check
 * @param {number} numTiles - Number of tiles selected
 * @returns {number} Total number of possible combinations
 */
export function calculateTotalPossibilities(numTiles) {
  let total = 0;
  for (let size = 2; size <= 4; size++) {
    if (numTiles >= size) {
      const combinations = factorial(numTiles) / (factorial(size) * factorial(numTiles - size));
      const permutationsPerCombination = factorial(size);
      total += Math.round(combinations * permutationsPerCombination);
    }
  }
  return total;
}

/**
 * Check if a word exists in the dictionary
 * @param {string} word - Word to check
 * @returns {boolean} Whether the word exists
 */
function checkWord(word) {
  return dictionary.has(word.toLowerCase());
}

/**
 * Generate all possible combinations of k items from n items
 * @param {Array} array - Array of items to choose from
 * @param {number} k - Number of items to choose
 * @returns {Array} Array of all possible k-combinations
 */
function getCombinations(array, k) {
  if (k === 0) return [[]];
  if (k > array.length) return [];

  const first = array[0];
  const rest = array.slice(1);

  const combsWithFirst = getCombinations(rest, k - 1)
    .map(combo => [first, ...combo]);

  const combsWithoutFirst = getCombinations(rest, k);

  return [...combsWithFirst, ...combsWithoutFirst];
}

/**
 * Generate all possible permutations of an array
 * @param {Array} array - Array to permute
 * @returns {Array} Array of all possible permutations
 */
function getPermutations(array) {
  if (array.length <= 1) return [array];

  const result = [];
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const remaining = [...array.slice(0, i), ...array.slice(i + 1)];
    const perms = getPermutations(remaining).map(perm => [current, ...perm]);
    result.push(...perms);
  }
  return result;
}

/**
 * Generate combinations of specific size and validate words
 * @param {string[]} tiles - Array of tile contents
 * @param {number} size - Size of combinations to generate
 * @returns {string[]} Array of valid word combinations
 */
function generateCombinationsOfSize(tiles, size) {
  if (tiles.length < size) return [];

  const combinations = getCombinations(tiles, size);
  const permutations = combinations.flatMap(combo =>
    getPermutations(combo).map(perm => perm.join(''))
  );

  return [...new Set(permutations)].filter(word => checkWord(word));
}

/**
 * Generate all valid word combinations using 2-4 tiles
 * @param {string[]} tiles - Array of tile contents
 * @returns {Object} Object containing arrays of valid words grouped by tile count
 */
export function generateCombinations(tiles) {
  const result = {
    twoTiles: [],
    threeTiles: [],
    fourTiles: []
  };

  if (tiles.length >= 2) {
    result.twoTiles = generateCombinationsOfSize(tiles, 2);
  }

  if (tiles.length >= 3) {
    result.threeTiles = generateCombinationsOfSize(tiles, 3);
  }

  if (tiles.length >= 4) {
    result.fourTiles = generateCombinationsOfSize(tiles, 4);
  }

  return result;
}
