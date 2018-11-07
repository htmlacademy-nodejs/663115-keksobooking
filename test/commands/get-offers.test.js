'use strict';

const assert = require(`assert`);
const request = require(`supertest`);

const app = require(`../../src/commands/server`).app;

describe(`GET /api/offers`, () => {
  it(`respond with json`, () => {
    return request(app)
      .get(`/api/offers`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const offers = response.body;
        assert.equal(offers.length, 100);
      });
  });

  it(`returns 404 when not found`, () => {
    return request(app)
      .get(`/not-real-path`)
      .set(`Accept`, `application/json`)
      .expect(404)
      .expect(`Content-Type`, /html/);
  });

  it(`respond with offer in custom date`, () => {
    const date = 1541519164;
    return request(app)
      .get(`/api/offers/${date}`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const offers = response.body;
        assert.equal(offers.date, date);
      });
  });
});
