'use strict';

const assert = require(`assert`);
const request = require(`supertest`);

const app = require(`../../src/commands/server`).app;

const testData = {
  "name": `Pavel`,
  "title": `Маленькая квартирка рядом с парком`,
  "address": `570, 472`,
  "description": `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
  "price": 30000,
  "type": `flat`,
  "rooms": 1,
  "guests": 1,
  "checkin": `9:00`,
  "checkout": `7:00`,
  "features": `["elevator", "conditioner"]`
};

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

  it(`sends form data`, () => {
    return request(app)
      .post(`/api/offers`)
      .field(testData)
      .attach(`author[avatar]`, `test/fixtures/keks.jpg`)
      .type(`form`)
      .expect(200)
      .expect(`Content-Type`, /json/)
      .then((response) => {
        const offers = response.body;
        assert.equal(offers.name, testData.name);
      })
      .catch((error) => {
        assert.fail(error);
      });
  });

  it(`returns 400 when error in params validation`, () => {
    return request(app)
      .post(`/api/offers`)
      .field(Object.assign({}, testData, {"price": 0}))
      .attach(`author[avatar]`, `test/fixtures/keks.jpg`)
      .type(`form`)
      .expect(400)
      .expect(`Content-Type`, /html/);
  });
});
