// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');

// const { getUserById } = require('./js-foundation/04-arrow');

const { getUUID, getAge } = require('./plugins');

const { buildMakePerson } = require('./js-foundation/05-factory');

const makePerson = buildMakePerson({ getUUID, getAge });

const obj = {
  name: 'John',
  birthdate: '2005-10-13',
};

const john = makePerson(obj);

console.log({ john });
