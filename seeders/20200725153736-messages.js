"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "messages",
      [
        {
          userId: 1,
          toUserId: 2,
          text: "hallo is de fiets te koop?",
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          toUserId: 1,
          text: "jahoor kom maar ophalen",
          isRead: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("messages", null, {});
  },
};
