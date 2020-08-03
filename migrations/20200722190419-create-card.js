"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      aangeboden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      gevraagd: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: " ",
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: " ",
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: " ",
      },
      telephone: {
        type: Sequelize.STRING,
        defaultValue: " ",
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: " ",
      },
      date: {
        type: Sequelize.STRING,
        defaultValue: " ",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: { type: Sequelize.INTEGER, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cards");
  },
};
