'use strict';

const Message = require(`../message`);

module.exports = {
  name: `--help`,
  description: `Shows help`,
  execute() {
    console.log(Message.HELP);
  }
};
