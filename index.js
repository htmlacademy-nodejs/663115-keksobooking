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
        const rewrite = askQuestion(`Перезаписать? `);
        if (!rewrite) {
          return false;
        }
      }
      return commandGenerate.execute(count, path);
    })
    .then(() => {
      console.log(`Файл с данными успешно создан!`);
    })
    .catch((error) => {
      console.log(error);
    });

} else {
  processCommands(process.argv.slice(2));
}
