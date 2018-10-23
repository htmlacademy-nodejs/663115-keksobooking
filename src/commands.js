'use strict';

const commandAuthor = require(`./commands/author`);
const commandDescription = require(`./commands/description`);
const commandHelp = require(`./commands/help`);
const commandLicense = require(`./commands/license`);
const commandVersion = require(`./commands/version`);

const {createUnknownCommandMessage} = require(`./message`);

const commands = {
  [commandAuthor.name]: commandAuthor,
  [commandDescription.name]: commandDescription,
  [commandHelp.name]: commandHelp,
  [commandLicense.name]: commandLicense,
  [commandVersion.name]: commandVersion
};

const processCommands = (args) => {
  args.every((argument) => {
    if (argument in commands) {
      commands[argument].execute(commands);
      return false;
    } else {
      console.error(createUnknownCommandMessage(argument, commands));
      process.exit(1);
    }
    return true;
  });
};

module.exports = processCommands;
