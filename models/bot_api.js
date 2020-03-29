'use strict';
module.exports = (sequelize, DataTypes) => {
  const bot_api = sequelize.define('bot_api', {
    id_m: DataTypes.STRING,
    body: DataTypes.TEXT,
    type: DataTypes.STRING,
    t: DataTypes.INTEGER,
    notifyName: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    self: DataTypes.STRING,
    ack: DataTypes.INTEGER,
    invis: DataTypes.BOOLEAN,
    isNewMsg: DataTypes.BOOLEAN,
    star: DataTypes.BOOLEAN,
    recvFresh: DataTypes.BOOLEAN,
    broadcast: DataTypes.BOOLEAN,
    mentionedJidList: DataTypes.STRING,
    isForwarded: DataTypes.BOOLEAN,
    labels: DataTypes.TEXT,
    sender: DataTypes.TEXT,
    timestamp: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    isGroupMsg: DataTypes.BOOLEAN,
    isMMS: DataTypes.BOOLEAN,
    isMedia: DataTypes.BOOLEAN,
    isNotification: DataTypes.BOOLEAN,
    isPSA: DataTypes.BOOLEAN,
    chat: DataTypes.TEXT,
    chatId: DataTypes.STRING,
    quotedMsgObj: DataTypes.TEXT,
    mediaData: DataTypes.TEXT
  }, {});
  bot_api.associate = function(models) {
    // associations can be defined here
  };
  return bot_api;
};