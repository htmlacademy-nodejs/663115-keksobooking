'use strict';

const Message = require(`../message`);

module.exports = {
  name: `--author`,
  description: `Показывает автора программы`,
  execute() {
    console.log(Message.AUTHOR);
  }
};
