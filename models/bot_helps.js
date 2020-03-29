'use strict';
module.exports = (sequelize, DataTypes) => {
  const bot_helps = sequelize.define('bot_helps', {
    apps: DataTypes.STRING,
    commands: DataTypes.TEXT
  }, {});
  bot_helps.associate = function(models) {
    // associations can be defined here
  };
  return bot_helps;
};