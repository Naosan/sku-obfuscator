/**
 * monoalphabetic-cipher-js
 * 
 * A lightweight and secure monoalphabetic cipher implementation for SKU encryption
 * with deterministic algorithm-based key generation.
 * 
 * @author Naoki
 * @version 1.0.0
 */

export { MonoalphabeticCipher } from './src/MonoalphabeticCipher.js';

/**
 * Default export for convenience
 * Creates a new cipher instance with default "MONO_CIPHER_KEY"
 */
export default function createCipher(secretKey = "MONO_CIPHER_KEY") {
  return new MonoalphabeticCipher(secretKey);
}

/**
 * Utility functions for common SKU operations
 */
import { MonoalphabeticCipher } from './src/MonoalphabeticCipher.js';

/**
 * Quick encrypt function using default key
 * @param {string} text - Text to encrypt
 * @param {string} secretKey - Optional secret key (default: "MONO_CIPHER_KEY")
 * @returns {string} - Encrypted text
 */
export function encrypt(text, secretKey = "MONO_CIPHER_KEY") {
  const cipher = new MonoalphabeticCipher(secretKey);
  return cipher.encrypt(text);
}

/**
 * Quick decrypt function using default key
 * @param {string} text - Text to decrypt
 * @param {string} secretKey - Optional secret key (default: "MONO_CIPHER_KEY")
 * @returns {string} - Decrypted text
 */
export function decrypt(text, secretKey = "MONO_CIPHER_KEY") {
  const cipher = new MonoalphabeticCipher(secretKey);
  return cipher.decrypt(text);
}

/**
 * Generate SKU with prefix
 * @param {string} productId - Product ID to encrypt
 * @param {string} prefix - SKU prefix (default: "si")
 * @param {string} secretKey - Optional secret key (default: "MONO_CIPHER_KEY")
 * @returns {string} - Generated SKU in format "prefix@encryptedId"
 */
export function generateSKU(productId, prefix = "si", secretKey = "MONO_CIPHER_KEY") {
  const cipher = new MonoalphabeticCipher(secretKey);
  const encrypted = cipher.encrypt(productId);
  return `${prefix}@${encrypted}`;
}

/**
 * Decode SKU to original product ID
 * @param {string} sku - SKU in format "prefix@encryptedId"
 * @param {string} secretKey - Optional secret key (default: "MONO_CIPHER_KEY")
 * @returns {Object} - {prefix, productId, type: 'monoalphabetic'}
 */
export function decodeSKU(sku, secretKey = "MONO_CIPHER_KEY") {
  const [prefix, encrypted] = sku.split('@');
  const cipher = new MonoalphabeticCipher(secretKey);
  const productId = cipher.decrypt(encrypted);
  
  return {
    prefix,
    productId,
    type: 'monoalphabetic'
  };
}