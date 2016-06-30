import supertest from 'supertest';

import server from '../server';

const request = supertest.agent(server.listen());

describe('Hello World', function () {
  it('should say \'Hello World\'', function (done) {
    request
      .get('/')
      .expect(200)
      .expect('Hello World', done);
  });
});