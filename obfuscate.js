const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Read the source file
const sourceCode = fs.readFileSync('script.js', 'utf8');

// Obfuscate the code
const obfuscatedCode = JavaScriptObfuscator.obfuscate(sourceCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 1000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}).getObfuscatedCode();

// Write the obfuscated code to a new file
fs.writeFileSync('script.obfuscated.js', obfuscatedCode); 