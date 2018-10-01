'use strict';

require(`colors`);

const Message = require(`../message`);

const colorizeVersionString = (version) => {
  const versionParts = version.slice(1).split(`.`);
  return `v${versionParts[0].red}.${versionParts[1].green}.${versionParts[2].blue}`;
};

module.exports = {
  name: `--version`,
  description: `Показывает версию`,
  execute() {
    console.log(colorizeVersionString(Message.VERSION));
  }
};
