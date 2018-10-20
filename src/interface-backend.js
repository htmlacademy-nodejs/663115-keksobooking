'use strict';

const fs = require(`fs`);

const promisifiedFn = (callback, ...args) => {
  console.log(`promisedFn`);
  return new Promise((resolve, reject) => {
    callback(...args, (err, arg) => {
      if (err) {
        reject(err);
      } else {
        resolve(arg);
      }
    });
  });
};

const checkFileExist = (path) => {
  console.log(`checkFileExist`);
  return new Promise((resolve) => {
    promisifiedFn(fs.stat, path)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

const writeFile = (path, elements) => {
  console.log(`writeFile`);
  return new Promise((resolve, reject) => {
    const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
    promisifiedFn(fs.writeFile, path, JSON.stringify(elements), fileWriteOptions)
      .then(() => {
        console.log(`Файл с данными успешно создан!`);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  checkFileExist,
  writeFile
};
