"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "cards",
      "imageUrl",
      { type: Sequelize.STRING },
      {}
    );

    await queryInterface.addColumn(
      "cards",
      "minimumBid",
      { type: Sequelize.INTEGER, defaultValue: 0 },
      {}
    );

    await queryInterface.addColumn(
      "cards",
      "hearts",
      { type: Sequelize.INTEGER, defaultValue: 0 },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cards", "imageUrl", {});
    await queryInterface.removeColumn("cards", "minimumBid", {});
    await queryInterface.removeColumn("cards", "hearts", {});
  },
};
