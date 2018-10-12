'use strict';

const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const myf = (cb) => {
  rl.question(`Hello! Do you want generate data? (y/n) `, (answer) => {
    if (answer === `y`) {
      rl.question(`How many elements? `, (count) => {
        const elementsCount = count;

        rl.question(`File path? `, (path) => {
          const filePath = path;

          rl.close();

          return cb(elementsCount, filePath);
        });
      });
    } else {
      rl.close();
    }
  });
};

module.exports = myf;
