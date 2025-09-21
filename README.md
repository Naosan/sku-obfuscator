# @naosan/sku-obfuscator

A lightweight SKU obfuscation library with deterministic algorithm-based key generation for product ID masking.

> ⚠️ **BREAKING CHANGE (v1.1.0+)**: The random number generator was updated to fix a potential out-of-bounds issue. This means encrypted data from versions before this update cannot be decrypted with the new version. Please ensure all systems are updated simultaneously.

## 🎯 Overview

This package provides a simple yet effective monoalphabetic substitution system designed specifically for SKU (Stock Keeping Unit) obfuscation. It generates consistent character mappings from a secret key, making it perfect for scenarios where you need to:

- Prevent Google search detection of original product IDs
- **Hide original URL structure** - Obfuscated output may contain any character
- Enable offline decryption (Chrome extensions, etc.)
- Maintain consistent encryption across multiple applications
- Keep implementation minimal and maintainable

## ✨ Features

- **🔐 Algorithm-based key generation** - No external files needed
- **🎯 Deterministic results** - Same key always produces same mapping
- **📱 Chrome extension compatible** - Offline operation support  
- **⚡ Minimal implementation** - Core logic in ~20 lines
- **🔤 Full character support** - a-z, A-Z, 0-9, / (63 characters)
- **🛡️ Fisher-Yates shuffling** - Deterministic character mixing
- **📦 ES Module ready** - Modern JavaScript import/export

## 🚀 Installation

```bash
# Install from GitHub (private repository)
npm install git+https://github.com/Naosan/sku-obfuscator.git

# Or using yarn
yarn add git+https://github.com/Naosan/sku-obfuscator.git
```

## ⚙️ Configuration

### Environment Variable

You can set the default cipher key using the `MONO_CIPHER_KEY` environment variable:

```bash
# Windows
set MONO_CIPHER_KEY=your-custom-secret-key

# Linux/macOS
export MONO_CIPHER_KEY=your-custom-secret-key

# Node.js application
process.env.MONO_CIPHER_KEY = "your-custom-secret-key";
```

**Priority order:**
1. Explicitly passed `secretKey` parameter
2. `process.env.MONO_CIPHER_KEY` environment variable
3. Default fallback: `"MONO_CIPHER_KEY"`

## 📖 Quick Start

### Basic Usage

```javascript
import { MonoalphabeticCipher } from '@naosan/sku-obfuscator';

// Create cipher with default key (process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY")
const cipher = new MonoalphabeticCipher();

// Encrypt product ID
const productId = "S5smas8TFSWpJUso6Ro3vK";
const encrypted = cipher.encrypt(productId);
console.log(encrypted); // → "kUnXKnHqfkmAv9nAUjAusg"

// Decrypt back to original
const decrypted = cipher.decrypt(encrypted);
console.log(decrypted); // → "S5smas8TFSWpJUso6Ro3vK"
```

## 🔧 API Reference

### MonoalphabeticCipher Class

#### Constructor
```javascript
new MonoalphabeticCipher(secretKey = process.env.MONO_CIPHER_KEY || "MONO_CIPHER_KEY")
```

#### Methods
- `encrypt(text)` - Encrypt text using cipher table
- `decrypt(text)` - Decrypt text using cipher table  
- `testConsistency(testText)` - Test encrypt/decrypt consistency
- `getTableInfo()` - Get cipher table statistics for debugging

### Utility Functions

- `encrypt(text, secretKey)` - Quick encrypt with optional key
- `decrypt(text, secretKey)` - Quick decrypt with optional key
- `generateSKU(productId, prefix, secretKey)` - Generate formatted SKU
- `decodeSKU(sku, secretKey)` - Decode SKU to components
- `createCipher(secretKey)` - Default export factory function


## 🤝 Contributing

This is a private repository. For issues or feature requests, please contact the maintainer directly.

## 📄 License

MIT License - see LICENSE file for details.

