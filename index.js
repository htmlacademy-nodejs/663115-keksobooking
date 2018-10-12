'use strict';

const {promisify} = require(`util`);
const commandGenerate = require(`./src/commands/generate`);
const processCommands = require(`./src/commands`);
const myf = require(`./src/cli-interface`);

const generateFile = promisify(commandGenerate.execute);

if (process.argv.length === 2) {
  myf((count, path)=>{
    generateFile(count, path).catch((err) => {
      console.log(err);
    });
  });
} else {
  processCommands(process.argv.slice(2));
}
