'use strict';

const express = require(`express`);
const app = express();
const {generateEntity} = require(`../generate-entity.js`);

const DEFAULT_PORT = 3000;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

app.use(express.static(`static`));

const generateOffers = (date = undefined, count = 1) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(generateEntity(date));
  }
  return elements;
};

app.get(`/`, (req, res) => res.send(`Hello World!`));

app.get(`/api/offers`, (req, res) => {
  res.send(generateOffers());
});

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

app.get(`/api/offers/:date`, (req, res) => {
  const date = req.params.date;
  const offers = generateOffers(date);

  const offer = offers.find((item) => item.date >= date);
  if (!offer) {
    throw new NotFoundError(`Not found properities with date ${date}`);
  }

  res.send(offer);
});

app.use(NOT_FOUND_HANDLER);

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
