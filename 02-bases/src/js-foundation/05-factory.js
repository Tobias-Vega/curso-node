const getAge = require("get-age");
const { v4: uuidv4 } = require("uuid");

const obj = {
  name: 'John',
  birthdate: '2005-10-13',
};

const buildPerson = ({ name, birthdate }) => {
  return {
    id: uuidv4(),
    name,
    birthdate,
    age: getAge(birthdate),
  };
};


const john = buildPerson(obj);

console.log(john);

