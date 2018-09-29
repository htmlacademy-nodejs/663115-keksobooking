'use strict';

const processCommands = require(`./src/commands`);

if (process.argv.length === 2) {
  process.exit(0);
}

processCommands(process.argv.slice(2));

process.exit(0);
