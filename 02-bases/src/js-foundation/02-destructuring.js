

// console.log(process.env);

const { PUBLIC, TMP } = process.env;

// console.log(PUBLIC, TMP);

const characters = ['Flash', 'Superman', 'Batman'];

const [, , batman] = characters;

console.log(batman);