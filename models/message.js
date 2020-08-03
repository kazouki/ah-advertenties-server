"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.user);
    }
  }
  message.init(
    {
      userId: DataTypes.INTEGER,
      toUserId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "message",
    }
  );
  return message;
};
