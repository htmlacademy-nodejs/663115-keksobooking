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

  it(`send offer as with avatar as multipart/form-data`, () => {
    const title = `hello world`;

    return request(app)
      .post(`/api/offers`)
      .field(`offer[title]`, title)
      .attach(`author[avatar]`, `test/fixtures/keks.jpg`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const offers = response.body;
        assert.equal(offers.offer.title, title);
        assert.equal(offers.author.avatar, `keks.jpg`);
      });
  });
});
