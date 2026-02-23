const { getPokemonById } = require('./js-foundation/06-promises');

getPokemonById(4)
  .then((name) => console.log(name))
  .catch((error) => console.log('Por favor intente de nuevo'))
  .finally(() => console.log('Finalmente'));
