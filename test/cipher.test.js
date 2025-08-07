/**
 * Test Suite for MonoalphabeticCipher
 * 
 * Comprehensive tests for encryption, decryption, and utility functions
 */

import { MonoalphabeticCipher, encrypt, decrypt, generateSKU, decodeSKU } from '../index.js';

// Test utilities
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Test failed: ${message}`);
  }
  console.log(`✅ PASS: ${message}`);
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`Test failed: ${message}\n  Expected: ${expected}\n  Actual: ${actual}`);
  }
  console.log(`✅ PASS: ${message}`);
}

// Test runner
async function runTests() {
  console.log('🧪 Starting Monoalphabetic Cipher Tests...\n');
  
  try {
    // Basic functionality tests
    testBasicEncryptionDecryption();
    testConsistency();
    testDifferentKeys();
    testEdgeCases();
    
    // Utility function tests
    testUtilityFunctions();
    testSKUGeneration();
    
    // Performance tests
    testPerformance();
    
    // Chrome extension simulation
    testChromeExtensionUsage();
    
    // Environment variable support
    testEnvironmentVariable();
    
    console.log('\n🎉 All tests passed successfully!');
    
  } catch (error) {
    console.error(`\n❌ Test failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Test basic encryption and decryption functionality
 */
function testBasicEncryptionDecryption() {
  console.log('📋 Testing basic encryption/decryption...');
  
  const cipher = new MonoalphabeticCipher();
  
  // Test simple alphanumeric string
  const original = "Hello123World";
  const encrypted = cipher.encrypt(original);
  const decrypted = cipher.decrypt(encrypted);
  
  assert(encrypted !== original, "Encryption should change the text");
  assertEquals(decrypted, original, "Decryption should restore original text");
  assertEquals(encrypted.length, original.length, "Encrypted text should have same length");
}

/**
 * Test consistency across multiple instances
 */
function testConsistency() {
  console.log('📋 Testing consistency across instances...');
  
  const cipher1 = new MonoalphabeticCipher("TEST_KEY");
  const cipher2 = new MonoalphabeticCipher("TEST_KEY");
  
  const testText = "ConsistencyTest123";
  const encrypted1 = cipher1.encrypt(testText);
  const encrypted2 = cipher2.encrypt(testText);
  
  assertEquals(encrypted1, encrypted2, "Same key should produce same encryption");
  
  // Test built-in consistency check
  assert(cipher1.testConsistency(), "Built-in consistency test should pass");
}

/**
 * Test different secret keys produce different results
 */
function testDifferentKeys() {
  console.log('📋 Testing different keys produce different results...');
  
  const cipher1 = new MonoalphabeticCipher("KEY_ONE");
  const cipher2 = new MonoalphabeticCipher("KEY_TWO");
  
  const testText = "DifferentKeysTest";
  const encrypted1 = cipher1.encrypt(testText);
  const encrypted2 = cipher2.encrypt(testText);
  
  assert(encrypted1 !== encrypted2, "Different keys should produce different encryptions");
}

/**
 * Test edge cases and special characters
 */
function testEdgeCases() {
  console.log('📋 Testing edge cases...');
  
  const cipher = new MonoalphabeticCipher();
  
  // Empty string
  assertEquals(cipher.encrypt(""), "", "Empty string should remain empty");
  assertEquals(cipher.decrypt(""), "", "Empty string decryption should remain empty");
  
  // Single character
  const singleChar = "a";
  const encryptedSingle = cipher.encrypt(singleChar);
  const decryptedSingle = cipher.decrypt(encryptedSingle);
  assertEquals(decryptedSingle, singleChar, "Single character should encrypt/decrypt correctly");
  
  // Special characters (should remain unchanged)
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  assertEquals(cipher.encrypt(specialChars), specialChars, "Special characters should remain unchanged");
  
  // Mixed alphanumeric with special characters
  const mixed = "Test123!@#";
  const mixedEncrypted = cipher.encrypt(mixed);
  const mixedDecrypted = cipher.decrypt(mixedEncrypted);
  assertEquals(mixedDecrypted, mixed, "Mixed content should encrypt/decrypt correctly");
}

/**
 * Test utility functions
 */
function testUtilityFunctions() {
  console.log('📋 Testing utility functions...');
  
  const testText = "UtilityTest456";
  
  // Test quick encrypt/decrypt functions
  const quickEncrypted = encrypt(testText);
  const quickDecrypted = decrypt(quickEncrypted);
  assertEquals(quickDecrypted, testText, "Quick encrypt/decrypt should work correctly");
  
  // Test with custom key
  const customEncrypted = encrypt(testText, "CUSTOM_KEY");
  const customDecrypted = decrypt(customEncrypted, "CUSTOM_KEY");
  assertEquals(customDecrypted, testText, "Custom key encrypt/decrypt should work correctly");
}

/**
 * Test SKU generation and decoding
 */
function testSKUGeneration() {
  console.log('📋 Testing SKU generation and decoding...');
  
  const productId = "S5smas8TFSWpJUso6Ro3vK";
  const prefix = "si";
  
  // Generate SKU
  const sku = generateSKU(productId, prefix);
  assert(sku.startsWith(`${prefix}@`), "SKU should start with correct prefix");
  
  // Decode SKU
  const decoded = decodeSKU(sku);
  assertEquals(decoded.prefix, prefix, "Decoded prefix should match");
  assertEquals(decoded.productId, productId, "Decoded product ID should match original");
  assertEquals(decoded.type, "monoalphabetic", "Decoded type should be 'monoalphabetic'");
  
  // Test different prefixes
  const skuYs = generateSKU(productId, "ys");
  const decodedYs = decodeSKU(skuYs);
  assertEquals(decodedYs.prefix, "ys", "Different prefix should work correctly");
  assertEquals(decodedYs.productId, productId, "Product ID should remain consistent");
}

/**
 * Test performance characteristics
 */
function testPerformance() {
  console.log('📋 Testing performance...');
  
  const cipher = new MonoalphabeticCipher();
  const testText = "PerformanceTest123456789";
  const iterations = 1000;
  
  // Test encryption performance
  const encryptStart = Date.now();
  for (let i = 0; i < iterations; i++) {
    cipher.encrypt(testText);
  }
  const encryptTime = Date.now() - encryptStart;
  
  // Test decryption performance
  const encrypted = cipher.encrypt(testText);
  const decryptStart = Date.now();
  for (let i = 0; i < iterations; i++) {
    cipher.decrypt(encrypted);
  }
  const decryptTime = Date.now() - decryptStart;
  
  console.log(`  Encryption: ${iterations} ops in ${encryptTime}ms (${(encryptTime/iterations).toFixed(3)}ms per op)`);
  console.log(`  Decryption: ${iterations} ops in ${decryptTime}ms (${(decryptTime/iterations).toFixed(3)}ms per op)`);
  
  assert(encryptTime < 1000, "Encryption should be fast (< 1000ms for 1000 operations)");
  assert(decryptTime < 1000, "Decryption should be fast (< 1000ms for 1000 operations)");
}

/**
 * Simulate Chrome extension usage
 */
function testChromeExtensionUsage() {
  console.log('📋 Testing Chrome extension simulation...');
  
  // Simulate Chrome extension SKU to URL conversion
  function simulateChromeExtensionDecode(sku) {
    const cipher = new MonoalphabeticCipher("MONO_CIPHER_KEY");
    const [prefix, encrypted] = sku.split('@');
    const productId = cipher.decrypt(encrypted);
    
    const siteMap = {
      'si': 'https://jp.mercari.com/item/m',
      'ys': 'https://store.shopping.yahoo.co.jp/',
      'ms': 'https://jp.mercari.com/shops/product/'
    };
    
    return {
      url: siteMap[prefix] + productId,
      prefix,
      productId
    };
  }
  
  // Test various SKU formats
  const testCases = [
    { productId: "m12345678", prefix: "si", expectedUrl: "https://jp.mercari.com/item/mm12345678" },
    { productId: "shopname/item123", prefix: "ys", expectedUrl: "https://store.shopping.yahoo.co.jp/shopname/item123" },
    { productId: "ABC123def456", prefix: "ms", expectedUrl: "https://jp.mercari.com/shops/product/ABC123def456" }
  ];
  
  testCases.forEach((testCase, index) => {
    const sku = generateSKU(testCase.productId, testCase.prefix);
    const result = simulateChromeExtensionDecode(sku);
    
    assertEquals(result.url, testCase.expectedUrl, `Chrome extension test case ${index + 1}: URL should match`);
    assertEquals(result.productId, testCase.productId, `Chrome extension test case ${index + 1}: Product ID should match`);
    assertEquals(result.prefix, testCase.prefix, `Chrome extension test case ${index + 1}: Prefix should match`);
  });
}

/**
 * Test real-world SKU examples from the documentation
 */
function testRealWorldExamples() {
  console.log('📋 Testing real-world examples...');
  
  const cipher = new MonoalphabeticCipher("MONO_CIPHER_KEY");
  
  // Test cases from documentation
  const realWorldCases = [
    "S5smas8TFSWpJUso6Ro3vK", // Mercari Shops
    "growdetradingltd/falr61105b147", // Yahoo Shopping
    "m20326850727", // Mercari
    "ABC123def456GHI789" // Mixed case
  ];
  
  realWorldCases.forEach((productId, index) => {
    const encrypted = cipher.encrypt(productId);
    const decrypted = cipher.decrypt(encrypted);
    
    assertEquals(decrypted, productId, `Real-world case ${index + 1}: Should encrypt and decrypt correctly`);
    assert(encrypted !== productId, `Real-world case ${index + 1}: Should actually encrypt the text`);
    assertEquals(encrypted.length, productId.length, `Real-world case ${index + 1}: Length should be preserved`);
  });
}

/**
 * Test environment variable support
 */
function testEnvironmentVariable() {
  console.log('📋 Testing environment variable support...');
  
  // Save original environment variable
  const originalEnvVar = process.env.MONO_CIPHER_KEY;
  
  try {
    // Test with environment variable set
    process.env.MONO_CIPHER_KEY = "TEST_ENV_KEY";
    
    const envCipher = new MonoalphabeticCipher();
    const testText = "EnvVarTest123";
    const envEncrypted = envCipher.encrypt(testText);
    const envDecrypted = envCipher.decrypt(envEncrypted);
    
    assertEquals(envDecrypted, testText, "Environment variable cipher should work correctly");
    
    // Test that different environment variable produces different result
    const defaultCipher = new MonoalphabeticCipher("MONO_CIPHER_KEY");
    const defaultEncrypted = defaultCipher.encrypt(testText);
    
    assert(envEncrypted !== defaultEncrypted, "Environment variable should produce different encryption");
    
    // Test explicit parameter overrides environment variable
    const explicitCipher = new MonoalphabeticCipher("EXPLICIT_KEY");
    const explicitEncrypted = explicitCipher.encrypt(testText);
    
    assert(explicitEncrypted !== envEncrypted, "Explicit parameter should override environment variable");
    
    // Test utility functions with environment variable
    const utilityEncrypted = encrypt(testText); // Should use process.env.MONO_CIPHER_KEY
    const utilityDecrypted = decrypt(utilityEncrypted);
    
    assertEquals(utilityDecrypted, testText, "Utility functions should use environment variable");
    assertEquals(utilityEncrypted, envEncrypted, "Utility functions should match cipher instance with env var");
    
    // Test SKU generation with environment variable
    const envSKU = generateSKU(testText, "env");
    const decodedEnvSKU = decodeSKU(envSKU);
    
    assertEquals(decodedEnvSKU.productId, testText, "SKU generation should use environment variable");
    assertEquals(decodedEnvSKU.prefix, "env", "SKU prefix should be preserved");
    
  } finally {
    // Restore original environment variable
    if (originalEnvVar !== undefined) {
      process.env.MONO_CIPHER_KEY = originalEnvVar;
    } else {
      delete process.env.MONO_CIPHER_KEY;
    }
  }
}

// Run all tests
runTests().catch(console.error);