"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      card.belongsTo(models.user);
      card.hasMany(models.bid);
    }
  }
  card.init(
    {
      aangeboden: DataTypes.BOOLEAN,
      gevraagd: DataTypes.BOOLEAN,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      date: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "card",
    }
  );
  return card;
};
