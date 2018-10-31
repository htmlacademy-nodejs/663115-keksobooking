'use strict';

const assert = require(`assert`);
const request = require(`supertest`);

const app = require(`../src/commands/server`).app;

describe(`POST /api/offers`, () => {
  it(`send offer as json`, () => {
    const sent = {
      offer: {
        title: `hello world`
      }
    };

    return request(app)
      .post(`/api/offers`)
      .send(sent)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const offers = response.body;
        assert.deepEqual(offers, sent);
      });
  });
});
