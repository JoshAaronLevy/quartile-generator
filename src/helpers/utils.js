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
  if (numTiles >= 4) {
    // Calculate combinations of 4 from n tiles, then multiply by permutations of 4
    const combinations = factorial(numTiles) / (factorial(4) * factorial(numTiles - 4));
    const permutationsPerCombination = factorial(4);
    return Math.round(combinations * permutationsPerCombination);
  } else {
    // Just calculate permutations of all tiles
    return factorial(numTiles);
  }
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
  const result = [];

  // Base cases
  if (k === 0) return [[]];
  if (k > array.length) return [];

  // Recursive case
  const first = array[0];
  const rest = array.slice(1);

  // Get combinations that include the first element
  const combsWithFirst = getCombinations(rest, k - 1)
    .map(combo => [first, ...combo]);

  // Get combinations that exclude the first element
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
 * Generate combinations based on selected tiles and validate words
 * @param {string[]} tiles - Array of tile contents
 * @returns {string[]} Array of valid word combinations
 */
export function generateCombinations(tiles) {
  let allPermutations;

  if (tiles.length >= 4) {
    // Get all possible combinations of 4 tiles
    const combinations = getCombinations(tiles, 4);
    // For each combination, get all possible permutations
    allPermutations = combinations.flatMap(combo =>
      getPermutations(combo).map(perm => perm.join(''))
    );
  } else {
    // For less than 4 tiles, get all permutations
    allPermutations = getPermutations(tiles).map(perm => perm.join(''));
  }

  // Remove duplicates
  allPermutations = [...new Set(allPermutations)];

  // Validate words and return immediately
  return allPermutations.filter(word => checkWord(word));
}
