const obj = {
  name: 'John',
  birthdate: '2005-10-13',
};

const buildPerson = ({ name, birthdate }) => {
  return {
    id: new Date().getTime(),
    name,
    birthdate,
    age: new Date().getFullYear() - new Date(birthdate).getFullYear(),
  };
};


const john = buildPerson(obj);
