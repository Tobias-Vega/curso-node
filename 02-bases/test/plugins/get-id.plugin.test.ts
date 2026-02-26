import { getUUID } from '../../src/plugins/get-id.plugin';


describe('js-foundation/get-id.plugin.ts', () => {

  test('getUUID should return a UUID', () => {
    const uuid = getUUID();

    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBe(36);
  });
});