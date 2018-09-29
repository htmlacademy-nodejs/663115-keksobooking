'use strict';

const Message = require(`../message`);

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  execute() {
    console.log(Message.VERSION);
  }
};
