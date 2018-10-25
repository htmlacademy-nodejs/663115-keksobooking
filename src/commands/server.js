'use strict';

const http = require(`http`);
const path = require(`path`);
const {readFile} = require(`../interface-backend`);

const hostname = `127.0.0.1`;
const defaultPort = 3000;
const FileType = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.ico': `image/x-icon`,
  '.png': `image/png`
};

const handler = (req, res) => {
  try {
    res.statusCode = 200;
    const reqUrl = req.url === `/` ? `/index.html` : req.url;
    const appRoot = process.env.PWD;
    const requestFilePath = appRoot + `/static` + reqUrl;
    const fileType = FileType[path.extname(requestFilePath)];
    const encoding = fileType.substr(0, 5) === `image` ? `base64` : `utf-8`;
    res.setHeader(`Content-Type`, fileType);
    readFile(requestFilePath, encoding)
      .then((data) => {
        res.end(data, encoding);
      })
      .catch((err) => {
        res.statusCode = 404;
        res.end(`404. ${err}`);
      });
  } catch (err) {
    res.statusCode = 500;
    res.end(`500. ${err}`);
  }
};

module.exports = {
  name: `--server`,
  description: `Запускает сервер. Принимает параметр номер порта. Если не задано, сервер запускается на порту ${defaultPort}.`,
  execute() {
    const server = http.createServer();
    server.on(`request`, handler);

    let port = defaultPort;
    if (process.argv[3]) {
      port = process.argv[3];
    }

    server.listen(port, hostname, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(`server is running on port ${port}`);
    });
  }
};
