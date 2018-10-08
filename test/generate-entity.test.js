'use strict';

const chai = require(`chai`);

const generateEntity = require(`../src/generate-entity.js`);

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
    expect(entity.offer.price).to.be.within(1000, 1000000);
  });

  it(`should generate correct type`, () => {
    expect([`flat`, `palace`, `house`, `bungalo`]).to.include(entity.offer.type);
  });

  it(`should generate rooms in valid range`, () => {
    expect(entity.offer.rooms).to.be.within(1, 5);
  });

  it(`should generate number of guests`, () => {
    expect(entity.offer.guests).to.be.a(`number`);
  });

  it(`should generate checkin in correct format`, () => {
    expect([`12:00`, `13:00`, `14:00`]).to.include(entity.offer.checkin);
  });

  it(`should generate checkout in correct format`, () => {
    expect([`12:00`, `13:00`, `14:00`]).to.include(entity.offer.checkout);
  });

  it(`should generate features from correct values`, () => {
    const validFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
    entity.offer.features.forEach((feature)=>{
      expect(validFeatures).to.include(feature);
    });
  });

  it(`should generate description as empty string`, () => {
    expect(entity.offer.description).to.equal(``);
  });

  it(`should generate photos as array of strings`, () => {
    expect(entity.offer.photos).to.be.an(`array`).that.includes(`http://o0.github.io/assets/images/tokyo/hotel1.jpg`);
    expect(entity.offer.photos).to.be.an(`array`).that.includes(`http://o0.github.io/assets/images/tokyo/hotel2.jpg`);
    expect(entity.offer.photos).to.be.an(`array`).that.includes(`http://o0.github.io/assets/images/tokyo/hotel3.jpg`);
    expect(entity.offer.photos.length).to.be.eq(3);
  });

  it(`should generate location x in valid range`, () => {
    expect(entity.location.x).to.be.within(300, 900);
  });

  it(`should generate location y in valid range`, () => {
    expect(entity.location.y).to.be.within(150, 500);
  });

  it(`should generate date in valid range`, () => {
    const TIME_NOW = Math.floor(new Date() / 1000);
    const TIME_MIN = Math.floor(new Date() / 1000 - Math.random(7 * 24 * 60 * 60));
    expect(entity.date).to.be.within(TIME_MIN, TIME_NOW);
  });
});
