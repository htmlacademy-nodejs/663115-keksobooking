'use strict';

const http = require(`http`);
const path = require(`path`);
const {readFile} = require(`../interface-backend`);

const hostname = `127.0.0.1`;
const port = 3000;
const FileType = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.ico': `image/x-icon`,
  '.png': `image/png`
};

const handler = (req, res) => {
  res.statusCode = 200;
  const appRoot = process.env.PWD;
  const requestFilePath = appRoot + req.url;
  console.log(`-----`);
  console.log(requestFilePath);
  res.setHeader(`Content-Type`, FileType[path.extname(requestFilePath)]);
  readFile(requestFilePath)
    .then((data) => {
      res.end(data);
    });
};

module.exports = {
  name: `--server`,
  description: `Запускает сервер`,
  execute() {
    const server = http.createServer();
    server.on(`request`, handler);

    server.listen(port, hostname, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(`server is running`);
    });
  }
};
