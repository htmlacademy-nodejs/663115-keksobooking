'use strict';

const express = require(`express`);
const offersRouter = require(`../offers/route`);

const app = express();

const DEFAULT_PORT = 3000;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

app.use(express.static(`static`));

app.get(`/`, (req, res) => res.send(`Hello World!`));

app.use(`/api/offers`, offersRouter);

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
