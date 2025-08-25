import { MonoalphabeticCipher } from './index.js';

// Test if slash appears in output
const cipher = new MonoalphabeticCipher("MONO_CIPHER_KEY");

// Get cipher table info
const tableInfo = cipher.getTableInfo();
console.log("Sample mappings:", tableInfo.sampleMapping);

// Test various inputs without slash
const testCases = [
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "0123456789",
  "TestProductID123"
];

console.log("\nChecking if slash appears in encrypted output:");
testCases.forEach(test => {
  const encrypted = cipher.encrypt(test);
  const hasSlash = encrypted.includes('/');
  console.log(`Input: "${test}"`);
  console.log(`Output: "${encrypted}"`);
  console.log(`Contains slash: ${hasSlash ? '⚠️ YES' : '✅ NO'}`);
  console.log('---');
});

// Find which character maps to slash
console.log("\nFinding which character encrypts to '/':");
const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/';
for (const char of allChars) {
  const encrypted = cipher.encrypt(char);
  if (encrypted === '/') {
    console.log(`'${char}' → '/'`);
  }
}