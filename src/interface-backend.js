'use strict';

const fs = require(`fs`);

const fileExist = (path) => {
  fs.stat(path, (err, stats) => {
    return (typeof stats === undefined);
  });
};

const writeFile = (path, elements) => {
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(path, JSON.stringify(elements), fileWriteOptions);
};

module.exports = {
  fileExist,
  writeFile
};
