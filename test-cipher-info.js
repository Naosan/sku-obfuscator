// Test to verify @byterover/cipher installation on Windows
import { readFileSync } from 'fs';
import { join } from 'path';

console.log('Verifying @byterover/cipher installation on Windows 11...\n');

// Check if the package is installed
try {
  const packageJsonPath = join(process.cwd(), 'node_modules', '@byterover', 'cipher', 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  console.log('✅ Package installed successfully!');
  console.log('Package name:', packageJson.name);
  console.log('Version:', packageJson.version);
  console.log('Description:', packageJson.description);
  console.log('\nRequired Node version:', packageJson.engines.node);
  console.log('Current Node version:', process.version);
  
  // Check if current Node version meets requirements
  const currentVersion = process.version.slice(1); // Remove 'v' prefix
  const requiredVersion = '20.0.0';
  
  if (compareVersions(currentVersion, requiredVersion) >= 0) {
    console.log('✅ Node version requirement met!');
  } else {
    console.log('❌ Node version requirement not met!');
  }
  
  // Show Windows system info
  console.log('\nWindows System Info:');
  console.log('Platform:', process.platform);
  console.log('Architecture:', process.arch);
  console.log('Current directory:', process.cwd());
  console.log('OS type:', process.env.OS);
  
  console.log('\n✅ @byterover/cipher is successfully installed on Windows!');
  console.log('\nNote: This is an AI agent framework for coding assistance,');
  console.log('not a cryptographic cipher library.');
  
} catch (error) {
  console.error('❌ Error checking package:', error.message);
}

function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  
  return 0;
}