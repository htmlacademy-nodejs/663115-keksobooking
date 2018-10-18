'use strict';

const readline = require(`readline`);

const askQuestion = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};


const interfaceFrontend = (questions) => {
  return new Promise((resolve) => {
    const answers = [];

    askQuestion(questions[0]).then((answer)=>{
      answers.push(answer);
      return askQuestion(questions[1]);
    }).then((answer)=>{
      answers.push(answer);
      console.log(answers);
      resolve(answers);
    });
  });
};

module.exports = interfaceFrontend;
