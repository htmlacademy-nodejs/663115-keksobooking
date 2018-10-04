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
    expect(entity.author.avatar).to.have.string(`https:`);
  });

  it(`should generate a valid string for title`, () => {
    expect(entity.offer.title).to.be.a(`string`);
  });

  it(`should generate address in correct format`, () => {
    expect(entity.offer.address).to.have.string(`,`);
  });
});
