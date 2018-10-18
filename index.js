'use strict';

const {promisify} = require(`util`);
const commandGenerate = require(`./src/commands/generate`);
const processCommands = require(`./src/commands`);
const interfaceFrontend = require(`./src/interface-frontend`);

const generateFile = promisify(commandGenerate.execute);

if (process.argv.length === 2) {
  const questions = [
    `Сколько сущностей создаем? `,
    `Какой будет путь до файла? `
  ];

  interfaceFrontend(questions).then((answers) => {
    generateFile(...answers).catch((err) => {
      console.log(err);
    });
  });

} else {
  processCommands(process.argv.slice(2));
}
