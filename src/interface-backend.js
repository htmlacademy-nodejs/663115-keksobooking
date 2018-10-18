'use strict';

const fs = require(`fs`);

const promisifiedFn = (callback, ...args) => {
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
  return new Promise((resolve, reject) => {
    promisifiedFn(fs.stat, path)
      .then((stats) => {
        resolve(typeof stats === undefined);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const writeFile = (path, elements) => {
  return new Promise((resolve, reject) => {
    const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
    promisifiedFn(fs.writeFile, path, JSON.stringify(elements), fileWriteOptions)
      .then(() => {
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

//
//
// promisifiedFn(fs.stat, '/file.json')
//   .then((stats) => {
//     return true;
//   })
