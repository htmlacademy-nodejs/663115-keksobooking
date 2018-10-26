'use strict';

const http = require(`http`);
const path = require(`path`);
const {readFile} = require(`../interface-backend`);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;

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
  const reqUrl = req.url === `/` ? `/index.html` : req.url;
  const requestFilePath = appRoot + `/static` + reqUrl;

  let fileType;
  if (Object.values(FileType).indexOf(path.extname(requestFilePath)) > -1) {
    res.statusCode = 500;
    res.end(`500. Format ${path.extname(requestFilePath)} is not supported`);
  } else {
    fileType = FileType[path.extname(requestFilePath)];
  }
  res.setHeader(`Content-Type`, fileType);

  const encoding = fileType.includes(`text/`) ? `utf-8` : `binary`;
  readFile(requestFilePath, encoding)
    .then((data) => {
      res.end(data, encoding);
    })
    .catch((err) => {
      res.statusCode = 404;
      res.end(`404. ${err}`);
    });
};

module.exports = {
  name: `--server`,
  description: `Запускает сервер. Принимает параметр номер порта. Если не задано, сервер запускается на порту ${DEFAULT_PORT}.`,
  execute() {
    const server = http.createServer();
    server.on(`request`, handler);

    let port = process.argv[3] || DEFAULT_PORT;

    server.listen(port, HOSTNAME, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(`server is running on port ${port}`);
    });
  }
};
