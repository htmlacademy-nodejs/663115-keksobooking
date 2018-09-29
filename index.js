'use strict';

const Message = require(`./src/message`);
const processCommands = require(`./src/commands`);

if (process.argv.length === 2) {
  console.log(Message.INFO);
  process.exit(0);
}

processCommands(process.argv.slice(2));

process.exit(0);
