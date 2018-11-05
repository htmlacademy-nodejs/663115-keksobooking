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

const readFile = (path, encoding = `utf-8`) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

module.exports = {
  checkFileExist,
  writeFile,
  readFile
};
