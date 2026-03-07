import request from 'supertest';
import { testServer } from '../test-server';

describe('Todo route testing', () => {

  beforeAll(async () => {
    await testServer.start();
  })

  test('should return TODOs api/todos', async () => {

    await request(testServer.app)
      .get('/api/todos')
      .expect(200);
  });
});