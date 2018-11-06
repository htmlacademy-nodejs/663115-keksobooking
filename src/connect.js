'use strict';

const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

const connectAndRead = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(`offers`);
  db.collection(`offers`).find({}).toArray()
    .then((collection) => {
      console.log(collection);
      client.close();
    });
};

connectAndRead().catch((e) => {
  throw e;
});
