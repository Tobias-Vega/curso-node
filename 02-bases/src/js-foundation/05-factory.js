// const { getAge } = require("../plugins/get-age.plugin");
// const { getUUID } = require("../plugins/get-id.plugin");

const { getUUID, getAge } = require('../plugins');

const buildMakePerson = ({ getUUID, getAge }) => {
  return ({ name, birthdate }) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };
};

// const obj = {
//   name: 'John',
//   birthdate: '2005-10-13',
// };
// const john = buildPerson(obj);

// console.log(john);

module.exports = {
  buildMakePerson,
};
