import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

test('Integration test users', async (t) => {
  const testPort = 9009;

  process.env.PORT = testPort;
  const { server } = await import('../../src/index.js');

  const testeUrlServer = `http://localhost:${testPort}/users`;

  await t.test('Should create a user', async(t) => {
    const data = {
        "name": "Jessica Campos",
        "email": "jessica.campos@gmail.com",
        "phone": "11955555555"    
    };

    const request = await fetch(testeUrlServer, {
        method: 'POST',
        body: JSON.stringify(data)
    });

    /** TESTS */
    assert.deepStrictEqual(request.headers.get('content-type'), 'application/json', 'It Should return a json content');
    assert.strictEqual(request.status, 201, 'It should return a status 201');

  });

  // await promisify(server.close.bind(server))();
});