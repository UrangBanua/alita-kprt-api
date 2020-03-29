'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bot_inboxs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_m: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      t: {
        type: Sequelize.INTEGER
      },
      notifyName: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      self: {
        type: Sequelize.STRING
      },
      ack: {
        type: Sequelize.INTEGER
      },
      invis: {
        type: Sequelize.BOOLEAN
      },
      isNewMsg: {
        type: Sequelize.BOOLEAN
      },
      star: {
        type: Sequelize.BOOLEAN
      },
      recvFresh: {
        type: Sequelize.BOOLEAN
      },
      broadcast: {
        type: Sequelize.BOOLEAN
      },
      mentionedJidList: {
        type: Sequelize.STRING
      },
      isForwarded: {
        type: Sequelize.BOOLEAN
      },
      labels: {
        type: Sequelize.TEXT
      },
      sender: {
        type: Sequelize.TEXT
      },
      timestamp: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      isGroupMsg: {
        type: Sequelize.BOOLEAN
      },
      isMMS: {
        type: Sequelize.BOOLEAN
      },
      isMedia: {
        type: Sequelize.BOOLEAN
      },
      isNotification: {
        type: Sequelize.BOOLEAN
      },
      isPSA: {
        type: Sequelize.BOOLEAN
      },
      chat: {
        type: Sequelize.TEXT
      },
      chatId: {
        type: Sequelize.STRING
      },
      quotedMsgObj: {
        type: Sequelize.TEXT
      },
      mediaData: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bot_inboxs');
  }
};