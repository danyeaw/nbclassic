const fs = require('fs');
const path = require('path');

const sourceFile = path.join('nbclassic', 'static', 'components', 'marked', 'lib', 'marked.umd.js');
const destFile = path.join('nbclassic', 'static', 'components', 'marked', 'lib', 'marked.js');

// Ensure source file exists
if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`);
    process.exit(1);
}

// Copy the file
try {
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Successfully copied ${sourceFile} to ${destFile}`);
} catch (err) {
    console.error(`Error copying file: ${err.message}`);
    process.exit(1);
}
