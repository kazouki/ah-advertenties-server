"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "cards",
      "columnIndex",
      { type: Sequelize.INTEGER, defaultValue: 0 },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cards", "columnIndex", {});
  },
};
