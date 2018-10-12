'use strict';

const fs = require(`fs`);
const {generateEntity} = require(`../generate-entity.js`);

const {promisify} = require(`util`);

const writeFile = promisify(fs.writeFile);

const generate = (elementsCount, dataFilePath) => {
  // filepath exist -> return Promise.reject(`File is exist`)

  const elements = [];
  for (let i = 0; i < elementsCount; i++) {
    elements.push(generateEntity());
  }

  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(dataFilePath, JSON.stringify(elements), fileWriteOptions);
};

module.exports = {
  name: `--generate`,
  description: `Генерирует данные в файл`,
  execute(count, path) {
    generate(count, path);
  }
};
