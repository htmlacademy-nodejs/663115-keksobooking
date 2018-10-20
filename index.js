'use strict';

const commandGenerate = require(`./src/commands/generate`);
const processCommands = require(`./src/commands`);
const {askQuestion} = require(`./src/interface-frontend`);
const {checkFileExist} = require(`./src/interface-backend`);

if (process.argv.length === 2) {
  const questions = [
    `Сколько сущностей создаем? `,
    `Какой будет путь до файла? `
  ];

  let count = 0;
  let path = ``;

  askQuestion(questions[0])
    .then((answer) => {
      count = answer;
      return askQuestion(questions[1]);
    })
    .then((answer) => {
      path = answer;
      return checkFileExist(path);
    })
    .then((fileExist) => {
      if (fileExist) {
        askQuestion(`Перезаписать? (y) `)
          .then((answer) => {
            if (answer === `y`) {
              return commandGenerate.execute(count, path);
            } else {
              console.log(`Файл с данными не был создан!`);
            }
            return true;
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });

} else {
  processCommands(process.argv.slice(2));
}
