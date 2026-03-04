import { jest } from '@jest/globals'
import { envs } from '../../../src/config/plugins/envs.plugin';

describe('envs.plugins.ts', () => {
  test('should return env options', () => {

    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'tobiasvega1210@gmail.com',
      MAILER_SECRET_KEY: 'rrzqszfenvozyeye',
      MAILER_SERVICE: 'gmail',
      PROD: false,
      MONGO_URL: 'mongodb://tobias:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'tobias',
      MONGO_PASS: '123456789',
      POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC'
    });
  });

  test('should return error if not found env', async () => {

    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('../../../src/config/plugins/envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});