'use strict';

const {Message} = require(`../message`);

module.exports = {
  name: `--license`,
  description: `Показывает лицензию`,
  execute() {
    console.log(Message.LICENSE);
  }
};
