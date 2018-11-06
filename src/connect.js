'use strict';

const {MongoClient} = require(`mongodb`);

const MONGO_SERVER_URL = `mongodb://localhost:27017`;

const connectAndRead = async () => {
  const client = await MongoClient.connect(MONGO_SERVER_URL);
  const db = client.db(`offers`);

  const collection = await db.collection(`offers`)
    .find({})
    .toArray();

  console.log(collection);
  client.close();
};

connectAndRead().catch((e) => {
  throw e;
});
