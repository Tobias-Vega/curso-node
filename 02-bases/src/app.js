const { getPokemonById } = require('./js-foundation/06-promises');

getPokemonById(4)
  .then((name) => console.log(name))
  .catch((err) => console.log(err))
  .finally(() => console.log('Finalmente'));
