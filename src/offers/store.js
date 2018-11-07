'use strict';

const db = require(`../database/db`);

const setupCollection = async () => {
  const dataBase = await db;

  const collection = dataBase.collection(`offers`);
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

module.exports = new OfferStore(setupCollection);
// .catch((e) => console.error(`Failed to setup "offers" collection`, e));
