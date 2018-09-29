'use strict';

const commandVersion = require(`./commands/version`);
const commandHelp = require(`./commands/help`);
const createUnknownCommandMessage = require(`./create-unknown-command-message`);

let commands = {
  [commandVersion.name]: commandVersion,
  [commandHelp.name]: commandHelp
};

const processCommands = function (args) {
  args.every((argument) => {
    if (argument in commands) {
      commands[argument].execute();
      return false;
    } else {
      console.error(createUnknownCommandMessage(argument, commands));
      process.exit(1);
    }
    return true;
  });
};

module.exports = processCommands;
