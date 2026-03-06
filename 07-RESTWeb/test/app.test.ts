import { jest } from '@jest/globals';
import { envs } from '../src/config/envs.js';

const mockStart = jest.fn();
const mockServerConstructor = jest.fn().mockImplementation(() => ({
  start: mockStart
}));

jest.unstable_mockModule('../src/presentation/server.js', () => ({
  Server: mockServerConstructor
}));

describe('Testing App.ts', () => {

  test('should create server instance', async () => {

    await import('../src/app.js');

    expect(mockServerConstructor).toHaveBeenCalledTimes(1);
    expect(mockServerConstructor).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function)
    });

    expect(mockStart).toHaveBeenCalledWith();
  });
});