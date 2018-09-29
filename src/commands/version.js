'use strict';

const Message = require(`../message`);

module.exports = {
  name: `--version`,
  description: `Показывает версию`,
  execute() {
    console.log(Message.VERSION);
  }
};
