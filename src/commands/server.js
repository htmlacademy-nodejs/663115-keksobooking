'use strict';

const express = require(`express`);
const app = express();
const {generateEntity} = require(`../generate-entity.js`);

const DEFAULT_PORT = 3000;

app.use(express.static(`static`));

const generateOffers = (count = 1) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(generateEntity());
  }
  return elements;
};

app.get(`/`, (req, res) => res.send(`Hello World!`));

app.get(`/api/offers`, (req, res) => {
  res.send(generateOffers());
});

const runServer = (port) => {
  port = parseInt(port, 10);
  app.listen(port, () => console.log(`Example app listening on port ${port}`));
};

module.exports = {
  name: `--server`,
  description: `Запускает сервер. Принимает параметр номер порта. Если не задано, сервер запускается на порту ${DEFAULT_PORT}.`,
  execute() {
    const port = process.argv[3] || DEFAULT_PORT;
    runServer(port);
  },
  app
};
