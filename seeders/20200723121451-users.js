"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "thomas1",
          email: "thomas1@thomas1.com",
          password: bcrypt.hashSync("thomas1", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "thomas2",
          email: "thomas2@thomas2.com",
          password: bcrypt.hashSync("thomas2", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "thomas3",
          email: "thomas3@thomas3.com",
          password: bcrypt.hashSync("thomas3", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "thomas4",
          email: "thomas4@thomas4.com",
          password: bcrypt.hashSync("thomas4", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
