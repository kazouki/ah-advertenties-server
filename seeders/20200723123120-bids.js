"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "guy@guy.com",
          amount: 30,
          cardId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "anotherguy@anotherguy.com",
          amount: 20,
          cardId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "thirdguy@thirdguy.com",
          amount: 40,
          cardId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "girl@girl.com",
          amount: 60,
          cardId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "anothergirl@anothergirl.com",
          amount: 10,
          cardId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("bids", null, {});
  },
};
