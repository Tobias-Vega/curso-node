import { getUserById } from '../../src/js-foundation/04-arrow';

describe('js-foundation/04-arrow.ts', () => {

  test('getUserById should return Jane Doe', (done) => {

    const id = 2;
    const janeDoe = {
      id: 2,
      name: 'Jane Doe'
    }

    getUserById(id, (err, user) => {
      expect(err).toBeUndefined();
      expect(user).toEqual(janeDoe);
      done()
    });
  });

  test('getUserById should return an error', (done) => {

    const id = 10;

    getUserById(id, (err, user) => {

      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();

      done();
    });
  });
});