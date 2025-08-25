# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the @naosan/sku-obfuscator repository.

## Common Commands

### Testing
```bash
# Run all tests
npm test

# Run specific test file
node test/cipher.test.js
```

### Running the Module
```bash
# Run the main entry point
npm start
# or
node index.js
```

## Architecture Overview

This is a SKU obfuscation library designed for product ID masking. The core architecture consists of:

1. **MonoalphabeticCipher Class** (`src/MonoalphabeticCipher.js`): The main obfuscator implementation that generates deterministic character mappings using a secret key. It uses Fisher-Yates shuffling with a seeded random number generator to ensure consistent results across instances.

2. **Entry Point** (`index.js`): Exports the main class and provides utility functions for common operations like `encrypt()`, `decrypt()`, `generateSKU()`, and `decodeSKU()`.

3. **Secret Key Configuration**: The library supports three ways to specify the secret key:
   - Explicitly passed as parameter
   - Environment variable `MONO_CIPHER_KEY`
   - Default fallback: `"MONO_CIPHER_KEY"`

## Key Implementation Details

- **Character Set**: Supports a-z, A-Z, 0-9, and / (63 characters total)
- **Deterministic**: Same secret key always produces the same cipher mapping
- **1:1 Mapping**: No character expansion, preserves string length
- **Special Characters**: Non-alphanumeric characters (except /) pass through unchanged

## Testing Approach

The test suite (`test/cipher.test.js`) covers:
- Basic encryption/decryption
- Consistency across instances
- Different secret keys producing different results
- Edge cases (empty strings, special characters)
- SKU generation and decoding
- Performance benchmarks
- Chrome extension usage simulation
- Environment variable support

## Environment Variables

- `MONO_CIPHER_KEY`: Default secret key for cipher operations

## Use Cases

This library is specifically designed for:
- E-commerce SKU obfuscation to prevent search engine detection
- Chrome extension offline processing
- Multi-application token sharing with consistent obfuscation