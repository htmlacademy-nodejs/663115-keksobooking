'use strict';

const {MongoClient} = require(`mongodb`);
const {generateEntity} = require(`../generate-entity.js`);

const count = 100;
const url = `mongodb://localhost:27017`;

let client;

const generate = () => {
  return new Promise((resolve, reject) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      elements.push(generateEntity());
    }

    MongoClient.connect(url)
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
      .catch((err) => reject(err));
  });
};

module.exports = {
  name: `--populate`,
  description: `Генерирует данные в mongodb`,
  execute() {
    return generate();
  }
};
