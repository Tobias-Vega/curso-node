
console.log(process.argv);

const [tsnode, app, ...args] = process.argv;

console.log(args);