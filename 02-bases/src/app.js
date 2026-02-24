// const { getPokemonById } = require('./js-foundation/06-promises');

const { buildLogger } = require('./plugins');

// getPokemonById(4)
//   .then((name) => console.log(name))
//   .catch((err) => console.log(err))
//   .finally(() => console.log('Finalmente'));

const logger = buildLogger('app.js');

logger.log('Hola mundo');
logger.error('Esto es algo malo');

