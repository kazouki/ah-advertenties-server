"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "messages",
      [
        {
          fromUserId: 1,
          toUserId: 2,
          text: "hallo is de fiets te koop?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fromUserId: 2,
          toUserId: 1,
          text: "jahoor kom maar ophalen",
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
