/**
 * Monoalphabetic Cipher Implementation
 * 
 * A deterministic substitution cipher that generates consistent character mappings
 * from a secret key. Designed for SKU encryption with offline decryption capability.
 * 
 * Features:
 * - Algorithm-based key generation (no external files needed)
 * - Deterministic shuffling for consistent results
 * - Support for alphanumeric characters (a-z, A-Z, 0-9)
 * - Chrome extension compatible (offline operation)
 * - Minimal implementation (~20 lines of core logic)
 * 
 * @author Naoki
 * @version 1.0.0
 */
export class MonoalphabeticCipher {
  /**
   * Creates a new MonoalphabeticCipher instance
   * @param {string} secretKey - Secret key for generating cipher table (default: "SKU_AI_KEY")
   */
  constructor(secretKey = "SKU_AI_KEY") {
    this.generateTable(secretKey);
  }
  
  /**
   * Generates encryption and decryption tables from secret key
   * @param {string} key - Secret key for table generation
   * @private
   */
  generateTable(key) {
    // Character set: a-z, A-Z, 0-9 (62 characters total)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    // Generate seed from secret key
    const seed = this.hashKey(key);
    
    // Create deterministic shuffled version
    const shuffled = this.deterministicShuffle(chars, seed);
    
    // Build encryption and decryption lookup tables
    this.encryptTable = {};
    this.decryptTable = {};
    
    for (let i = 0; i < chars.length; i++) {
      this.encryptTable[chars[i]] = shuffled[i];
      this.decryptTable[shuffled[i]] = chars[i];
    }
  }
  
  /**
   * Creates a numeric hash from string key
   * @param {string} key - Input key string
   * @returns {number} - Hash value for seeding
   * @private
   */
  hashKey(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash);
  }
  
  /**
   * Deterministically shuffles string using Fisher-Yates algorithm with seeded RNG
   * @param {string} str - String to shuffle
   * @param {number} seed - Seed for random number generator
   * @returns {string} - Shuffled string
   * @private
   */
  deterministicShuffle(str, seed) {
    const arr = str.split('');
    const rng = this.seededRandom(seed);
    
    // Fisher-Yates shuffle with seeded random
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    return arr.join('');
  }
  
  /**
   * Creates a seeded pseudo-random number generator
   * @param {number} seed - Seed value
   * @returns {function} - Random number generator function
   * @private
   */
  seededRandom(seed) {
    let state = seed;
    return () => {
      // Linear congruential generator
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      return state / 0x7fffffff;
    };
  }
  
  /**
   * Encrypts text using the generated cipher table
   * @param {string} text - Text to encrypt
   * @returns {string} - Encrypted text
   */
  encrypt(text) {
    return text.split('').map(c => this.encryptTable[c] || c).join('');
  }
  
  /**
   * Decrypts text using the generated cipher table
   * @param {string} text - Text to decrypt
   * @returns {string} - Decrypted text
   */
  decrypt(text) {
    return text.split('').map(c => this.decryptTable[c] || c).join('');
  }
  
  /**
   * Tests cipher consistency (encrypt then decrypt should return original)
   * @param {string} testText - Text to test with
   * @returns {boolean} - True if encryption/decryption is consistent
   */
  testConsistency(testText = "Test123abcXYZ") {
    const encrypted = this.encrypt(testText);
    const decrypted = this.decrypt(encrypted);
    return testText === decrypted;
  }
  
  /**
   * Gets cipher table information for debugging
   * @returns {Object} - Cipher table statistics
   */
  getTableInfo() {
    const encryptKeys = Object.keys(this.encryptTable);
    const decryptKeys = Object.keys(this.decryptTable);
    
    return {
      encryptTableSize: encryptKeys.length,
      decryptTableSize: decryptKeys.length,
      isComplete: encryptKeys.length === 62 && decryptKeys.length === 62,
      sampleMapping: {
        'a': this.encryptTable['a'],
        'A': this.encryptTable['A'], 
        '0': this.encryptTable['0']
      }
    };
  }
}