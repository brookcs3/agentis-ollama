import { writeFile } from 'fs/promises';

// Simple utility to write a file: node write-file.js path "content"
const [,, file, content = ''] = process.argv;

if (!file) {
  console.error('Usage: node write-file.js <path> "content"');
  process.exit(1);
}

writeFile(file, content)
  .then(() => console.log(`Wrote ${file}`))
  .catch(err => {
    console.error('Failed to write file:', err);
    process.exit(1);
  });
