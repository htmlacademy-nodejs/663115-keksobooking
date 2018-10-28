'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/commands/server`).app;

describe(`GET /api/offers`, () => {
  it(`respond with json`, () => {
    return request(app)
      .get(`/api/offers`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const offers = response.body;
        assert.equal(offers.length, 1);
      })
      .catch((error) => {
        assert.fail(error);
      });
  });

  it(`returns 404 when not found`, () => {
    return request(app)
      .get(`not/a/real/path`)
      .set(`Accept`, `application/json`)
      .expect(404)
      .expect(`Content-Type`, /html/);
  });
});
