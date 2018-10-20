'use strict';

const readline = require(`readline`);

const askQuestion = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log(`before rl question`);
    rl.question(question, (answer) => {
      console.log(`inside rl question`);
      rl.close();
      resolve(answer);
    });
  });
};

module.exports = {
  askQuestion
};
