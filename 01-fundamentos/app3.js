const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

const wordCount = content.split(' ').length;
console.log(wordCount);

const reactWordCount = content.match(/React/ig ?? []).length;

console.log('Palabras: ', wordCount);
console.log('Palabras React: ', reactWordCount); // case sensitive
