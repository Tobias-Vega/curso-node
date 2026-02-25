import { getPokemonNameById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises.ts', () => {

  test('getPokemonNamebyId should return a pokemon', async () => {
    const pokemonId = 1;

    const pokemonName = await getPokemonNameById(pokemonId);

    expect(pokemonName).toBe('bulbasaur');

  });

  test('should return an error if pokemon does not exists', async () => {

    const pokemonId = 100000000;

    try {
      await getPokemonNameById(pokemonId);
      expect(true).toBeFalsy()

    } catch (error) {
      expect(error).toBe(`Pokemon not found with id ${pokemonId}`)
    }
  });
});