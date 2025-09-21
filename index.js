/**
 * @naosan/sku-obfuscator
 * 
 * A lightweight SKU obfuscation library with deterministic algorithm-based
 * key generation for product ID masking.
 * 
 * @author Naoki
 * @version 1.1.0
 */

export { MonoalphabeticCipher } from './src/MonoalphabeticCipher.js';

/**
 * Default export for convenience
 * Creates a new cipher instance with default process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY"
 */
export default function createCipher(secretKey = process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY") {
  return new MonoalphabeticCipher(secretKey);
}

/**
 * Utility functions for common SKU operations
 */
import { MonoalphabeticCipher } from './src/MonoalphabeticCipher.js';

/**
 * Quick encrypt function using default key
 * @param {string} text - Text to encrypt
 * @param {string} secretKey - Optional secret key (default: process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY")
 * @returns {string} - Encrypted text
 */
export function encrypt(text, secretKey = process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY") {
  const cipher = new MonoalphabeticCipher(secretKey);
  return cipher.encrypt(text);
}

/**
 * Quick decrypt function using default key
 * @param {string} text - Text to decrypt
 * @param {string} secretKey - Optional secret key (default: process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY")
 * @returns {string} - Decrypted text
 */
export function decrypt(text, secretKey = process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY") {
  const cipher = new MonoalphabeticCipher(secretKey);
  return cipher.decrypt(text);
}

/**
 * Generate SKU with prefix
 * @param {string} productId - Product ID to encrypt
 * @param {string} prefix 
 * @param {string} secretKey - Optional secret key (default: process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY")
 * @returns {string} - Generated SKU in format "prefix@encryptedId"
 */
export function generateSKU(productId, prefix = "si", secretKey = process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY") {
  const cipher = new MonoalphabeticCipher(secretKey);
  const encrypted = cipher.encrypt(productId);
  return `${prefix}@${encrypted}`;
}

/**
 * Decode SKU to original product ID
 * @param {string} sku - SKU in format "prefix@encryptedId"
 * @param {string} secretKey - Optional secret key (default: process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY")
 * @returns {Object} - {prefix, productId, type: 'monoalphabetic'}
 */
export function decodeSKU(sku, secretKey = process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY") {
  const [prefix, encrypted] = sku.split('@');
  const cipher = new MonoalphabeticCipher(secretKey);
  const productId = cipher.decrypt(encrypted);
  
  return {
    prefix,
    productId,
    type: 'monoalphabetic'
  };
}
