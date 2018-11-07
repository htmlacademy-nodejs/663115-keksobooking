'use strict';

const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url)
  .then((client) => client.db(`offers`))
  .catch((e) => {
    console.error(`Failed to connect to MongoDB`, e);
    process.exit(1);
  });
