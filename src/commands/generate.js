'use strict';

const {generateEntity} = require(`../generate-entity.js`);
const {writeFile} = require(`../interface-backend.js`);

const generate = (count, path) => {
  return new Promise((resolve, reject) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      elements.push(generateEntity());
    }

    writeFile(path, elements)
      .then(resolve)
      .catch((err) => reject(err));
  });
};

module.exports = {
  name: `--generate`,
  description: `Генерирует данные в файл`,
  execute(count, path) {
    return generate(count, path);
  }
};
