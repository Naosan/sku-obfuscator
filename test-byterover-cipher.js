import { Cipher } from '@byterover/cipher';

console.log('Testing @byterover/cipher on Windows...');

try {
  // Create a new cipher instance
  const cipher = new Cipher();
  
  // Test encryption
  const plainText = 'Hello from Windows 11!';
  console.log('Original text:', plainText);
  
  // Encrypt the text
  const encrypted = cipher.encrypt(plainText);
  console.log('Encrypted:', encrypted);
  
  // Decrypt the text
  const decrypted = cipher.decrypt(encrypted);
  console.log('Decrypted:', decrypted);
  
  // Verify it works correctly
  if (plainText === decrypted) {
    console.log('\n✅ Success! @byterover/cipher is working correctly on Windows!');
  } else {
    console.log('\n❌ Error: Decryption did not match original text');
  }
  
  // Show system info
  console.log('\nSystem info:');
  console.log('Platform:', process.platform);
  console.log('Node version:', process.version);
  console.log('Current directory:', process.cwd());
  
} catch (error) {
  console.error('Error:', error.message);
  console.error(error);
}