"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bid.belongsTo(models.card);
    }
  }
  bid.init(
    {
      email: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      cardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bid",
    }
  );
  return bid;
};
