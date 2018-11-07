'use strict';

const {MongoClient} = require(`mongodb`);

const MONGO_SERVER_URL = `mongodb://localhost:27017`;

const connectAndRead = async () => {
  const client = await MongoClient.connect(MONGO_SERVER_URL, {useNewUrlParser: true});
  const db = client.db(`offers`);

  const collection = await db.collection(`offers`)
    .find({})
    .toArray();

  client.close();

  return collection;
};

module.exports = connectAndRead;
