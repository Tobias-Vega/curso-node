const { getPokemonById } = require('./js-foundation/06-promises');

getPokemonById(4, (pokemon) => {
  console.log({ pokemon });
});
