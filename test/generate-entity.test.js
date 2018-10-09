'use strict';

const chai = require(`chai`);

const {generateEntity, Param} = require(`../src/generate-entity.js`);

const expect = chai.expect;

const entity = generateEntity();

describe(`Entity`, () => {
  it(`should generate an object`, () => {
    expect(entity).to.be.a(`object`);
  });

  it(`should generate a url for avatar`, () => {
    expect(entity.author.avatar).to.match(/^https:\/\/robohash.org\/[a-z0-9]+$/);
  });

  it(`should generate a valid string for title`, () => {
    expect(entity.offer.title).to.be.a(`string`);
  });

  it(`should generate address in correct format`, () => {
    expect(entity.offer.address).to.have.string(`,`);
  });

  it(`should generate price in valid range`, () => {
    expect(entity.offer.price).to.be.within(Param.PRICE_MIN, Param.PRICE_MAX);
  });

  it(`should generate type`, () => {
    expect(Param.TYPE).to.include(entity.offer.type);
  });

  it(`should generate rooms in valid range`, () => {
    expect(entity.offer.rooms).to.be.within(Param.ROOMS_MIN, Param.ROOMS_MAX);
  });

  it(`should generate number of guests`, () => {
    expect(entity.offer.guests).to.be.a(`number`);
  });

  it(`should generate checkin in correct format`, () => {
    expect(Param.CHECKIN).to.include(entity.offer.checkin);
  });

  it(`should generate checkout in correct format`, () => {
    expect(Param.CHECKOUT).to.include(entity.offer.checkout);
  });

  it(`should generate features from correct values`, () => {
    entity.offer.features.forEach((feature) => {
      expect(Param.FEATURES).to.include(feature);
    });
  });

  it(`should generate description as empty string`, () => {
    expect(entity.offer.description).to.equal(``);
  });

  it(`should generate photos as array of strings`, () => {
    Param.PHOTOS.forEach((photo)=>{
      expect(entity.offer.photos).to.be.an(`array`).that.includes(photo);
    });
    expect(entity.offer.photos.length).to.be.eq(Param.PHOTOS.length);
  });

  it(`should generate location x in valid range`, () => {
    expect(entity.location.x).to.be.within(Param.X_MIN, Param.X_MAX);
  });

  it(`should generate location y in valid range`, () => {
    expect(entity.location.y).to.be.within(Param.Y_MIN, Param.Y_MAX);
  });

  it(`should generate date in valid range`, () => {
    const timeNow = ~~new Date();
    const timeMin = new Date() - Param.TIME_MIN_OFFSET;
    expect(entity.date * 1000).to.be.within(timeMin, timeNow);
  });
});
