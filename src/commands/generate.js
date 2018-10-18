'use strict';

const {generateEntity} = require(`../generate-entity.js`);
const {fileExist, writeFile} = require(`../interface-backend.js`);

const generate = (count, path) => {
  if (fileExist(path)) {
    return Promise.reject(`File is exist`);
  } else {
    const elements = [];
    for (let i = 0; i < count; i++) {
      elements.push(generateEntity());
    }

    writeFile(path, elements);

    return Promise.resolve(elements);
  }
};

module.exports = {
  name: `--generate`,
  description: `Генерирует данные в файл`,
  execute(count, path) {
    generate(count, path);
  }
};
