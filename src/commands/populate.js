'use strict';

const {MongoClient} = require(`mongodb`);
const {generateEntity} = require(`../generate-entity.js`);

const ENTITIES_COUNT = 100;
const MONGO_SERVER_URL = `mongodb://localhost:27017`;

const generate = () => {
  let client;

  return new Promise((resolve, reject) => {
    const elements = [];
    for (let i = 0; i < ENTITIES_COUNT; i++) {
      elements.push(generateEntity());
    }

    MongoClient.connect(MONGO_SERVER_URL)
      .then((clientConnection) => {
        client = clientConnection;
        const db = client.db(`offers`);
        const collection = db.collection(`offers`);

        return collection.insertMany(elements);
      })
      .then(() => {
        client.close();
        return resolve();
      })
      .catch(reject);
  });
};

module.exports = {
  name: `--populate`,
  description: `Генерирует данные в mongodb`,
  execute() {
    return generate();
  }
};
