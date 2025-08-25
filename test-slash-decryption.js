import { MonoalphabeticCipher } from './index.js';

console.log("=== Testing decryption with slash in encrypted output ===\n");

const cipher = new MonoalphabeticCipher("MONO_CIPHER_KEY");

// Test cases that produce slash in output
const testCases = [
  "TestProductID123",   // Contains '1' which maps to '/'
  "Product1",
  "SKU1234",
  "Item111",
  "a1b2c3"
];

console.log("Testing round-trip encryption/decryption:");
testCases.forEach((original, index) => {
  const encrypted = cipher.encrypt(original);
  const decrypted = cipher.decrypt(encrypted);
  const hasSlash = encrypted.includes('/');
  const success = original === decrypted;
  
  console.log(`Test ${index + 1}:`);
  console.log(`  Original:  "${original}"`);
  console.log(`  Encrypted: "${encrypted}" ${hasSlash ? '(contains /)' : ''}`);
  console.log(`  Decrypted: "${decrypted}"`);
  console.log(`  Success:   ${success ? '✅' : '❌'}`);
  console.log();
});

// Test what happens when we decrypt a string that contains slash
console.log("=== Testing decryption of strings containing slash ===");

const slashStrings = [
  "abc/def",
  "path/to/file", 
  "a/b/c",
  "/start/middle/end/"
];

slashStrings.forEach((original, index) => {
  const encrypted = cipher.encrypt(original);
  const decrypted = cipher.decrypt(encrypted);
  const success = original === decrypted;
  
  console.log(`Test ${index + 1}:`);
  console.log(`  Original:  "${original}"`);
  console.log(`  Encrypted: "${encrypted}"`);
  console.log(`  Decrypted: "${decrypted}"`);
  console.log(`  Success:   ${success ? '✅' : '❌'}`);
  console.log();
});

console.log("=== Verification: Cipher tables are bijective ===");
const tableInfo = cipher.getTableInfo();
console.log(`Encrypt table size: ${tableInfo.encryptTableSize}`);
console.log(`Decrypt table size: ${tableInfo.decryptTableSize}`);
console.log(`Tables complete: ${tableInfo.isComplete}`);

// Verify bijection
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/';
let bijectionTest = true;
for (const char of chars) {
  const encrypted = cipher.encrypt(char);
  const decrypted = cipher.decrypt(encrypted);
  if (char !== decrypted) {
    console.log(`❌ Bijection failed: ${char} → ${encrypted} → ${decrypted}`);
    bijectionTest = false;
  }
}
console.log(`Bijection test: ${bijectionTest ? '✅ PASS' : '❌ FAIL'}`);