// const { getAge } = require("../plugins/get-age.plugin");
// const { getUUID } = require("../plugins/get-id.plugin");

const { getUUID, getAge } = require("../plugins");

const obj = {
  name: 'John',
  birthdate: '2005-10-13',
};

const buildPerson = ({ name, birthdate }) => {
  return {
    id: getUUID(),
    name,
    birthdate,
    age: getAge(birthdate),
  };
};


const john = buildPerson(obj);

console.log(john);

